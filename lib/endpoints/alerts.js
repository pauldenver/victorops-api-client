/**
 * @file 'Alerts' endpoint operations.
 */

/**
 * Get information about an alert.
 *
 * @param {String} uuid Alert ID.
 * @returns {Promise<Object>} Alert information.
 */
async function getAlert(uuid) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('alerts');
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/${uuid}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getAlert,
};
