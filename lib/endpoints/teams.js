/**
 * @file 'Teams' endpoint operations.
 */

/**
 * Get a list of teams for your organization.
 *
 * @returns {Promise<Array<Object>>} VictorOps API response.
 */
async function getTeams() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/team`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Add a team to your organization.
 *
 * @param {Object} teamInfo Team information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function addTeam(teamInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/team`,
      null, teamInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Remove a team from your organization.
 *
 * @param {String} team Team slug ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function removeTeam(team) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/team/${team}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the information for the specified team.
 *
 * @param {String} team Team slug ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getTeam(team) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/team/${team}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Update the information for the specified team.
 *
 * @param {String} team Team slug ID.
 * @param {Object} teamInfo Team information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function updateTeam(team, teamInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('PUT',
      `${apiPrefix}/team/${team}`, null, teamInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the team admins for the specified team.
 *
 * @param {String} team Team slug ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getAdmins(team) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/team/${team}/admins`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the team members for the specified team.
 *
 * @param {String} team Team slug ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getMembers(team) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/team/${team}/members`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Add a team member to the specified team.
 *
 * @param {String} team Team slug ID.
 * @param {Object} memberInfo Team member information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function addMember(team, memberInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST',
      `${apiPrefix}/team/${team}/members`, null, memberInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Remove a team member from the specified team.
 *
 * @param {String} team Team slug ID.
 * @param {String} user Team member username.
 * @param {Object} [replacement={}] Replacement information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function removeMember(team, user, replacement = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/team/${team}/members/${user}`, null, replacement);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getTeams,
  addTeam,
  removeTeam,
  getTeam,
  updateTeam,
  getAdmins,
  getMembers,
  addMember,
  removeMember,
};
