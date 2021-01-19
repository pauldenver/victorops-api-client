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

describe('Scheduled Overrides Endpoint Tests', () => {
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

  context('#getOverrides()', () => {
    const response = {
      overrides: [
        {
          publicId: 'ovrprd-9t6Jt1reAObTMrLM',
          user: {
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe'
          },
          timezone: 'America/New_York',
          start: '2020-04-12T04:00:00Z',
          end: '2020-04-18T04:00:00Z',
          assignments: [
            {
              _selfUrl: '/api-public/v1/overrides/ovrprd-9t6Jt1reAObTMrLM/' +
                'assignments/team-42VkR4WsQvZ2h9V8',
              team: 'team-42VkR4WsQvZ2h9V8',
              policy: 'team-42VkR4WsQvZ2h9V8',
              assigned: false
            }
          ]
        }
      ],
      _selfUrl: '/api-public/v1/overrides'
    };

    it(`should return a list of scheduled overrides`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/overrides')
        .reply(200, response);

      const overrides = await client.scheduledOverrides.getOverrides();

      expect(client.scheduledOverrides.getOverrides).to.be.a('function');
      expect(overrides).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the scheduled overrides`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/overrides')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.getOverrides()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createOverride()', () => {
    const response = {
      schedule: {
        publicId: 'ovrprd-ht7Jt1reA82KBrOP',
        user: {
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe'
        },
        timezone: 'America/New_York',
        start: '2020-04-08T10:00:00Z',
        end: '2020-05-08T12:00:00Z',
        assignments: [
          {
            _selfUrl: '/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP/' +
              'assignments/team-42VkR4WsQvZ2h9V8',
            team: 'team-42VkR4WsQvZ2h9V8',
            policy: 'team-42VkR4WsQvZ2h9V8',
            assigned: false
          }
        ]
      },
      _selfUrl: '/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP'
    };

    it(`should create a scheduled override`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/overrides')
        .reply(200, response);

      const resp = await client.scheduledOverrides.createOverride({
        username: 'johndoe',
        timezone: 'America/New_York',
        start: '2020-04-08T10:00:00Z',
        end: '2020-05-08T12:00:00Z'
      });

      expect(client.scheduledOverrides.createOverride).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating a scheduled override`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/overrides')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.createOverride()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deleteOverride()', () => {
    const response = {
      override: {
        publicId: 'ovrprd-ht7Jt1reA82KBrOP',
        user: {
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe'
        },
        timezone: 'America/New_York',
        start: '2020-04-08T10:00:00Z',
        end: '2020-05-08T12:00:00Z',
        assignments: [
          {
            _selfUrl: '/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP/' +
              'assignments/team-42VkR4WsQvZ2h9V8',
            team: 'team-42VkR4WsQvZ2h9V8',
            policy: 'team-42VkR4WsQvZ2h9V8',
            assigned: false
          }
        ]
      },
      _selfUrl: '/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP'
    };

    it(`should delete a scheduled override`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete('/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP')
        .reply(200, response);

      const resp = await client.scheduledOverrides.deleteOverride(
        'ovrprd-ht7Jt1reA82KBrOP');

      expect(client.scheduledOverrides.deleteOverride).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting a scheduled override`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete('/api-public/v1/overrides/another-override')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.deleteOverride('another-override')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getOverride()', () => {
    const response = {
      override: {
        publicId: 'ovrprd-ht7Jt1reA82KBrOP',
        user: {
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe'
        },
        timezone: 'America/New_York',
        start: '2020-04-08T10:00:00Z',
        end: '2020-05-08T12:00:00Z',
        assignments: [
          {
            _selfUrl: '/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP/' +
              'assignments/team-42VkR4WsQvZ2h9V8',
            team: 'team-42VkR4WsQvZ2h9V8',
            policy: 'team-42VkR4WsQvZ2h9V8',
            assigned: false
          }
        ]
      },
      _selfUrl: '/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP'
    };

    it(`should return a scheduled override`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP')
        .reply(200, response);

      const override = await client.scheduledOverrides.getOverride(
        'ovrprd-ht7Jt1reA82KBrOP');

      expect(client.scheduledOverrides.getOverride).to.be.a('function');
      expect(override).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a scheduled override`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/overrides/another-override')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.getOverride('another-override')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getAssignments()', () => {
    const overrideId = 'ovrprd-ht7Jt1reA82KBrOP';

    const response = [
      {
        _selfUrl: `/api-public/v1/overrides/${overrideId}/` +
          'assignments/team-42VkR4WsQvZ2h9V8',
        team: 'team-42VkR4WsQvZ2h9V8',
        policy: 'team-42VkR4WsQvZ2h9V8',
        assigned: false,
        user: 'johndoe'
      }
    ];

    it(`should return a list of scheduled override assignments`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/overrides/ovrprd-ht7Jt1reA82KBrOP/assignments')
        .reply(200, response);

      const assignments = await client.scheduledOverrides.getAssignments(
        overrideId);

      expect(client.scheduledOverrides.getAssignments).to.be.a('function');
      expect(assignments).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting scheduled override assignments`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/overrides/another-override/assignments')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.getAssignments('another-override')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deleteAssignment()', () => {
    const overrideId = 'ovrprd-ht7Jt1reA82KBrOP';
    const policySlug = 'team-42VkR4WsQvZ2h9V8';

    const response = {
      _selfUrl: `/api-public/v1/overrides/${overrideId}/assignments/${policySlug}`,
      team: policySlug,
      policy: policySlug,
      assigned: false
    };

    it(`should delete a scheduled override assignment`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete(`/api-public/v1/overrides/${overrideId}/assignments/${policySlug}`)
        .reply(200, response);

      const resp = await client.scheduledOverrides.deleteAssignment(
        overrideId, policySlug);

      expect(client.scheduledOverrides.deleteAssignment).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting a scheduled override assignment`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete('/api-public/v1/overrides/another-override/assignments/another-policy')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.deleteAssignment('another-override',
          'another-policy')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getAssignment()', () => {
    const overrideId = 'ovrprd-ht7Jt1reA82KBrOP';
    const policySlug = 'team-42VkR4WsQvZ2h9V8';

    const response = {
      _selfUrl: `/api-public/v1/overrides/${overrideId}/assignments/${policySlug}`,
      team: policySlug,
      policy: policySlug,
      assigned: false
    };

    it(`should return a scheduled override assignment`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get(`/api-public/v1/overrides/${overrideId}/assignments/${policySlug}`)
        .reply(200, response);

      const assignment = await client.scheduledOverrides.getAssignment(
        overrideId, policySlug);

      expect(client.scheduledOverrides.getAssignment).to.be.a('function');
      expect(assignment).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a scheduled override assignment`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/overrides/another-override/assignments/another-policy')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.getAssignment('another-override',
          'another-policy')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#updateAssignment()', () => {
    const overrideId = 'ovrprd-ht7Jt1reA82KBrOP';
    const policySlug = 'team-42VkR4WsQvZ2h9V8';

    const response = {
      _selfUrl: `/api-public/v1/overrides/${overrideId}/assignments/${policySlug}`,
      team: policySlug,
      policy: policySlug,
      assigned: false,
      user: 'johnsmith'
    };

    it(`should update a scheduled override assignment`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put(`/api-public/v1/overrides/${overrideId}/assignments/${policySlug}`)
        .reply(200, response);

      const resp = await client.scheduledOverrides.updateAssignment(
        overrideId, policySlug, {
          policy: policySlug,
          username: 'johnsmith'
        });

      expect(client.scheduledOverrides.updateAssignment).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when updating a scheduled override assignment`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put('/api-public/v1/overrides/another-override/assignments/another-policy')
        .replyWithError('Something bad happened!');

      await expect(
        client.scheduledOverrides.updateAssignment('another-override',
          'another-policy')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});