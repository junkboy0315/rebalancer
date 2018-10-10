import Rebalancer from '../Rebalancer';

describe('Rebalancer', () => {
  let rebalancer;

  const assets = [
    { id: 1, amount: 250, targetRate: 20 },
    { id: 2, amount: 200, targetRate: 20 },
    { id: 3, amount: 300, targetRate: 20 },
    { id: 4, amount: 400, targetRate: 40 },
  ];

  beforeEach(() => {
    rebalancer = new Rebalancer(assets);
  });

  it('can rebalance 53', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 0,
        dstAmount: 250,
        dstIdealAmount: 240.6,
        dstDeviation: 1.0390689941812137,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 18,
        dstAmount: 218,
        dstIdealAmount: 240.6,
        dstDeviation: 0.9060681629260183,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 0,
        dstAmount: 300,
        dstIdealAmount: 240.6,
        dstDeviation: 1.2468827930174564,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 35,
        dstAmount: 435,
        dstIdealAmount: 481.2,
        dstDeviation: 0.9039900249376559,
      },
    ];

    rebalancer.rebalance(53);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance 200', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 13,
        dstAmount: 263,
        dstIdealAmount: 270,
        dstDeviation: 0.9740740740740741,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 62,
        dstAmount: 262,
        dstIdealAmount: 270,
        dstDeviation: 0.9703703703703703,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 0,
        dstAmount: 300,
        dstIdealAmount: 270,
        dstDeviation: 1.1111111111111112,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 125,
        dstAmount: 525,
        dstIdealAmount: 540,
        dstDeviation: 0.9722222222222222,
      },
    ];

    rebalancer.rebalance(200);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance 633', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 107,
        dstAmount: 357,
        dstIdealAmount: 356.6,
        dstDeviation: 1.0011217049915873,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 157,
        dstAmount: 357,
        dstIdealAmount: 356.6,
        dstDeviation: 1.0011217049915873,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 56,
        dstAmount: 356,
        dstIdealAmount: 356.6,
        dstDeviation: 0.9983174425126191,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 313,
        dstAmount: 713,
        dstIdealAmount: 713.2,
        dstDeviation: 0.9997195737521032,
      },
    ];

    rebalancer.rebalance(633);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -39', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 0,
        dstAmount: 250,
        dstIdealAmount: 222.2,
        dstDeviation: 1.125112511251125,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstAmount: 200,
        dstIdealAmount: 222.2,
        dstDeviation: 0.9000900090009001,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -39,
        dstAmount: 261,
        dstIdealAmount: 222.2,
        dstDeviation: 1.1746174617461747,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstAmount: 400,
        dstIdealAmount: 444.4,
        dstDeviation: 0.9000900090009001,
      },
    ];

    rebalancer.rebalance(-39);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -101', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -25,
        dstAmount: 225,
        dstIdealAmount: 209.8,
        dstDeviation: 1.0724499523355575,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstAmount: 200,
        dstIdealAmount: 209.8,
        dstDeviation: 0.9532888465204956,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -76,
        dstAmount: 224,
        dstIdealAmount: 209.8,
        dstDeviation: 1.0676835081029552,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstAmount: 400,
        dstIdealAmount: 419.6,
        dstDeviation: 0.9532888465204956,
      },
    ];

    rebalancer.rebalance(-101);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -613', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -142,
        dstAmount: 108,
        dstIdealAmount: 107.4,
        dstDeviation: 1.005586592178771,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -93,
        dstAmount: 107,
        dstIdealAmount: 107.4,
        dstDeviation: 0.9962756052141526,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -193,
        dstAmount: 107,
        dstIdealAmount: 107.4,
        dstDeviation: 0.9962756052141526,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -185,
        dstAmount: 215,
        dstIdealAmount: 214.8,
        dstDeviation: 1.0009310986964617,
      },
    ];

    rebalancer.rebalance(-613);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance +54 (sell mode)', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -9,
        dstAmount: 241,
        dstIdealAmount: 240.8,
        dstDeviation: 1.0008305647840532,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 41,
        dstAmount: 241,
        dstIdealAmount: 240.8,
        dstDeviation: 1.0008305647840532,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -59,
        dstAmount: 241,
        dstIdealAmount: 240.8,
        dstDeviation: 1.0008305647840532,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 81,
        dstAmount: 481,
        dstIdealAmount: 481.6,
        dstDeviation: 0.9987541528239202,
      },
    ];

    rebalancer.rebalance(54, 'sell');
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -304 (sell mode)', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -81,
        dstAmount: 169,
        dstIdealAmount: 169.2,
        dstDeviation: 0.9988179669030733,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -31,
        dstAmount: 169,
        dstIdealAmount: 169.2,
        dstDeviation: 0.9988179669030733,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -131,
        dstAmount: 169,
        dstIdealAmount: 169.2,
        dstDeviation: 0.9988179669030733,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -61,
        dstAmount: 339,
        dstIdealAmount: 338.4,
        dstDeviation: 1.00177304964539,
      },
    ];

    rebalancer.rebalance(-304, 'sell');
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance +404 (sell mode)', () => {
    const expectedWorkDf = [
      {
        id: 1,
        srcTargetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 61,
        dstAmount: 311,
        dstIdealAmount: 310.8,
        dstDeviation: 1.0006435006435006,
      },
      {
        id: 2,
        srcTargetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 111,
        dstAmount: 311,
        dstIdealAmount: 310.8,
        dstDeviation: 1.0006435006435006,
      },
      {
        id: 3,
        srcTargetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 11,
        dstAmount: 311,
        dstIdealAmount: 310.8,
        dstDeviation: 1.0006435006435006,
      },
      {
        id: 4,
        srcTargetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 221,
        dstAmount: 621,
        dstIdealAmount: 621.6,
        dstDeviation: 0.999034749034749,
      },
    ];

    rebalancer.rebalance(404, 'sell');
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('throw error when adjustment exceed the current total', () => {
    const tests = [
      () => {
        rebalancer = new Rebalancer();
      },
      () => {
        rebalancer = new Rebalancer(assets);
        rebalancer.rebalance();
      },
      () => {
        rebalancer = new Rebalancer(assets);
        rebalancer.rebalance('not integer');
      },
      () => {
        // target rate contains minus value
        const invalidAssets = [
          { id: 1, amount: 250, targetRate: 20 },
          { id: 2, amount: 200, targetRate: -20 },
          { id: 3, amount: 300, targetRate: 40 },
          { id: 4, amount: 400, targetRate: 60 },
        ];
        rebalancer = new Rebalancer(invalidAssets);
      },
      () => {
        // total targetRate is not 100
        const invalidAssets = [
          { id: 1, amount: 250, targetRate: 10 },
          { id: 2, amount: 200, targetRate: 20 },
          { id: 3, amount: 300, targetRate: 30 },
          { id: 4, amount: 400, targetRate: 30 },
        ];
        rebalancer = new Rebalancer(invalidAssets);
      },
    ];
    tests.forEach(test => {
      expect(test).toThrow();
    });
  });
});
