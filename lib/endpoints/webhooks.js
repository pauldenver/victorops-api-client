/**
 * @file 'Webhooks' endpoint operations.
 */

/**
 * Get a list of all the webhooks for an organization.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getWebhooks() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/webhooks`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getWebhooks,
};
