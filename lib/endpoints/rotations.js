/**
 * @file 'Rotations' endpoint operations.
 */

/**
 * Get a list of all rotation groups for a team.
 *
 * @param {String} team VictorOps user ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getRotationGroups(team) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`teams/${team}`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/rotations`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getRotationGroups,
};
