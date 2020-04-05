/**
 * @file 'User Paging Policies' endpoint operations.
 */

/**
 * Get paging policies for a user.
 *
 * @param {String} user VictorOps user ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getPagingPolicies(user) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/policies`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getPagingPolicies,
};
