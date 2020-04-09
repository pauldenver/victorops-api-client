/**
 * @file 'On-call' endpoint operations.
 */

/**
 * Get a user's on-call schedule.
 *
 * @param {String} user VictorOps user ID.
 * @param {Object} [query={}] Query parameters.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getUserSchedule(user, query = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}`, 2);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/oncall/schedule`, query);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a team's on-call schedule.
 *
 * @param {String} team Team slug.
 * @param {Object} [query={}] Query parameters.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getTeamSchedule(team, query = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`team/${team}`, 2);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/oncall/schedule`, query);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get an organization's on-call users.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getOncallUsers() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/oncall/current`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create an on-call override (take on-call).
 *
 * @param {String} policy Policy slug.
 * @param {Object} [takeOncall={}] Take on-call information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function createOncallOverride(policy, takeOncall = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`policies/${policy}`);
    // Get the request options.
    const options = this._getRequestOptions('PATCH',
      `${apiPrefix}/oncall/user`, null, takeOncall);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getUserSchedule,
  getTeamSchedule,
  getOncallUsers,
  createOncallOverride,
};
