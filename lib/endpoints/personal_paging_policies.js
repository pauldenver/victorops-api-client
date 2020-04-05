/**
 * @file 'Personal Paging Policies' endpoint operations.
 */

/**
 * Get a user's paging policy.
 *
 * @param {String} username User's username.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getPagingPolicy(username) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/policies`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create a paging policy step.
 *
 * @param {String} username User's username.
 * @param {Object} stepInfo Paging policy step information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function createPolicyStep(username, stepInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/policies`,
      null, stepInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a paging policy step.
 *
 * @param {String} username User's username.
 * @param {Number} step Paging policy step.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getPolicyStep(username, step) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/policies/${step}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Creates a rule for a paging policy step.
 *
 * @param {String} username User's username.
 * @param {Number} step Paging policy step.
 * @param {Object} ruleInfo Rule information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function createPolicyStepRule(username, step, ruleInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('POST',
      `${apiPrefix}/policies/${step}`, null, ruleInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Updates a paging policy step.
 *
 * @param {String} username User's username.
 * @param {Number} step Paging policy step.
 * @param {Object} stepInfo Step information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function updatePolicyStep(username, step, stepInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('PUT',
      `${apiPrefix}/policies/${step}`, null, stepInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Deletes a rule for a paging policy step.
 *
 * @param {String} username User's username.
 * @param {Number} step Paging policy step.
 * @param {Number} rule Paging policy step rule.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deletePolicyStepRule(username, step, rule) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/policies/${step}/${rule}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Gets a rule for a paging policy step.
 *
 * @param {String} username User's username.
 * @param {Number} step Paging policy step.
 * @param {Number} rule Paging policy step rule.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getPolicyStepRule(username, step, rule) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/policies/${step}/${rule}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Updates a rule for a paging policy step.
 *
 * @param {String} username User's username.
 * @param {Number} step Paging policy step.
 * @param {Number} rule Paging policy step rule.
 * @param {Object} ruleInfo Rule information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function updatePolicyStepRule(username, step, rule, ruleInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`profile/${username}`);
    // Get the request options.
    const options = this._getRequestOptions('PUT',
      `${apiPrefix}/policies/${step}/${rule}`, null, ruleInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getPagingPolicy,
  createPolicyStep,
  getPolicyStep,
  createPolicyStepRule,
  updatePolicyStep,
  deletePolicyStepRule,
  getPolicyStepRule,
  updatePolicyStepRule,
};
