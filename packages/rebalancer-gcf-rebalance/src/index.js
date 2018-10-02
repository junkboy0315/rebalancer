const uuid = require('uuid');
const dataforge = require('./dataforge');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

const a = 1;
const b = 1;

exports.helloGET = (req, res) => {
  res.send(uuid.v4());
};
