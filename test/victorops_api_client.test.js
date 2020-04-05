const { expect } = require('chai');
const rewire = require('rewire');
const nock = require('nock');
const VictorOpsApiClient = require('../lib');

const clientRewire = rewire('../lib/victorops_api_client');
const baseUrl = clientRewire.__get__('BASE_URL');
const apiPublic = clientRewire.__get__('API_PUBLIC');
const apiReporting = clientRewire.__get__('API_REPORTING');
const userAgent = clientRewire.__get__('USER_AGENT');

describe('VictorOps API Client Tests', () => {
  let client;

  const clientOptions = {
    apiId: 'c97d6dc9',
    apiKey: '5606f20bd449cfb873d82f59fecb7bba'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });
  
  context(`'VictorOpsApiClient' Class instance`, () => {
    it(`should be an instance of 'VictorOpsApiClient'`, () => {
      expect(client).to.be.an('object');
      expect(client).to.be.an.instanceof(VictorOpsApiClient);
    });

    it(`should have a public 'constructor' method`, () => {
      expect(client.constructor).to.be.an('function');
      expect(client.constructor).to.be.an.instanceof(Function);
    });

    it(`should have a private '_checkOptions' method`, () => {
      expect(client._checkOptions).to.be.an('function');
      expect(client._checkOptions).to.be.an.instanceof(Function);
    });

    it(`should have a private '_getRequestHeaders' method`, () => {
      expect(client._getRequestHeaders).to.be.an('function');
      expect(client._getRequestHeaders).to.be.an.instanceof(Function);
    });

    it(`should have a private '_getRequestOptions' method`, () => {
      expect(client._getRequestOptions).to.be.an('function');
      expect(client._getRequestOptions).to.be.an.instanceof(Function);
    });

    it(`should have a private '_performRequest' method`, () => {
      expect(client._performRequest).to.be.an('function');
      expect(client._performRequest).to.be.an.instanceof(Function);
    });

    it(`should have a private '_handleError' method`, () => {
      expect(client._handleError).to.be.an('function');
      expect(client._handleError).to.be.an.instanceof(Function);
    });

    it(`should have a public 'getApiPrefix' method`, () => {
      expect(client.getApiPrefix).to.be.an('function');
      expect(client.getApiPrefix).to.be.an.instanceof(Function);
    });
  });

  context('#constructor()', () => {
    it(`should have a private '_options' property`, () => {
      let otherClient;
      
      try {
        expect(client).to.have.property('_options');
        expect(client._options).to.be.an('object');
        expect(client._options).to.eql(clientOptions);

        otherClient = new VictorOpsApiClient();
      } catch(err) {
        expect(otherClient).to.be.undefined;
      }
    });

    it(`should have a public 'apiId' property`, () => {
      expect(client).to.have.property('apiId');
      expect(client.apiId).to.be.a('string');
      expect(client.apiId).to.eql(clientOptions.apiId);
    });

    it(`should have a public 'apiKey' property`, () => {
      expect(client).to.have.property('apiKey');
      expect(client.apiKey).to.be.a('string');
      expect(client.apiKey).to.eql(clientOptions.apiKey);
    });
  });

  context('#_checkOptions()', () => {
    it('should check and set the options', () => {
      const options = {
        apiId: 'ufos9fwo9ls9s',
        apiKey: '99hf9a9fy9qhuav29sy53gds4ilsu'
      };

      client._checkOptions(options);

      expect(client.apiId).to.be.a('string');
      expect(client.apiId).to.eql(options.apiId);
      expect(client.apiKey).to.be.a('string');
      expect(client.apiKey).to.eql(options.apiKey);
    });

    it(`should throw an error when missing an 'apiId'`, () => {
      const options = {
        apiKey: '99hf9a9fy9qhuav29sy53gds4ilsu'
      };

      try {
        client._checkOptions(options);
      } catch(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err).to.have.property('message',
          'A VictorOps Api ID is a required option.');
      }
    });

    it(`should throw an error when 'apiId' is empty`, () => {
      const options = {
        apiId: '',
        apiKey: '99hf9a9fy9qhuav29sy53gds4ilsu'
      };

      try {
        client._checkOptions(options);
      } catch(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err).to.have.property('message',
          'A VictorOps Api ID is a required option.');
      }
    });

    it(`should throw an error when missing an 'apiKey'`, () => {
      const options = {
        apiId: 'ufos9fwo9ls9s'
      };

      try {
        client._checkOptions(options);
      } catch(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err).to.have.property('message',
          'A VictorOps Api Key is a required option.');
      }
    });

    it(`should throw an error when 'apiKey' is empty`, () => {
      const options = {
        apiId: 'ufos9fwo9ls9s',
        apiKey: ''
      };

      try {
        client._checkOptions(options);
      } catch(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err).to.have.property('message',
          'A VictorOps Api Key is a required option.');
      }
    });
  });

  context('#_getRequestHeaders()', () => {
    it('should get the request headers', () => {
      const expectedHeaders = {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
        'X-VO-Api-Id': clientOptions.apiId,
        'X-VO-Api-Key': clientOptions.apiKey,
        'User-Agent': userAgent,
      };

      const headers = client._getRequestHeaders();

      expect(headers).to.be.an('object');
      expect(headers).to.eql(expectedHeaders);
    });

    it(`should throw an error when missing an 'apiId'`, () => {
      client.apiId = null;
      client.apiKey = clientOptions.apiKey;

      try {
        client._getRequestHeaders();
      } catch (err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err).to.have.property('message',
          'Missing the Api ID (apiId) or Api Key (apiKey).');
      }
    });

    it(`should throw an error when missing an 'apiKey'`, () => {
      client.apiId = clientOptions.apiId;
      client.apiKey = null;

      try {
        client._getRequestHeaders();
      } catch (err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err).to.have.property('message',
          'Missing the Api ID (apiId) or Api Key (apiKey).');
      }
    });
  });

  context('#_getRequestOptions()', () => {
    it('should get the request options without query parameters or body', () => {
      // Get the options.
      const options = client._getRequestOptions('GET', '/api-public/v1/user');

      expect(options).to.be.an('object');
      expect(options).to.have.property('baseUrl', baseUrl);
      expect(options).to.have.property('uri', '/api-public/v1/user');
      expect(options).to.have.property('method', 'GET');
      expect(options).to.have.property('headers');
      expect(options.headers).to.be.an('object');
      expect(options).to.have.property('timeout', 5000);
      expect(options).to.have.property('json', true);
      expect(options.qs).to.be.undefined;
      expect(options.body).to.be.undefined;
    });

    it('should get the request options with query parameters and without a body', () => {
      const query = {
        daysForward: 14
      };

      // Get the options.
      const options = client._getRequestOptions('GET',
        '/api-public/v2/user/testUser/oncall/schedule', query);

      expect(options).to.be.an('object');
      expect(options).to.have.property('baseUrl', baseUrl);
      expect(options).to.have.property('uri',
        '/api-public/v2/user/testUser/oncall/schedule');
      expect(options).to.have.property('method', 'GET');
      expect(options).to.have.property('headers');
      expect(options.headers).to.be.an('object');
      expect(options).to.have.property('timeout', 5000);
      expect(options).to.have.property('json', true);
      expect(options).to.have.property('qs');
      expect(options.qs).to.be.an('object');
      expect(options.qs).to.eql(query);
      expect(options.body).to.be.undefined;
    });

    it('should get the request options with a body and without query parameters', () => {
      const body = {
        firstName: 'Boba',
        lastName: 'Fett',
        username: 'bobafett',
        email: 'bobafett@starwars.com',
        admin: true
      };
  
      // Get the options.
      const options = client._getRequestOptions('POST',
        '/api-public/v1/user', null, body);
  
      expect(options).to.be.an('object');
      expect(options).to.have.property('baseUrl', baseUrl);
      expect(options).to.have.property('uri', '/api-public/v1/user');
      expect(options).to.have.property('method', 'POST');
      expect(options).to.have.property('headers');
      expect(options.headers).to.be.an('object');
      expect(options).to.have.property('timeout', 5000);
      expect(options).to.have.property('json', true);
      expect(options).to.have.property('body');
      expect(options.body).to.be.an('object');
      expect(options.body).to.eql(body);
      expect(options.qs).to.be.undefined;
    });
  });

  context('#_performRequest()', () => {
    const response = {
      users: [
        [
          {
            firstName: 'Boba',
            lastName: 'Fett',
            username: 'bobafett',
            email: 'bobafett@starwars.com',
            createdAt: '2020-01-31T14:19:33Z',
            passwordLastUpdated: '2020-01-31T14:19:33Z',
            verified: true,
            _selfUrl: '/api-public/v1/user/bobafett'
          }
        ]
      ]
    };

    before(() => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user')
        .reply(200, response);
    });

    it('should return a VictorOps API response', async () => {
      // Get the options.
      const options = client._getRequestOptions('GET', '/api-public/v1/user');

      // Perform the request.
      const users = await client._performRequest(options);

      expect(users).to.be.an('object');
      expect(users).to.eql(response);
    });

    after(() => {
      nock.cleanAll();
    });
  });

  context('#_handleError()', () => {
    it(`should return a stripped 'StatusCodeError' error`, () => {
      const statusCode = 403;
      const response = {
        body: 'Authentication failed or rate-limit reached'
      };

      const err = new Error(`${statusCode} - "${response.body}"`);
      err.name = 'StatusCodeError';
      err.statusCode = statusCode;
      err.response = response;
      err.error = {};
      err.options = {};

      // Create the error.
      const handledErr = client._handleError(err);

      expect(handledErr).to.be.an.instanceof(Error);
      expect(handledErr.name).to.eql('StatusCodeError');
      expect(handledErr.statusCode).to.eql(statusCode);
      expect(handledErr.message).to.eql(`${statusCode} - "${response.body}"`);
      expect(handledErr.response).to.eql(response);
      expect(handledErr.error).to.be.undefined;
      expect(handledErr.options).to.be.undefined;
    });

    it(`should return a stripped 'RequestError' error`, () => {
      const passedErr = new Error('RequestError test');

      const err = new Error(String(passedErr));
      err.name = 'RequestError';
      err.cause = passedErr;
      err.error = passedErr;
      err.options = {};

      // Create the error.
      const handledErr = client._handleError(err);

      expect(handledErr).to.be.an.instanceof(Error);
      expect(handledErr.name).to.eql('RequestError');
      expect(handledErr.message).to.eql(String(passedErr));
      expect(handledErr.cause).to.eql(passedErr);
      expect(handledErr.error).to.be.undefined;
      expect(handledErr.options).to.be.undefined;
    });

    it(`should return a stripped 'TransformError' error`, () => {
      const passedErr = new Error('TransformError test');

      const err = new Error(String(passedErr));
      err.name = 'TransformError';
      err.cause = passedErr;
      err.error = passedErr;
      err.options = {};

      // Create the error.
      const handledErr = client._handleError(err);

      expect(handledErr).to.be.an.instanceof(Error);
      expect(handledErr.name).to.eql('TransformError');
      expect(handledErr.message).to.eql(String(passedErr));
      expect(handledErr.cause).to.eql(passedErr);
      expect(handledErr.error).to.be.undefined;
      expect(handledErr.options).to.be.undefined;
    });

    it(`should return a unstripped 'TransformError' error`, () => {
      const passedErr = new Error('TransformError test');
  
      const err = new Error(String(passedErr));
      err.name = 'TransformError';
      err.cause = passedErr;
  
      // Create the error.
      const handledErr = client._handleError(err);
  
      expect(handledErr).to.be.an.instanceof(Error);
      expect(handledErr.name).to.eql('TransformError');
      expect(handledErr.message).to.eql(String(passedErr));
      expect(handledErr.cause).to.eql(passedErr);
      expect(handledErr.error).to.be.undefined;
      expect(handledErr.options).to.be.undefined;
    });
  });

  context('#getApiPrefix()', () => {
    let apiPrefix;

    it('should return the regular API prefix without a path', () => {
      // Get the prefix.
      apiPrefix = client.getApiPrefix();

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiPublic}/v1`);

      // Get the prefix with version.
      apiPrefix = client.getApiPrefix(undefined, 2);

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiPublic}/v2`);
    });

    it('should return the regular API prefix with a path', () => {
      // Get the prefix.
      apiPrefix = client.getApiPrefix('alerts');

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiPublic}/v1/alerts`);

      // Get the prefix with version.
      apiPrefix = client.getApiPrefix('alerts', 2);

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiPublic}/v2/alerts`);
    });

    it('should return the reporting API prefix without a path', () => {
      // Get the prefix.
      apiPrefix = client.getApiPrefix(undefined, undefined, true);

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiReporting}/v1`);

      // Get the prefix with version.
      apiPrefix = client.getApiPrefix(undefined, 2, true);

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiReporting}/v2`);
    });

    it('should return the reporting API prefix with a path', () => {
      // Get the prefix.
      apiPrefix = client.getApiPrefix('team/myteam', undefined, true);

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiReporting}/v1/team/myteam`);

      // Get the prefix with version.
      apiPrefix = client.getApiPrefix('team/myteam', 2, true);

      expect(apiPrefix).to.be.a('string');
      expect(apiPrefix).to.eql(`${apiReporting}/v2/team/myteam`);
    });
  });
});