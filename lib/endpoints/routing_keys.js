/**
 * @file 'Routing Keys' endpoint operations.
 */

/**
 * List routing keys and associated teams.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getRoutingKeys() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/org/routing-keys`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create a new routing key with escalation policy mapping.
 *
 * @param {Object} keyInfo Routing key information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function createRoutingKey(keyInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST',
      `${apiPrefix}/org/routing-keys`, null, keyInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getRoutingKeys,
  createRoutingKey,
};
