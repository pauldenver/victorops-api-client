const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const rewire = require('rewire');
const nock = require('nock');
const VictorOpsApiClient = require('../lib');

// Use 'chai-as-promised'.
chai.use(chaiAsPromised);
// Get 'expect'.
const expect = chai.expect;

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

    it(`should have a private '_getAxiosInstance' method`, () => {
      expect(client._getAxiosInstance).to.be.an('function');
      expect(client._getAxiosInstance).to.be.an.instanceof(Function);
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

    it(`should have a private '_apiId' property`, () => {
      expect(client).to.have.property('_apiId');
      expect(client._apiId).to.be.a('string');
      expect(client._apiId).to.eql(clientOptions.apiId);
    });

    it(`should have a private '_apiKey' property`, () => {
      expect(client).to.have.property('_apiKey');
      expect(client._apiKey).to.be.a('string');
      expect(client._apiKey).to.eql(clientOptions.apiKey);
    });
  });

  context('#_checkOptions()', () => {
    it('should check and set the options', () => {
      const options = {
        apiId: 'ufos9fwo9ls9s',
        apiKey: '99hf9a9fy9qhuav29sy53gds4ilsu'
      };

      client._checkOptions(options);

      expect(client._apiId).to.be.a('string');
      expect(client._apiId).to.eql(options.apiId);
      expect(client._apiKey).to.be.a('string');
      expect(client._apiKey).to.eql(options.apiKey);
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
      client._apiId = null;
      client._apiKey = clientOptions.apiKey;

      try {
        client._getRequestHeaders();
      } catch (err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err).to.have.property('message',
          'Missing the Api ID (apiId) or Api Key (apiKey).');
      }
    });

    it(`should throw an error when missing an 'apiKey'`, () => {
      client._apiId = clientOptions.apiId;
      client._apiKey = null;

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
      expect(options).to.have.property('url', '/api-public/v1/user');
      expect(options).to.have.property('method', 'GET');
      expect(options.params).to.be.undefined;
      expect(options.data).to.be.undefined;
    });

    it('should get the request options with query parameters and without a body', () => {
      const query = {
        daysForward: 14
      };

      // Get the options.
      const options = client._getRequestOptions('GET',
        '/api-public/v2/user/testUser/oncall/schedule', query);

      expect(options).to.be.an('object');
      expect(options).to.have.property('url',
        '/api-public/v2/user/testUser/oncall/schedule');
      expect(options).to.have.property('method', 'GET');
      expect(options).to.have.property('params');
      expect(options.params).to.be.an('object');
      expect(options.params).to.eql(query);
      expect(options.data).to.be.undefined;
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
      expect(options).to.have.property('url', '/api-public/v1/user');
      expect(options).to.have.property('method', 'POST');
      expect(options).to.have.property('data');
      expect(options.data).to.be.an('object');
      expect(options.data).to.eql(body);
      expect(options.params).to.be.undefined;
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

    const fullResponse = {
      statusCode: 200,
      statusMessage: 'OK',
      headers: { 'content-type': 'application/json' },
      data: response,
    };

    it('should return a VictorOps API response', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user')
        .reply(200, response);

      // Get the options.
      const options = client._getRequestOptions('GET', '/api-public/v1/user');

      // Perform the request.
      const users = await client._performRequest(options);

      expect(users).to.be.an('object');
      expect(users).to.eql(response);

      nock.cleanAll();
    });

    it('should return a full VictorOps API response', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user')
        .reply(200, response);

      // Set the full response option.
      client.fullResponse = true;

      // Get the options.
      const options = client._getRequestOptions('GET', '/api-public/v1/user');

      // Perform the request.
      const resp = await client._performRequest(options);

      expect(resp).to.be.an('object');
      expect(resp).to.have.property('statusCode');
      expect(resp).to.have.property('statusMessage');
      expect(resp).to.have.property('headers');
      expect(resp).to.have.property('data');
      expect(resp).to.eql(fullResponse);

      nock.cleanAll();
    });

    it('should throw an error when missing the request options', async () => {
      await expect(client._performRequest()).to.be.rejectedWith(Error);
      await expect(client._performRequest('something')).to.be.rejectedWith(Error);
      await expect(client._performRequest([])).to.be.rejectedWith(Error);
      await expect(client._performRequest({})).to.be.rejectedWith(Error);
    });
  });

  context('#_handleError()', () => {
    it(`should return a 'StatusCodeError' error`, () => {
      const statusCode = 403;
      const statusText = 'Authentication failed or rate-limit reached';

      const err = new Error(`Request failed with status code ${statusCode}`);

      // Mock Axios response object.
      err.response = {
        status: statusCode,
        statusText,
        headers: {},
        data: 'Bad stuff',
      };

      // Add the typical Axios error values.
      err.code = null;
      err.config = {};
      err.request = {};
      err.isAxiosError = true;
      err.toJSON = () => {};

      // Create the error.
      const handledErr = client._handleError(err);

      expect(handledErr).to.be.an.instanceof(Error);
      expect(handledErr.name).to.eql('StatusCodeError');
      expect(handledErr.message).to.eql(String(err));
      expect(handledErr.statusCode).to.eql(statusCode);
      expect(handledErr.statusMessage).to.eql(statusText);
      expect(handledErr.headers).to.eql({});
      expect(handledErr.body).to.eql('Bad stuff');
      expect(handledErr).to.have.property('cause');
      expect(handledErr.cause).to.be.an.instanceof(Error);
      expect(handledErr.cause.message).to.eql(err.message);
    });

    it(`should return a 'RequestError' error`, () => {
      const err = new Error('Oops, something happened');
      err.config = {};
      err.response = undefined;

      // Create the error.
      const handledErr = client._handleError(err);

      expect(handledErr).to.be.an.instanceof(Error);
      expect(handledErr.name).to.eql('RequestError');
      expect(handledErr.message).to.eql(String(err));
      expect(handledErr).to.have.property('cause');
      expect(handledErr.cause).to.be.an.instanceof(Error);
      expect(handledErr.cause.message).to.eql(err.message);
    });

    it(`should return an unmodified error`, () => {
      const err = new Error('Oops, something happened');
  
      // Create the error.
      const handledErr = client._handleError(err);
  
      expect(handledErr).to.be.an.instanceof(Error);
      expect(handledErr).to.eql(err);
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