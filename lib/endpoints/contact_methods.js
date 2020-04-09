/**
 * @file 'User Contact Methods' endpoint operations.
 */

/**
 * Get a list of all contact methods for a user.
 *
 * @param {String} user VictorOps user ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactMethods(user) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}`);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/contact-methods`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a list of all contact devices for a user.
 *
 * @param {String} user VictorOps user ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactDevices(user) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/devices`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Delete a contact device for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {String} contactId The unique contact ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deleteContactDevice(user, contactId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/devices/${contactId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get the indicated contact device for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {String} contactId The unique contact ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactDevice(user, contactId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/devices/${contactId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Update a contact device for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {String} contactId The unique contact ID.
 * @param {Object} contactDevice Contact device information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function updateContactDevice(user, contactId, contactDevice = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('PUT',
      `${apiPrefix}/devices/${contactId}`,
      null, contactDevice);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a list of all contact emails for a user.
 *
 * @param {String} user VictorOps user ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactEmails(user) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/emails`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create a contact email for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {Object} contactEmail Contact email information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function createContactEmail(user, contactEmail = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/emails`,
      null, contactEmail);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Delete a contact email for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {String} contactId The unique contact ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deleteContactEmail(user, contactId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/emails/${contactId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a contact email for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {String} contactId The unique contact ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactEmail(user, contactId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/emails/${contactId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a list of all contact phones for a user.
 *
 * @param {String} user VictorOps user ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactPhones(user) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/phones`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create a contact phone for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {Object} contactPhone Contact phone information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function createContactPhone(user, contactPhone = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/phones`,
      null, contactPhone);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Delete a contact phone for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {String} contactId The unique contact ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deleteContactPhone(user, contactId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/phones/${contactId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Get a contact phone for a user.
 *
 * @param {String} user VictorOps user ID.
 * @param {String} contactId The unique contact ID.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function getContactPhone(user, contactId) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`user/${user}/contact-methods`);
    // Get the request options.
    const options = this._getRequestOptions('GET',
      `${apiPrefix}/phones/${contactId}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getContactMethods,
  getContactDevices,
  deleteContactDevice,
  getContactDevice,
  updateContactDevice,
  getContactEmails,
  createContactEmail,
  deleteContactEmail,
  getContactEmail,
  getContactPhones,
  createContactPhone,
  deleteContactPhone,
  getContactPhone,
};
