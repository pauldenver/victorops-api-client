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

describe('Webhooks Endpoint Tests', () => {
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

  context('#getWebhooks()', () => {
    const response = {
      webHooks: [
        {
          label: 'My Webhook',
          url: 'https://webhook.site/61f45ccc-7d61-4067-92c6-84e9e62bb083',
          slug: 'wh-kmTcvqJ6ebIHdnubS'
        }
      ]
    };

    it(`should return a list of webhooks`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/webhooks')
        .reply(200, response);

      const webhooks = await client.webhooks.getWebhooks();

      expect(client.webhooks.getWebhooks).to.be.a('function');
      expect(webhooks).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the webhooks`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/webhooks')
        .replyWithError('Something bad happened!');

      await expect(
        client.webhooks.getWebhooks()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});