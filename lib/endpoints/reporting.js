/**
 * @file 'Reporting' endpoint operations.
 */

/**
 * Get a list of shift changes for a team.
 *
 * @param {String} team Team slug.
 * @param {Object} [query={}] Query parameters.
 * @returns {Promise<Object>} List of shift changes.
 */
async function getShiftChanges(team, query = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`team/${team}`, 1, true);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/oncall/log`, query);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get/search incident history.
 *
 * @param {Object} [query={}] Query parameters.
 * @returns {Promise<Object>} List of incidents matching the request filters.
 */
async function getIncidentHistory(query = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(null, 2, true);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/incidents`, query);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getShiftChanges,
  getIncidentHistory,
};
