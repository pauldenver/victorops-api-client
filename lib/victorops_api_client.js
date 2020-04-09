const axios = require('axios');
const mapValues = require('lodash.mapvalues');
const has = require('lodash.has');
const isPlainObject = require('lodash.isplainobject');
const isEmpty = require('lodash.isempty');
const { version } = require('../package.json');

// Import all of the endpoints.
const oncall = require('./endpoints/oncall');
const incidents = require('./endpoints/incidents');
const alerts = require('./endpoints/alerts');
const reporting = require('./endpoints/reporting');
const users = require('./endpoints/users');
const contactMethods = require('./endpoints/contact_methods');
const userPagingPolicies = require('./endpoints/user_paging_policies');
const pagingPolicyValues = require('./endpoints/paging_policy_values');
const pagingPolicies = require('./endpoints/personal_paging_policies');
const teams = require('./endpoints/teams');
const escalationPolicies = require('./endpoints/escalation_policies');
const routingKeys = require('./endpoints/routing_keys');
const overrides = require('./endpoints/scheduled_overrides');
const rotations = require('./endpoints/rotations');
const webhooks = require('./endpoints/webhooks');
const maintenanceMode = require('./endpoints/maintenance_mode');

// Import the error utils.
const { RequestError, StatusCodeError,
  isAxiosRequestError, isAxiosResponseError } = require('./utils/errors');
const status = require('./utils/status');

// Base URL for VictorOps REST API.
const BASE_URL = 'https://api.victorops.com';
// API Prefixes.
const API_PUBLIC = '/api-public';
const API_REPORTING = '/api-reporting';
// Client user agent string.
const USER_AGENT = `VictorOps-API-Client/${version}`;
// Default API version.
const API_VERSION = 1;

/**
 * A library for interacting with the VictorOps REST API.
 *
 * @class VictorOpsApiClient
 */
class VictorOpsApiClient {
  /**
   * Creates an instance of VictorOpsApiClient.
   *
   * @param {Object} [options={}] The client options.
   * @memberof VictorOpsApiClient
   */
  constructor(options) {
    this._options = options || {};
    this._apiId = undefined;
    this._apiKey = undefined;

    // Check the options.
    this._checkOptions(this._options);

    // Get the headers for the requests.
    this._headers = this._getRequestHeaders();
    this.timeout = this._options.timeout || 5000;
    this.baseUrl = this._options.baseUrl || BASE_URL;
    this.fullResponse = this._options.fullResponse || false;
    this.maxContentLength = this._options.maxContentLength || 2000;

    // Create the Axios instance.
    this._axiosInstance = this._getAxiosInstance();

    // Add the endpoints.
    this.oncall = mapValues(oncall, (ep) => ep.bind(this));
    this.incidents = mapValues(incidents, (ep) => ep.bind(this));
    this.alerts = mapValues(alerts, (ep) => ep.bind(this));
    this.reporting = mapValues(reporting, (ep) => ep.bind(this));
    this.users = mapValues(users, (ep) => ep.bind(this));
    this.contactMethods = mapValues(contactMethods, (ep) => ep.bind(this));
    this.userPagingPolicies = mapValues(userPagingPolicies, (ep) => ep.bind(this));
    this.pagingPolicyValues = mapValues(pagingPolicyValues, (ep) => ep.bind(this));
    this.personalPagingPolicies = mapValues(pagingPolicies, (ep) => ep.bind(this));
    this.teams = mapValues(teams, (ep) => ep.bind(this));
    this.escalationPolicies = mapValues(escalationPolicies, (ep) => ep.bind(this));
    this.routingKeys = mapValues(routingKeys, (ep) => ep.bind(this));
    this.scheduledOverrides = mapValues(overrides, (ep) => ep.bind(this));
    this.rotations = mapValues(rotations, (ep) => ep.bind(this));
    this.webhooks = mapValues(webhooks, (ep) => ep.bind(this));
    this.maintenanceMode = mapValues(maintenanceMode, (ep) => ep.bind(this));
  }

