const request = require('request-promise');
const mapValues = require('lodash.mapvalues');
const has = require('lodash.has');
const isPlainObject = require('lodash.isplainobject');
const isEmpty = require('lodash.isempty');
const { version } = require('../package.json');

// Import all of the endpoints.
const oncallEndpoint = require('./endpoints/oncall');
const incidentsEndpoint = require('./endpoints/incidents');
const alertsEndpoint = require('./endpoints/alerts');
const reportingEndpoint = require('./endpoints/reporting');
const usersEndpoint = require('./endpoints/users');
const contactMethodsEndpoint = require('./endpoints/contact_methods');
const userPagingPoliciesEndpoint = require('./endpoints/user_paging_policies');
const pagingPolicyValuesEndpoint = require('./endpoints/paging_policy_values');
const pagingPoliciesEndpoint = require('./endpoints/personal_paging_policies');
const teamsEndpoint = require('./endpoints/teams');
const escalationPoliciesEndpoint = require('./endpoints/escalation_policies');
const routingKeysEndpoint = require('./endpoints/routing_keys');
const overridesEndpoint = require('./endpoints/scheduled_overrides');
const rotationsEndpoint = require('./endpoints/rotations');
const webhooksEndpoint = require('./endpoints/webhooks');
const maintenanceModeEndpoint = require('./endpoints/maintenance_mode');

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
    this.apiId = null;
    this.apiKey = null;

    // Check the options.
    this._checkOptions(this._options);

    // Get the headers for the requests.
    this.headers = this._getRequestHeaders();
    this.timeout = this._options.timeout || 5000;
    this.baseUrl = this._options.baseUrl || BASE_URL;
    this.fullResponse = this._options.fullResponse || false;

    // Add the endpoints.
    this.oncall = mapValues(oncallEndpoint, (ep) => ep.bind(this));
    this.incidents = mapValues(incidentsEndpoint, (ep) => ep.bind(this));
    this.alerts = mapValues(alertsEndpoint, (ep) => ep.bind(this));
    this.reporting = mapValues(reportingEndpoint, (ep) => ep.bind(this));
    this.users = mapValues(usersEndpoint, (ep) => ep.bind(this));
    this.contactMethods = mapValues(contactMethodsEndpoint,
      (ep) => ep.bind(this));
    this.userPagingPolicies = mapValues(userPagingPoliciesEndpoint,
      (ep) => ep.bind(this));
    this.pagingPolicyValues = mapValues(pagingPolicyValuesEndpoint,
      (ep) => ep.bind(this));
    this.personalPagingPolicies = mapValues(pagingPoliciesEndpoint,
      (ep) => ep.bind(this));
    this.teams = mapValues(teamsEndpoint, (ep) => ep.bind(this));
    this.escalationPolicies = mapValues(escalationPoliciesEndpoint,
      (ep) => ep.bind(this));
    this.routingKeys = mapValues(routingKeysEndpoint, (ep) => ep.bind(this));
    this.scheduledOverrides = mapValues(overridesEndpoint,
      (ep) => ep.bind(this));
    this.rotations = mapValues(rotationsEndpoint, (ep) => ep.bind(this));
    this.webhooks = mapValues(webhooksEndpoint, (ep) => ep.bind(this));
    this.maintenanceMode = mapValues(maintenanceModeEndpoint,
      (ep) => ep.bind(this));
  }

  /**
   * Checks the provided options.
   *
   * @param {Object} options Provided options.
   * @memberof VictorOpsApiClient
   */
  _checkOptions(options) {
    // Check the 'apiId'.
    if ((!has(options, 'apiId') && !has(process, 'env.VO_API_ID')) ||
      isEmpty(options.apiId)
    ) {
      throw new Error('A VictorOps Api ID is a required option.');
    }

    // Check the 'apiKey'.
    if ((!has(options, 'apiKey') && !has(process, 'env.VO_API_KEY')) ||
      isEmpty(options.apiId)
    ) {
      throw new Error('A VictorOps Api Key is a required option.');
    }

    this.apiId = process.env.VO_API_ID || options.apiId;
    this.apiKey = process.env.VO_API_KEY || options. apiKey;
  }

  /**
   * Gets the headers for a VictorOps API request.
   *
   * @returns {Object} Request headers.
   * @memberof VictorOpsApiClient
   */
  _getRequestHeaders() {
    if (!this.apiId || !this.apiKey) {
      throw new Error('Missing the Api ID (apiId) or Api Key (apiKey).');
    }

    return {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'X-VO-Api-Id': this.apiId,
      'X-VO-Api-Key': this.apiKey,
      'User-Agent': USER_AGENT,
    };
  }

  /**
   * Gets the request options for a VictorOps API request.
   *
   * @param {String} method HTTP method.
   * @param {String} path HTTP request path.
   * @param {Object} [qs=null] Query parameters.
   * @param {Object} [body=null] Entity body for PATCH, POST and PUT requests.
   * @returns {Object} Request options.
   * @memberof VictorOpsApiClient
   */
  _getRequestOptions(method, path, qs = null, body = null) {
    // Set the request options.
    const options = {
      baseUrl: this.baseUrl,
      uri: path,
      method,
      headers: this.headers,
      timeout: this.timeout,
      json: true,
      qs: (qs && isPlainObject(qs)) ? qs : undefined,
      resolveWithFullResponse: this.fullResponse,
    };

    // Add body value (if needed).
    if (/put|post|patch|delete/i.test(method) &&
      (body && isPlainObject(body))
    ) {
      options.body = body;
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
    return await request(options);
  }

  /**
   * Removes some properties from a 'request-promise'
   * Error object.
   *
   * @param {Error} err The 'request-promise' Error.
   * @returns {Error} The modified error.
   * @memberof VictorOpsApiClient
   */
  _handleError(err) {
    // Remove the 'legacy' error property and the request options property.
    if (has(err, 'error') || has(err, 'options')) {
      delete err.error;
      delete err.options;
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
