/**
 * @file 'Incidents' endpoint operations.
 */

/**
 * Get the current incident information.
 *
 * @returns {Promise<Object>} Incidents.
 */
async function getIncidents() {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/incidents`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Creates a new incident.
 *
 * @param {Object} [details={}] Incident details.
 * @returns {Promise<Object>} Information about the created incident.
 */
async function createIncident(details = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/incidents`,
      null, details);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Acknowledge an incident or list of incidents.
 *
 * @param {Object} [ackInfo={}] Acknowledge information.
 * @returns {Promise<Object>} The result of each acknowledge incident action.
 */
async function ackIncidents(ackInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('incidents');
    // Get the request options.
    const options = this._getRequestOptions('PATCH',
      `${apiPrefix}/ack`, null, ackInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Reroute one or more incidents to one or more users
 * and/or escalation policies.
 *
 * @param {Object} [rules={}] Reroute rules.
 * @returns {Promise<Object>} The created reroute object.
 */
async function rerouteIncidents(rules = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('incidents');
    // Get the request options.
    const options = this._getRequestOptions('POST',
      `${apiPrefix}/reroute`, null, rules);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Resolve an incident or list of incidents.
 *
 * @param {Object} [resolveInfo={}] Resolve information.
 * @returns {Promise<Object>} The result of each resolve incident action.
 */
async function resolveIncidents(resolveInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('incidents');
    // Get the request options.
    const options = this._getRequestOptions('PATCH',
      `${apiPrefix}/resolve`, null, resolveInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Acknowledge all incidents for which a user was paged.
 *
 * @param {Object} [ackInfo={}] Acknowledge information.
 * @returns {Promise<Object>} The result of each acknowledge incident action.
 */
async function ackUserIncidents(ackInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('incidents');
    // Get the request options.
    const options = this._getRequestOptions('PATCH',
      `${apiPrefix}/byUser/ack`, null, ackInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Resolve all incidents for which a user was paged.
 *
 * @param {Object} [resolveInfo={}] Resolve information.
 * @returns {Promise<Object>} The result of each resolve incident action.
 */
async function resolveUserIncidents(resolveInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix('incidents');
    // Get the request options.
    const options = this._getRequestOptions('PATCH',
      `${apiPrefix}/byUser/resolve`, null, resolveInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getIncidents,
  createIncident,
  ackIncidents,
  rerouteIncidents,
  resolveIncidents,
  ackUserIncidents,
  resolveUserIncidents,
};
