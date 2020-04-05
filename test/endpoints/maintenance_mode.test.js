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

describe('Maintenance Mode Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getModeState()', () => {
    const response = {
      companyId: 'awesome-company',
      activeInstances: [
        {
          instanceId: 'mm-Ld8nqpsu63DWvrXyJRWxKpGWWG8PshlS',
          startedBy: 'johndoe',
          startedAt: 1586017071464,
          purpose: 'Maintenance Mode',
          targets: [
            {
              type: 'RoutingKeys',
              names: []
            }
          ],
          isGlobal: true
        }
      ]
    };

    it(`should return the maintenance mode state`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/maintenancemode')
        .reply(200, response);

      const state = await client.maintenanceMode.getModeState();

      expect(client.maintenanceMode.getModeState).to.be.a('function');
      expect(state).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the maintenance mode state`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/maintenancemode')
        .replyWithError('Something bad happened!');

      await expect(client.maintenanceMode.getModeState()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#startMode()', () => {
    const response = {
      companyId: 'awesome-company',
      activeInstances: [
        {
          instanceId: 'mm-Ld8nqpsu63DWvrXyJRWxKpGWWG8PshlS',
          startedBy: 'johndoe',
          startedAt: 1586017071464,
          purpose: 'Maintenance Mode',
          targets: [
            {
              type: 'RoutingKeys',
              names: [
                'My_Routing_Key'
              ]
            }
          ],
          isGlobal: true
        }
      ]
    };

    it(`should start the maintenance mode`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/maintenancemode/start')
        .reply(200, response);

      const resp = await client.maintenanceMode.startMode({
        type: 'RoutingKeys',
        names: [
          'My_Routing_Key'
        ],
        purpose: 'Maintenance Mode'
      });

      expect(client.maintenanceMode.startMode).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when starting the maintenance mode`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/maintenancemode/start')
        .replyWithError('Something bad happened!');

      await expect(client.maintenanceMode.startMode()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#endMode()', () => {
    const modeId = 'mm-Ld8nqpsu63DWvrXyJRWxKpGWWG8PshlS';

    const response = {
      companyId: 'awesome-company',
      activeInstances: []
    };

    it(`should end the maintenance mode`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .put(`/api-public/v1/maintenancemode/${modeId}/end`)
        .reply(200, response);

      const resp = await client.maintenanceMode.endMode(modeId);

      expect(client.maintenanceMode.endMode).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when ending the maintenance mode`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .put('/api-public/v1/maintenancemode/other-mode-id/end')
        .replyWithError('Something bad happened!');

      await expect(
        client.maintenanceMode.endMode('other-mode-id')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});