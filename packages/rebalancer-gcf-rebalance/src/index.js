import uuid from 'uuid';
import Portfolio from './dataforge';

// const dataforge = require('./dataforge');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

const a = 1;
const b = 1;

const helloGET = (req, res) => {
  res.send(uuid.v4());
};

export { helloGET };
