import cors from 'cors';
import Rebalancer from './Rebalancer';

// const dataforge = require('./dataforge');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

const rebalance = (req, res) => {
  cors()(req, res, () => {
    if (req.method !== 'POST') return res.sendStatus(404);
    const { assets, adjust, mode } = req.body;

    try {
      const rebalancer = new Rebalancer(assets);
      const result = rebalancer.rebalance(adjust, mode);
      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
};

export { rebalance };
