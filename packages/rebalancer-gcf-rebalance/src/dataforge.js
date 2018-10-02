import { DataFrame } from 'data-forge';

export class Portfolio {
  /**
   *
   * @param {{id: number, amount: number, targetRate: number}} assets
   */
  constructor(assets) {
    this.df = new DataFrame(assets);
  }

  // distribute `remaining` to the min(max) rate asset(s) at the rate of `srcTargetRate`
  scatter(remaining) {
    const rates = this.workDf
      .getSeries('dstCurrentRate')
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

    const srcTargetRateSum = this.workDf
      .where(row => row.dstCurrentRate === minOrMaxRate)
      .getSeries('srcTargetRate')
      .sum();

    this.workDf = this.workDf.select(row => {
      if (row.dstCurrentRate === minOrMaxRate) {
        const rasio = row.srcTargetRate / srcTargetRateSum;

        row.dstAdjust += Math.trunc(remaining * rasio);
        row.dstCurrentRate =
          (row.srcAmount + row.dstAdjust) / row.dstIdealAmount;
      }
      return row;
    });
  }

  fillGapRecursively(remaining) {
    const rates = this.workDf
      .getSeries('dstCurrentRate')
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
      .where(row => row.dstCurrentRate === minOrMaxRate)
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
        if (row.dstCurrentRate === minOrMaxRate) {
          const adjust =
            Math.trunc(row.dstIdealAmount * secondMinOrMaxRate) -
            (row.srcAmount + row.dstAdjust);
          row.dstAdjust += adjust;
          filledAmount += adjust;
        }
        return row.dstAdjust;
      },
      dstCurrentRate: row => {
        if (row.dstCurrentRate === minOrMaxRate) {
          row.dstCurrentRate = secondMinOrMaxRate;
        }
        return row.dstCurrentRate;
      },
    });

    return this.fillGapRecursively(remaining - filledAmount);
  }

  smashFractionRecursively(fraction) {
    // Base Case
    if (fraction === 0) return;

    const idsByRates = this.workDf
      .orderBy(row => row.dstCurrentRate)
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
      dstCurrentRate: row => {
        if (row.id === targetIdToAddFraction) {
          row.dstCurrentRate =
            (row.srcAmount + row.dstAdjust) / row.dstIdealAmount;
        }
        return row.dstCurrentRate;
      },
    });
    this.smashFractionRecursively(fraction);
  }

  /**
   *
   * @param {number} adjustAmount
   * @returns {{id: number, amount: number, adjust: number}}
   */
  rebalance(adjustAmount) {
    this.srcCurrentTotal = this.df.getSeries('amount').sum();
    this.dstTargetTotal = this.df
      .deflate(row => row.amount * (100 / row.targetRate))
      .max();

    this.workDf = this.df
      .generateSeries({
        srcAmount: row => row.amount,
        srcTargetRate: row => row.targetRate,
        srcIdealAmount: row => (this.srcCurrentTotal * row.targetRate) / 100,
        srcCurrentRate: row => row.amount / row.srcIdealAmount,
        dstAdjust: () => 0,
        dstIdealAmount: row => (this.dstTargetTotal * row.srcTargetRate) / 100,
        dstCurrentRate: row => row.amount / row.dstIdealAmount,
      })
      .dropSeries(['amount', 'targetRate']);

    if (adjustAmount < 0 && Math.abs(adjustAmount) > this.srcCurrentTotal) {
      throw new Error(
        'The minus adjustment amount must be less than current total'
      );
    }

    this.fillGapRecursively(adjustAmount);
    let fraction = adjustAmount - this.workDf.getSeries('dstAdjust').sum();
    this.smashFractionRecursively(fraction);

    const result = this.workDf.toArray().map(_ => ({
      id: _.id,
      amount: _.srcAmount,
      adjust: _.dstAdjust,
    }));
    return result;
  }
}
