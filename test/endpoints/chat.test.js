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

describe('Chat Endpoint Tests', () => {
  let client;
  let reqHeaders;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539',
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);

    // Get the headers from the instance.
    reqHeaders = { reqheaders: client._headers };
  });

  context('#sendChat()', () => {
    it(`should send a chat message`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/chat')
        .twice()
        .reply(200, {});

      let resp = await client.chat.sendChat({
        username: 'johndoe',
        externalUsername: 'johndoe',
        text: 'Hi, John!',
        monitoringTool: 'email',
      });

      expect(client.chat.sendChat).to.be.a('function');
      expect(resp).to.eql({});

      resp = await client.chat.sendChat();

      expect(resp).to.eql({});

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when sending a chat message`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/chat')
        .replyWithError('Something bad happened!');

      await expect(client.chat.sendChat({})).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});
