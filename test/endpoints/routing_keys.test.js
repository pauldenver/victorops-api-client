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

describe('Routing Keys Endpoint Tests', () => {
  let client;
  let reqHeaders;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);

    // Get the headers from the instance.
    reqHeaders = { reqheaders: client._headers };
  });

  context('#getRoutingKeys()', () => {
    const response = {
      routingKeys: [
        {
          routingKey: '.+',
          targets: [
            {
              policyName: 'My Policy',
              policySlug: 'team-00VkR4NvJvM5h9Ae',
              _teamUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae'
            }
          ],
          isDefault: true
        }
      ],
      _selfUrl: '/api-public/v1/org/routing-keys'
    };

    it(`should return a list of routing keys`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/org/routing-keys')
        .reply(200, response);

      const routingKeys = await client.routingKeys.getRoutingKeys();

      expect(client.routingKeys.getRoutingKeys).to.be.a('function');
      expect(routingKeys).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the routing keys`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/org/routing-keys')
        .replyWithError('Something bad happened!');

      await expect(client.routingKeys.getRoutingKeys()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createRoutingKey()', () => {
    const response = {
      routingKey: 'Some_Routing_Key',
      targets: [
        'team-42VkR4WsQvZ2h9V8'
      ]
    };

    it(`should create a routing key`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/org/routing-keys')
        .reply(200, response);

      const resp = await client.routingKeys.createRoutingKey({
        routingKey: 'Some_Routing_Key',
        targets: [
          'team-42VkR4WsQvZ2h9V8'
        ]
      });

      expect(client.routingKeys.createRoutingKey).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating a routing key`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/org/routing-keys')
        .replyWithError('Something bad happened!');

      await expect(client.routingKeys.createRoutingKey()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});