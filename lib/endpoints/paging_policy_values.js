/**
 * @file 'Personal Paging Policy Values' endpoint operations.
 */

/**
 * Get the available notification types.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getNotificationTypes() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('policies/types');
    // Get the request options.
    const options = this._getRequestOptions('GET',
        `${apiPrefix}/notifications`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the available contact types.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactTypes() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('policies/types');
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/contacts`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the available timeout values.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getTimeoutValues() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('policies/types');
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/timeouts`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getNotificationTypes,
  getContactTypes,
  getTimeoutValues,
};
