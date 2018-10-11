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
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 0,
        dstIdealAmount: 240.6,
        dstDeviation: 1.0390689941812137,
        dstAmount: 250,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.20781379883624274,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 18,
        dstIdealAmount: 240.6,
        dstDeviation: 0.9060681629260183,
        dstAmount: 218,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.18121363258520365,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 0,
        dstIdealAmount: 240.6,
        dstDeviation: 1.2468827930174564,
        dstAmount: 300,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.24937655860349128,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 35,
        dstIdealAmount: 481.2,
        dstDeviation: 0.9039900249376559,
        dstAmount: 435,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.36159600997506236,
      },
    ];

    rebalancer.rebalance(53);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance 200', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 13,
        dstIdealAmount: 270,
        dstDeviation: 0.9740740740740741,
        dstAmount: 263,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.1948148148148148,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 62,
        dstIdealAmount: 270,
        dstDeviation: 0.9703703703703703,
        dstAmount: 262,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.19407407407407407,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 0,
        dstIdealAmount: 270,
        dstDeviation: 1.1111111111111112,
        dstAmount: 300,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.2222222222222222,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 125,
        dstIdealAmount: 540,
        dstDeviation: 0.9722222222222222,
        dstAmount: 525,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.3888888888888889,
      },
    ];

    rebalancer.rebalance(200);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance 633', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 107,
        dstIdealAmount: 356.6,
        dstDeviation: 1.0011217049915873,
        dstAmount: 357,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.20022434099831743,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 157,
        dstIdealAmount: 356.6,
        dstDeviation: 1.0011217049915873,
        dstAmount: 357,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.20022434099831743,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 56,
        dstIdealAmount: 356.6,
        dstDeviation: 0.9983174425126191,
        dstAmount: 356,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.19966348850252383,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 313,
        dstIdealAmount: 713.2,
        dstDeviation: 0.9997195737521032,
        dstAmount: 713,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.3998878295008413,
      },
    ];

    rebalancer.rebalance(633);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -39', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 0,
        dstIdealAmount: 222.2,
        dstDeviation: 1.125112511251125,
        dstAmount: 250,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.22502250225022502,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 222.2,
        dstDeviation: 0.9000900090009001,
        dstAmount: 200,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.18001800180018002,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -39,
        dstIdealAmount: 222.2,
        dstDeviation: 1.1746174617461747,
        dstAmount: 261,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.23492349234923493,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 444.4,
        dstDeviation: 0.9000900090009001,
        dstAmount: 400,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.36003600360036003,
      },
    ];

    rebalancer.rebalance(-39);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -101', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -25,
        dstIdealAmount: 209.8,
        dstDeviation: 1.0724499523355575,
        dstAmount: 225,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.21448999046711154,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 209.8,
        dstDeviation: 0.9532888465204956,
        dstAmount: 200,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.19065776930409914,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -76,
        dstIdealAmount: 209.8,
        dstDeviation: 1.0676835081029552,
        dstAmount: 224,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.21353670162059105,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 0,
        dstIdealAmount: 419.6,
        dstDeviation: 0.9532888465204956,
        dstAmount: 400,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.3813155386081983,
      },
    ];

    rebalancer.rebalance(-101);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -613', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -142,
        dstIdealAmount: 107.4,
        dstDeviation: 1.005586592178771,
        dstAmount: 108,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.2011173184357542,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -93,
        dstIdealAmount: 107.4,
        dstDeviation: 0.9962756052141526,
        dstAmount: 107,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.19925512104283055,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -193,
        dstIdealAmount: 107.4,
        dstDeviation: 0.9962756052141526,
        dstAmount: 107,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.19925512104283055,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -185,
        dstIdealAmount: 214.8,
        dstDeviation: 1.0009310986964617,
        dstAmount: 215,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.40037243947858475,
      },
    ];

    rebalancer.rebalance(-613);
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance +54 (sell mode)', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -9,
        dstIdealAmount: 240.8,
        dstDeviation: 1.0008305647840532,
        dstAmount: 241,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.20016611295681064,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 41,
        dstIdealAmount: 240.8,
        dstDeviation: 1.0008305647840532,
        dstAmount: 241,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.20016611295681064,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -59,
        dstIdealAmount: 240.8,
        dstDeviation: 1.0008305647840532,
        dstAmount: 241,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.20016611295681064,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 81,
        dstIdealAmount: 481.6,
        dstDeviation: 0.9987541528239202,
        dstAmount: 481,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.3995016611295681,
      },
    ];

    rebalancer.rebalance(54, 'sell');
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance -304 (sell mode)', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: -81,
        dstIdealAmount: 169.2,
        dstDeviation: 0.9988179669030733,
        dstAmount: 169,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.19976359338061467,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -31,
        dstIdealAmount: 169.2,
        dstDeviation: 0.9988179669030733,
        dstAmount: 169,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.19976359338061467,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: -131,
        dstIdealAmount: 169.2,
        dstDeviation: 0.9988179669030733,
        dstAmount: 169,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.19976359338061467,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: -61,
        dstIdealAmount: 338.4,
        dstDeviation: 1.00177304964539,
        dstAmount: 339,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.40070921985815605,
      },
    ];

    rebalancer.rebalance(-304, 'sell');
    expect(rebalancer.workDf.toArray()).toEqual(expectedWorkDf);
  });

  it('can rebalance +404 (sell mode)', () => {
    const expectedWorkDf = [
      {
        id: 1,
        targetRate: 20,
        srcAmount: 250,
        srcIdealAmount: 230,
        srcDeviation: 1.0869565217391304,
        dstAdjust: 61,
        dstIdealAmount: 310.8,
        dstDeviation: 1.0006435006435006,
        dstAmount: 311,
        srcCurrentRate: 0.21739130434782608,
        dstCurrentRate: 0.20012870012870013,
      },
      {
        id: 2,
        targetRate: 20,
        srcAmount: 200,
        srcIdealAmount: 230,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 111,
        dstIdealAmount: 310.8,
        dstDeviation: 1.0006435006435006,
        dstAmount: 311,
        srcCurrentRate: 0.17391304347826086,
        dstCurrentRate: 0.20012870012870013,
      },
      {
        id: 3,
        targetRate: 20,
        srcAmount: 300,
        srcIdealAmount: 230,
        srcDeviation: 1.3043478260869565,
        dstAdjust: 11,
        dstIdealAmount: 310.8,
        dstDeviation: 1.0006435006435006,
        dstAmount: 311,
        srcCurrentRate: 0.2608695652173913,
        dstCurrentRate: 0.20012870012870013,
      },
      {
        id: 4,
        targetRate: 40,
        srcAmount: 400,
        srcIdealAmount: 460,
        srcDeviation: 0.8695652173913043,
        dstAdjust: 221,
        dstIdealAmount: 621.6,
        dstDeviation: 0.999034749034749,
        dstAmount: 621,
        srcCurrentRate: 0.34782608695652173,
        dstCurrentRate: 0.3996138996138996,
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
