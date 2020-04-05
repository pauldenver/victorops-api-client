/**
 * @file 'Escalation Policies' endpoint operations.
 */

/**
 * Get a list of escalation policy information.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getPolicies() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/policies`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create an escalation policy.
 *
 * @param {Object} policyInfo Escalation policy information.
 * @returns {Promise<Object>} VictorOps API response.
 *
 */
async function createPolicy(policyInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST',
        `${apiPrefix}/policies`, null, policyInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Delete a specified escalation policy.
 *
 * @param {String} policy Escalation policy slug.
 * @returns {Promise<Object>} VictorOps API response.
 *
 */
async function deletePolicy(policy) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
        `${apiPrefix}/policies/${policy}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a specific escalation policy.
 *
 * @param {String} policy Escalation policy slug.
 * @returns {Promise<Object>} VictorOps API response.
 *
 */
async function getPolicy(policy) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
        `${apiPrefix}/policies/${policy}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getPolicies,
  createPolicy,
  deletePolicy,
  getPolicy,
};
