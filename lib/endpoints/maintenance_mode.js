/**
 * @file 'Maintenance Mode' endpoint operations.
 */

/**
 * Get an organization's current maintenance mode state.
 *
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getModeState() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET',
        `${apiPrefix}/maintenancemode`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Start maintenance mode for routing keys.
 *
 * @param {Object} modeDef Maintenance mode definition.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function startMode(modeDef = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST',
        `${apiPrefix}/maintenancemode/start`, null, modeDef);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * End maintenance mode for routing keys.
 *
 * @param {String} modeId Maintenance mode ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function endMode(modeId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('PUT',
        `${apiPrefix}/maintenancemode/${modeId}/end`, null, {});
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getModeState,
  startMode,
  endMode,
};
