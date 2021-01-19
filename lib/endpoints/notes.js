/**
 * @file 'Notes' endpoint operations.
 */

/**
 * Get the notes associated with an incident.
 *
 * @param {Number} incidentNumber Incident number.
 * @returns {Promise<Object>} The set of notes.
 */
async function getNotes(incidentNumber) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`incidents/${incidentNumber}`);
    // Get the request options.
    const options = this._getRequestOptions('GET', `${apiPrefix}/notes`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Create a new note.
 *
 * @param {Number} incidentNumber Incident number.
 * @param {Object} [noteInfo={}] Note information.
 * @returns {Promise<Object>} The note info for the new note.
 */
async function createNote(incidentNumber, noteInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`incidents/${incidentNumber}`);
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/notes`,
      null, noteInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Delete a note.
 *
 * @param {Number} incidentNumber Incident number.
 * @param {String} noteName Note name.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function deleteNote(incidentNumber, noteName) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`incidents/${incidentNumber}`);
    // Get the request options.
    const options = this._getRequestOptions('DELETE',
      `${apiPrefix}/notes/${noteName}`);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

/**
 * Update an existing note.
 *
 * @param {Number} incidentNumber Incident number.
 * @param {String} noteName Name of the note.
 * @param {Object} [noteInfo={}] Note information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function updateNote(incidentNumber, noteName, noteInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix(`incidents/${incidentNumber}`);
    // Get the request options.
    const options = this._getRequestOptions('PUT',
      `${apiPrefix}/notes/${noteName}`, null, noteInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
