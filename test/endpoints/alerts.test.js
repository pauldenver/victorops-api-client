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

describe('Alerts Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getAlert()', () => {
    const response = {
      monitoringTool: 'manual',
      entityDisplayName: 'Test incident',
      messageType: 'CRITICAL',
      entityId: '9b7a2cad-4ea0-4dbb-b45a-4ec0cc55fc15',
      stateMessage: 'Something bad happened!!!',
      raw: '{"created_by":"johndoe","monitoring_tool":"manual",' +
        '"entity_display_name":"Test incident","message_type":"CRITICAL",' +
        '"alert_type":"CRITICAL","entity_state":"CRITICAL",' +
        '"entity_id":"9b7a2cad-4ea0-4dbb-b45a-4ec0cc55fc15",' +
        '"state_message":"Something bad happened!!!",' +
        '"monitor_name":"vouser-johndoe"}'
    };

    it(`should return the alert details`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/alerts/f9921e5a-3cb6-4276-996a-bca58f6b169c')
        .reply(200, response);

      const alert = await client.alerts.getAlert(
        'f9921e5a-3cb6-4276-996a-bca58f6b169c');

      expect(client.alerts.getAlert).to.be.a('function');
      expect(alert).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the alert details`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/alerts/some-alert-uuid')
        .replyWithError('Something bad happened!');

      await expect(
        client.alerts.getAlert('some-alert-uuid')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});