/**
 * @file 'Users' endpoint operations.
 */

/**
 * Get a list of users for an organization.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getUsers() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/user`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Add a user to an organization.
 *
 * @param {Object} user User information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function addUser(user = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/user`,
      null, user);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Add users to an organization.
 *
 * @param {Array<Object>} [users=[]] User information list.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function addUsers(users = []) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/user/batch`,
      null, { users });
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Remove a user from an organization.
 *
 * @param {String} user User's username.
 * @param {Object} [replacement={}] Replacement information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deleteUser(user, replacement = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/user/${user}`, null, replacement);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the information for the specified user.
 *
 * @param {String} user User's username.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getUser(user) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/user/${user}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Update the designated user.
 *
 * @param {String} user User's username.
 * @param {Object} [userInfo={}] User information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function updateUser(user, userInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('PUT',
      `${apiPrefix}/user/${user}`,
      null, userInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the user's team membership.
 *
 * @param {String} user User's username.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getTeams(user) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/user/${user}/teams`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getUsers,
  addUser,
  addUsers,
  deleteUser,
  getUser,
  updateUser,
  getTeams,
};
