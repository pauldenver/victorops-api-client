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

describe('Reporting Endpoint Tests', () => {
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

  context('#getShiftChanges()', () => {
    const response = {
      teamSlug: 'team-pnkMTEwU23LulqHQ',
      start: '2020-04-01T00:00:00.000Z',
      end: '2020-04-01T16:44:01.632Z',
      results: 0,
      userLogs: []
    };

    it(`should return a list of shift changes for a team`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get(`/api-reporting/v1/team/${response.teamSlug}/oncall/log`)
        .reply(200, response);

      const changes = await client.reporting.getShiftChanges(
        response.teamSlug);

      expect(client.reporting.getShiftChanges).to.be.a('function');
      expect(changes).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the shift changes`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-reporting/v1/team/some-other-team/oncall/log')
        .replyWithError('Something bad happened!');

      await expect(
        client.reporting.getShiftChanges('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getIncidentHistory()', () => {
    const response = {
      offset: 0,
      limit: 20,
      total: 1,
      incidents: [
        {
          alertCount: 1,
          currentPhase: 'triggered',
          entityDisplayName: 'Oops. this must be fixed.',
          entityId: '9b7a2cad-4ea0-4dbb-b45a-4ec0cc55fc15',
          entityState: 'critical',
          entityType: 'service',
          incidentNumber: '2',
          lastAlertId: '44ff6e12-6033-4c68-bbab-0bdef92c5bcc',
          lastAlertTime: '2020-03-28T18:41:22Z',
          routingKey: 'default',
          service: 'Oops. this must be fixed.',
          startTime: '2020-03-28T18:41:22Z',
          pagedTeams: [
            'team-00VkR4NvJvM5h9Ae'
          ],
          pagedUsers: [],
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
          transitions: [
            {
              name: 'triggered',
              at: '2020-03-28T18:41:22Z',
              alertId: '44ff6e12-6033-4c68-bbab-0bdef92c5bcc',
              alertUrl: 'https://api.victorops.com/api-public/v1/alerts/' +
                '44ff6e12-6033-4c68-bbab-0bdef92c5bcc'
            }
          ]
        }
      ]
    };

    it(`should return the incident history information`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-reporting/v2/incidents')
        .query({ currentPhase: 'triggered' })
        .reply(200, response);

      const history = await client.reporting.getIncidentHistory(
        { currentPhase: 'triggered' });

      expect(client.reporting.getIncidentHistory).to.be.a('function');
      expect(history).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the incident history`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-reporting/v2/incidents')
        .replyWithError('Something bad happened!');

      await expect(client.reporting.getIncidentHistory()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});