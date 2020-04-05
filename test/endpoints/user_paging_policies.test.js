const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const rewire = require('rewire');
const nock = require('nock');
const VictorOpsApiClient = require('../../lib');

// Use 'chai-as-promised'.
chai.use(chaiAsPromised);
// Get 'expect'.
const expect = chai.expect;

// Get the base URL from the client using 'rewire'.
const clientRewire = rewire('../../lib/victorops_api_client');
const baseUrl = clientRewire.__get__('BASE_URL');

describe('User Paging Policies Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getPagingPolicies()', () => {
    const response = {
      username: 'johndoe',
      userId: 452233,
      policies: [
        {
          order: 1,
          timeout: 5,
          contactType: 'email',
          extId: '0e318016-75c8-11ea-b690-3c970e75c219'
        }
      ]
    };

    it(`should return a list of paging policies for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get(`/api-public/v1/user/${response.username}/policies`)
        .reply(200, response);

      const methods = await client.userPagingPolicies.getPagingPolicies(
        response.username);

      expect(client.userPagingPolicies.getPagingPolicies).to.be.a('function');
      expect(methods).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a list of paging policies`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/policies')
        .replyWithError('Something bad happened!');

      await expect(
        client.userPagingPolicies.getPagingPolicies('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});