  /**
   * Checks the provided options.
   *
   * @param {Object} options Provided options.
   * @memberof VictorOpsApiClient
   */
  _checkOptions(options) {
    // Check the 'apiId'.
    if ((!has(options, 'apiId') && !has(process, 'env.VO_API_ID')) &&
      isEmpty(options.apiId)
    ) {
      throw new Error('A VictorOps Api ID is a required option.');
    }

    // Check the 'apiKey'.
    if ((!has(options, 'apiKey') && !has(process, 'env.VO_API_KEY')) &&
      isEmpty(options.apiKey)
    ) {
      throw new Error('A VictorOps Api Key is a required option.');
    }

    this._apiId = (process.env.VO_API_ID || options.apiId).trim();
    this._apiKey = (process.env.VO_API_KEY || options.apiKey).trim();
  }

  /**
   * Gets the headers for a VictorOps API request.
   *
   * @returns {Object} Request headers.
   * @memberof VictorOpsApiClient
   */
  _getRequestHeaders() {
    if (!this._apiId || !this._apiKey) {
      throw new Error('Missing the Api ID (apiId) or Api Key (apiKey).');
    }

    return {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'X-VO-Api-Id': this._apiId,
      'X-VO-Api-Key': this._apiKey,
      'User-Agent': USER_AGENT,
    };
  }

  /**
   * Creates an Axios instance.
   *
   * @returns {Axios} Axios instance.
   * @memberof VictorOpsApiClient
   */
  _getAxiosInstance() {
    return axios.create({
      baseURL: this.baseUrl,
      headers: this._headers,
      timeout: this.timeout,
      responseType: 'json',
      responseEncoding: 'utf8',
      maxContentLength: this.maxContentLength,
    });
  }

  /**
   * Gets the request options for a VictorOps API request.
   *
   * @param {String} method HTTP method.
   * @param {String} path HTTP request path.
   * @param {Object} [qs=null] Query parameters.
   * @param {Object} [body=null] Request body.
   * @returns {Object} Request options.
   * @memberof VictorOpsApiClient
   */
  _getRequestOptions(method, path, qs = null, body = null) {
    // Set the request options.
    const options = {
      method,
      url: path,
      params: (qs && isPlainObject(qs)) ? qs : undefined,
    };

    // Add body value (if needed).
    if (/put|post|patch|delete/i.test(method) &&
      (body && isPlainObject(body))
    ) {
      options.data = body;
    }

    return options;
  }

  /**
   * Performs a VictorOps API request.
   *
   * @param {Object} options Request options.
   * @returns {Promise<Object|Array>} The response from the API request.
   * @memberof VictorOpsApiClient
   */
  async _performRequest(options) {
    // Check the options.
    if (!options || !isPlainObject(options) || isEmpty(options)) {
      throw new Error('A request options object must be provided');
    }

    // Get the response.
    const response = await this._axiosInstance.request(options);

    // Should the full response be returned.
    if (this.fullResponse) {
      // Get the status message.
      const statusMessage = response.statusText || status[response.status];

      return {
        statusCode: response.status,
        statusMessage,
        headers: response.headers,
        data: response.data,
      };
    }

    return response.data;
  }

  /**
   * Creates a custom error from an Axios error.
   *
   * @param {Error} err The 'axios' Error.
   * @returns {Error} The custom error.
   * @memberof VictorOpsApiClient
   */
  _handleError(err) {
    // Check for Axios errors.
    if (isAxiosRequestError(err)) {
      return new RequestError(err);
    } else if (isAxiosResponseError(err)) {
      return new StatusCodeError(err);
    }

    return err;
  }

  /**
   * Gets the API prefix for a request.
   *
   * @param {String} [path=null] Endpoint path.
   * @param {Number} [version=API_VERSION] API version.
   * @param {Boolean} [reporting=false] Reporting endpoint or not.
   * @returns {String} The API prefix.
   * @memberof VictorOpsApiClient
   */
  getApiPrefix(path = null, version = API_VERSION, reporting = false) {
    // Get the base API prefix.
    const baseApi = (reporting) ? API_REPORTING : API_PUBLIC;

    if (path) {
      return `${baseApi}/v${version}/${path}`;
    } else {
      return `${baseApi}/v${version}`;
    }
  }
}

module.exports = VictorOpsApiClient;
