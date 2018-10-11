import { DataFrame } from 'data-forge';

export default class Rebalancer {
  /**
   *
   * @param {{id: number, amount: number, targetRate: number}} assets
   */
  constructor(assets) {
    if (!assets) throw Error('assets is not provided');
    if (assets.find(_ => _.targetRate < 0))
      throw Error('target rate must be positive value');
    if (assets.reduce((acc, next) => acc + next.targetRate, 0) !== 100)
      throw Error('sum of target rates must be 100');
    this.df = new DataFrame(assets);
  }

  // distribute `remaining` to the min(max) rate asset(s) at the rate of `targetRate`
  scatter(remaining) {
    const rates = this.workDf
      .getSeries('dstDeviation')
      .distinct()
      .toArray()
      .sort();

    let minOrMaxRate;
    if (remaining > 0) {
      // lowest
      [minOrMaxRate] = rates;
    } else {
      // highest
      [minOrMaxRate] = rates.reverse();
    }

    const targetRateSum = this.workDf
      .where(row => row.dstDeviation === minOrMaxRate)
      .getSeries('targetRate')
      .sum();

    this.workDf = this.workDf.select(row => {
      if (row.dstDeviation === minOrMaxRate) {
        const rasio = row.targetRate / targetRateSum;

        row.dstAdjust += Math.trunc(remaining * rasio);
        row.dstDeviation = (row.srcAmount + row.dstAdjust) / row.dstIdealAmount;
      }
      return row;
    });
  }

  fillGapRecursively(remaining) {
    const rates = this.workDf
      .getSeries('dstDeviation')
      .distinct()
      .toArray()
      .sort();

    let minOrMaxRate;
    let secondMinOrMaxRate;

    if (remaining > 0) {
      // lowest
      [minOrMaxRate, secondMinOrMaxRate] = rates;
    } else {
      // highest
      [minOrMaxRate, secondMinOrMaxRate] = rates.reverse();
    }

    // Base Case
    if (secondMinOrMaxRate === undefined) {
      return this.scatter(remaining);
    }

    const rateDiff = secondMinOrMaxRate - minOrMaxRate;

    const dstIdealAmountSum = this.workDf
      .where(row => row.dstDeviation === minOrMaxRate)
      .getSeries('dstIdealAmount')
      .sum();

    const scatterableAmount = dstIdealAmountSum * rateDiff;

    // Base Case
    if (Math.abs(scatterableAmount) > Math.abs(remaining)) {
      return this.scatter(remaining);
    }

    let filledAmount = 0;

    this.workDf = this.workDf.generateSeries({
      dstAdjust: row => {
        if (row.dstDeviation === minOrMaxRate) {
          const adjust =
            Math.trunc(row.dstIdealAmount * secondMinOrMaxRate) -
            (row.srcAmount + row.dstAdjust);
          row.dstAdjust += adjust;
          filledAmount += adjust;
        }
        return row.dstAdjust;
      },
      dstDeviation: row => {
        if (row.dstDeviation === minOrMaxRate) {
          row.dstDeviation = secondMinOrMaxRate;
        }
        return row.dstDeviation;
      },
    });

    return this.fillGapRecursively(remaining - filledAmount);
  }

  smashFractionRecursively(fraction) {
    // Base Case
    if (fraction === 0) return;

    const idsByRates = this.workDf
      .orderBy(row => row.dstDeviation)
      .getSeries('id')
      .toArray();

    const targetIdToAddFraction =
      fraction > 0 ? idsByRates[0] : idsByRates[idsByRates.length - 1];

    this.workDf = this.workDf.generateSeries({
      dstAdjust: row => {
        if (row.id === targetIdToAddFraction) {
          if (fraction > 0) {
            fraction -= 1;
            return (row.dstAdjust += 1);
          }
          if (fraction < 0) {
            fraction += 1;
            return (row.dstAdjust -= 1);
          }
        }
        return row.dstAdjust;
      },
      dstDeviation: row => {
        if (row.id === targetIdToAddFraction) {
          row.dstDeviation =
            (row.srcAmount + row.dstAdjust) / row.dstIdealAmount;
        }
        return row.dstDeviation;
      },
    });
    this.smashFractionRecursively(fraction);
  }

  /**
   *
   * @param {number} adjustAmount
   * @param {string} mode `sell` or `nosell`.
   * @returns {{id: number, amount: number, adjust: number}}
   */
  rebalance(adjustAmount, mode = 'nosell') {
    if (!Number.isInteger(adjustAmount))
      throw Error('adjust amount is invalid');

    const srcCurrentTotal = this.df.getSeries('amount').sum();

    if (adjustAmount < 0 && Math.abs(adjustAmount) > srcCurrentTotal) {
      throw Error(
        'The minus adjustment amount must be less than current total'
      );
    }

    const dstTargetTotal = srcCurrentTotal + adjustAmount;

    this.workDf = this.df
      .generateSeries({
        targetRate: row => row.targetRate,
        srcAmount: row => row.amount,
        srcIdealAmount: row => (srcCurrentTotal * row.targetRate) / 100,
        srcDeviation: row => row.amount / row.srcIdealAmount,
        dstAdjust: () => 0,
        dstIdealAmount: row => (dstTargetTotal * row.targetRate) / 100,
        dstDeviation: row => row.srcAmount / row.dstIdealAmount,
      })
      .dropSeries(['amount']);

    if (mode === 'nosell') {
      // no-selling mode
      this.fillGapRecursively(adjustAmount);
    } else {
      // selling mode
      this.workDf = this.workDf.generateSeries({
        dstAdjust: row =>
          Math.trunc((dstTargetTotal * row.targetRate) / 100 - row.srcAmount),
        dstDeviation: row =>
          (row.srcAmount + row.dstAdjust) / row.dstIdealAmount,
      });
    }

    let fraction = adjustAmount - this.workDf.getSeries('dstAdjust').sum();
    this.smashFractionRecursively(fraction);

    this.workDf = this.workDf.generateSeries({
      dstAmount: row => row.srcAmount + row.dstAdjust,
    });

    /*
     final `this.workDf` will be as follows:
     {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 61,
        dstAmount: 311,
        dstIdealAmount: 310.8,
        dstDeviation: 1.0006435006435006,
      }

      see: https://docs.google.com/spreadsheets/d/1i8K6RolFfeUpi7WhiaeZp5K62VsUczUG4WmKKwpeXuU
    */

    const result = this.workDf.toArray();
    return result;
  }
}
