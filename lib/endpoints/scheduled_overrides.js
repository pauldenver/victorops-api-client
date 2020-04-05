/**
 * @file 'Scheduled Overrides' endpoint operations.
 */

/**
 * List all the scheduled overrides for an organization.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getOverrides() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/overrides`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create a new scheduled override.
 *
 * @param {Object} overrideInfo Scheduled override information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function createOverride(overrideInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/overrides`,
        null, overrideInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Deletes a scheduled override.
 *
 * @param {String} publicId Scheduled override Public ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deleteOverride(publicId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
        `${apiPrefix}/overrides/${publicId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the specified scheduled override.
 *
 * @param {String} publicId Scheduled override Public ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getOverride(publicId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
        `${apiPrefix}/overrides/${publicId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the specified scheduled override assignments.
 *
 * @param {String} publicId Scheduled override Public ID.
 * @returns {Promise<Array<Object>>} VictorOps API response.
 */
async function getAssignments(publicId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`overrides/${publicId}`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/assignments`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Delete a scheduled override assignment.
 *
 * @param {String} publicId Scheduled override Public ID.
 * @param {String} policySlug Assignment policy slug.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deleteAssignment(publicId, policySlug) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`overrides/${publicId}`);
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
        `${apiPrefix}/assignments/${policySlug}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the specified scheduled override assignments.
 *
 * @param {String} publicId Scheduled override Public ID.
 * @param {String} policySlug Assignment policy slug.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getAssignment(publicId, policySlug) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`overrides/${publicId}`);
    // Get the request options.
    const options = this._getRequestOptions('GET',
        `${apiPrefix}/assignments/${policySlug}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Update a scheduled override assignment.
 *
 * @param {String} publicId Scheduled override Public ID.
 * @param {String} policySlug Assignment policy slug.
 * @param {Object} assignmentInfo Assignment information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function updateAssignment(publicId, policySlug, assignmentInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`overrides/${publicId}`);
    // Get the request options.
    const options = this._getRequestOptions('PUT',
        `${apiPrefix}/assignments/${policySlug}`, null, assignmentInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getOverrides,
  createOverride,
  deleteOverride,
  getOverride,
  getAssignments,
  deleteAssignment,
  getAssignment,
  updateAssignment,
};
