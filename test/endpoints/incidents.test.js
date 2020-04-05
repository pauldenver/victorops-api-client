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

describe('Incidents Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getIncidents()', () => {
    const response = {
      incidents: [
        {
          alertCount: 1,
          currentPhase: 'UNACKED',
          entityDisplayName: 'Oops. this must be fixed.',
          entityId: '9b7a2cad-4ea0-4dbb-b45a-4ec0cc55fc15',
          entityState: 'CRITICAL',
          entityType: 'SERVICE',
          incidentNumber: '1',
          lastAlertId: '44ff6e12-6033-4c68-bbab-0bdef92c5bcc',
          lastAlertTime: '2020-03-28T18:41:22Z',
          routingKey: 'routingdefault',
          service: 'Oops. this must be fixed.',
          startTime: '2020-03-28T18:41:22Z',
          pagedTeams: [
            'team-00VkR4NvJvM5h9Ae'
          ],
          pagedUsers: [
            'johndoe'
          ],
          pagedPolicies: [
            {
              policy: {
                name: 'My Policy',
                slug: 'team-00VkR4NvJvM5h9Ae'
              },
              team: {
                name: 'My Team',
                slug: 'team-00VkR4NvJvM5h9Ae'
              }
            }
          ],
          transitions: []
        }
      ]
    };

    it(`should return the current incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/incidents')
        .reply(200, response);

      const incidents = await client.incidents.getIncidents();

      expect(client.incidents.getIncidents).to.be.a('function');
      expect(incidents).to.be.an('object');
      expect(incidents).to.have.property('incidents');
      expect(incidents.incidents).to.be.an('array');
      expect(incidents.incidents).to.eql(response.incidents);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the current incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/incidents')
        .replyWithError('Something bad happened!');

      await expect(client.incidents.getIncidents()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createIncident()', () => {
    const response = {
      incidentNumber: '2',
      entityId: '947ee12e-35a6-4512-bc5b-65c4011825bd',
      conferenceBridge: {
        errorMsg: 'Failed adding conference bridge for incident'
      }
    };

    it(`should create a new incident`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/incidents')
        .reply(200, response);

      const resp = await client.incidents.createIncident({
        summary: 'Test incident',
        details: 'Something bad happened!!!',
        userName: 'johndoe',
        targets: [
          {
            type: 'User',
            slug: 'johndoe'
          }
        ],
        isMultiResponder: true
      });

      expect(client.incidents.createIncident).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating a new incident`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/incidents')
        .replyWithError('Something bad happened!');

      await expect(client.incidents.createIncident()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#ackIncidents()', () => {
    const response = {
      results: [
        {
          incidentNumber: '2',
          entityId: '837er12e-07a6-4512-bc5b-12c7811825bd',
          cmdAccepted: true,
          message: ''
        }
      ]
    };

    it(`should acknowledge a list of incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/ack')
        .reply(200, response);

      const resp = await client.incidents.ackIncidents({
        userName: 'johndoe',
        incidentNames: [
          '2'
        ],
      });

      expect(client.incidents.ackIncidents).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when acknowledging incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/ack')
        .replyWithError('Something bad happened!');

      await expect(client.incidents.ackIncidents()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#rerouteIncidents()', () => {
    const response = {
      statuses: [
        {
          incidentNumber: '2',
          success: true,
          targetStatus: [
            {
              slug: 'johnsmith',
              success: true
            }
          ]
        }
      ]
    };

    it(`should reroute a list of incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/incidents/reroute')
        .reply(200, response);

      const resp = await client.incidents.rerouteIncidents({
        userName: 'johndoe',
        reroutes: [
          {
            incidentNumber: '2',
            targets: [
              {
                type: 'User',
                slug: 'johnsmith'
              }
            ],
            addTargets: true
          }
        ]
      });

      expect(client.incidents.rerouteIncidents).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when rerouting incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/incidents/reroute')
        .replyWithError('Something bad happened!');

      await expect(client.incidents.rerouteIncidents()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#resolveIncidents()', () => {
    const response = {
      results: [
        {
          incidentNumber: '2',
          entityId: '837er12e-07a6-4512-bc5b-12c7811825bd',
          cmdAccepted: true,
          message: ''
        }
      ]
    };

    it(`should resolve a list of incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/resolve')
        .reply(200, response);

      const resp = await client.incidents.resolveIncidents({
        userName: 'johndoe',
        incidentNames: [
          '2'
        ],
      });

      expect(client.incidents.resolveIncidents).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when resolving incidents`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/resolve')
        .replyWithError('Something bad happened!');

      await expect(
        client.incidents.resolveIncidents()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#ackUserIncidents()', () => {
    const response = {
      results: [
        {
          incidentNumber: '2',
          entityId: '837er12e-07a6-4512-bc5b-12c7811825bd',
          cmdAccepted: true,
          message: ''
        }
      ]
    };

    it(`should acknowledge a list of incidents for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/byUser/ack')
        .reply(200, response);

      const resp = await client.incidents.ackUserIncidents({
        userName: 'johndoe',
      });

      expect(client.incidents.ackUserIncidents).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when acknowledging incidents for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/byUser/ack')
        .replyWithError('Something bad happened!');

      await expect(
        client.incidents.ackUserIncidents()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#resolveUserIncidents()', () => {
    const response = {
      results: [
        {
          incidentNumber: '2',
          entityId: '837er12e-07a6-4512-bc5b-12c7811825bd',
          cmdAccepted: true,
          message: ''
        }
      ]
    };

    it(`should resolve a list of incidents for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/byUser/resolve')
        .reply(200, response);

      const resp = await client.incidents.resolveUserIncidents({
        userName: 'johndoe',
      });

      expect(client.incidents.resolveUserIncidents).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when resolving incidents for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .patch('/api-public/v1/incidents/byUser/resolve')
        .replyWithError('Something bad happened!');

      await expect(
        client.incidents.resolveUserIncidents()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});
