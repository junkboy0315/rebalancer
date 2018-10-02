import { Portfolio } from '../dataforge';

describe('Portfolio', () => {
  let portfolio;

  const assets = [
    { id: 1, amount: 250, targetRate: 20 },
    { id: 2, amount: 200, targetRate: 20 },
    { id: 3, amount: 300, targetRate: 20 },
    { id: 4, amount: 400, targetRate: 40 },
  ];

  beforeEach(() => {
    portfolio = new Portfolio(assets);
  });

  it('can rebalance 53', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcAmount: 250,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.0869565217391304,
        dstAdjust: 0,
        dstIdealAmount: 300,
        dstCurrentRate: 0.8333333333333334,
      },
      {
        id: 2,
        srcAmount: 200,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 18,
        dstIdealAmount: 300,
        dstCurrentRate: 0.7266666666666667,
      },
      {
        id: 3,
        srcAmount: 300,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.3043478260869565,
        dstAdjust: 0,
        dstIdealAmount: 300,
        dstCurrentRate: 1,
      },
      {
        id: 4,
        srcAmount: 400,
        srcTargetRate: 40,
        srcIdealAmount: 460,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 35,
        dstIdealAmount: 600,
        dstCurrentRate: 0.725,
      },
    ];

    portfolio.rebalance(53);
    expect(portfolio.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance 200', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcAmount: 250,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.0869565217391304,
        dstAdjust: 13,
        dstIdealAmount: 300,
        dstCurrentRate: 0.8766666666666667,
      },
      {
        id: 2,
        srcAmount: 200,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 62,
        dstIdealAmount: 300,
        dstCurrentRate: 0.8733333333333333,
      },
      {
        id: 3,
        srcAmount: 300,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.3043478260869565,
        dstAdjust: 0,
        dstIdealAmount: 300,
        dstCurrentRate: 1,
      },
      {
        id: 4,
        srcAmount: 400,
        srcTargetRate: 40,
        srcIdealAmount: 460,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 125,
        dstIdealAmount: 600,
        dstCurrentRate: 0.875,
      },
    ];

    portfolio.rebalance(200);
    expect(portfolio.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance 633', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcAmount: 250,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.0869565217391304,
        dstAdjust: 107,
        dstIdealAmount: 300,
        dstCurrentRate: 1.19,
      },
      {
        id: 2,
        srcAmount: 200,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 157,
        dstIdealAmount: 300,
        dstCurrentRate: 1.19,
      },
      {
        id: 3,
        srcAmount: 300,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.3043478260869565,
        dstAdjust: 56,
        dstIdealAmount: 300,
        dstCurrentRate: 1.1866666666666668,
      },
      {
        id: 4,
        srcAmount: 400,
        srcTargetRate: 40,
        srcIdealAmount: 460,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 313,
        dstIdealAmount: 600,
        dstCurrentRate: 1.1883333333333332,
      },
    ];

    portfolio.rebalance(633);
    expect(portfolio.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -39', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcAmount: 250,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.0869565217391304,
        dstAdjust: 0,
        dstIdealAmount: 300,
        dstCurrentRate: 0.8333333333333334,
      },
      {
        id: 2,
        srcAmount: 200,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 300,
        dstCurrentRate: 0.6666666666666666,
      },
      {
        id: 3,
        srcAmount: 300,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.3043478260869565,
        dstAdjust: -39,
        dstIdealAmount: 300,
        dstCurrentRate: 0.87,
      },
      {
        id: 4,
        srcAmount: 400,
        srcTargetRate: 40,
        srcIdealAmount: 460,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 600,
        dstCurrentRate: 0.6666666666666666,
      },
    ];

    portfolio.rebalance(-39);
    expect(portfolio.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -101', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcAmount: 250,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.0869565217391304,
        dstAdjust: -25,
        dstIdealAmount: 300,
        dstCurrentRate: 0.75,
      },
      {
        id: 2,
        srcAmount: 200,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 300,
        dstCurrentRate: 0.6666666666666666,
      },
      {
        id: 3,
        srcAmount: 300,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.3043478260869565,
        dstAdjust: -76,
        dstIdealAmount: 300,
        dstCurrentRate: 0.7466666666666667,
      },
      {
        id: 4,
        srcAmount: 400,
        srcTargetRate: 40,
        srcIdealAmount: 460,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 600,
        dstCurrentRate: 0.6666666666666666,
      },
    ];

    portfolio.rebalance(-101);
    expect(portfolio.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -613', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcAmount: 250,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.0869565217391304,
        dstAdjust: -142,
        dstIdealAmount: 300,
        dstCurrentRate: 0.36,
      },
      {
        id: 2,
        srcAmount: 200,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: -93,
        dstIdealAmount: 300,
        dstCurrentRate: 0.3566666666666667,
      },
      {
        id: 3,
        srcAmount: 300,
        srcTargetRate: 20,
        srcIdealAmount: 230,
        srcCurrentRate: 1.3043478260869565,
        dstAdjust: -193,
        dstIdealAmount: 300,
        dstCurrentRate: 0.3566666666666667,
      },
      {
        id: 4,
        srcAmount: 400,
        srcTargetRate: 40,
        srcIdealAmount: 460,
        srcCurrentRate: 0.8695652173913043,
        dstAdjust: -185,
        dstIdealAmount: 600,
        dstCurrentRate: 0.35833333333333334,
      },
    ];

    portfolio.rebalance(-613);
    expect(portfolio.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('throw error when adjustment exceed the current total', () => {
    test = () => {
      portfolio.rebalance(-2000);
    };
    expect(test).toThrow();
  });
});
