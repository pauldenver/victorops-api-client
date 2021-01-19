/**
 * @file 'Chat' endpoint operations.
 */

/**
 * Send a chat message.
 *
 * @param {Object} [chatInfo={}] Chat information.
 * @returns {Promise<Object>} VictorOps API response.
 */
async function sendChat(chatInfo = {}) {
  try {
    // Get the API prefix.
    const apiPrefix = this.getApiPrefix();
    // Get the request options.
    const options = this._getRequestOptions('POST', `${apiPrefix}/chat`,
      null, chatInfo);
    // Peform the request.
    return await this._performRequest(options);
  } catch (err) {
    throw this._handleError(err);
  }
}

module.exports = {
  sendChat,
};
