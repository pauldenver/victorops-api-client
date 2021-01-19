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

describe('On-Call Endpoint Tests', () => {
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

  context('#getUserSchedule()', () => {
    const response = {
      teamSchedules: [
        {
          team: {
            name: 'My Team',
            slug: 'team-00VkR4NvJvM5h9Ae'
          },
          schedules: [
            {
              policy: {
                name: 'My Policy',
                slug: 'team-00VkR4NvJvM5h9Ae'
              },
              schedule: [
                {
                  onCallUser: {
                    username: 'johndoe'
                  },
                  onCallType: 'user',
                  rolls: []
                }
              ],
              overrides: []
            }
          ]
        }
      ]
    };

    it(`should return the user's on-call schedule`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v2/user/johndoe/oncall/schedule')
        .reply(200, response);

      const schedule = await client.oncall.getUserSchedule('johndoe');

      expect(client.oncall.getUserSchedule).to.be.a('function');
      expect(schedule).to.be.an('object');
      expect(schedule).to.have.property('teamSchedules');
      expect(schedule.teamSchedules).to.be.an('array');
      expect(schedule.teamSchedules).to.eql(response.teamSchedules);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a user's on-call schedule`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v2/user/notjohndoe/oncall/schedule')
        .replyWithError('Something bad happened!');

      await expect(
        client.oncall.getUserSchedule('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getTeamSchedule()', () => {
    const response = {
      team: {
        name: 'My Team',
        slug: 'team-00VkR4NvJvM5h9Ae'
      },
      schedules: [
        {
          policy: {
            name: 'My Policy',
            slug: 'team-00VkR4NvJvM5h9Ae'
          },
          schedule: [
            {
              onCallUser: {
                username: 'johndoe'
              },
              onCallType: 'user',
              rolls: []
            }
          ],
          overrides: []
        }
      ]
    };

    it(`should return the team's on-call schedule`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v2/team/team-00VkR4NvJvM5h9Ae/oncall/schedule')
        .reply(200, response);

      const schedule = await client.oncall.getTeamSchedule(
        'team-00VkR4NvJvM5h9Ae');

      expect(client.oncall.getTeamSchedule).to.be.a('function');
      expect(schedule).to.be.an('object');
      expect(schedule).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a team's on-call schedule`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v2/team/team-whatever/oncall/schedule')
        .replyWithError('Something bad happened!');

      await expect(
        client.oncall.getTeamSchedule('team-whatever')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getOncallUsers()', () => {
    const response = {
      teamsOnCall: [
        {
          team: {
            name: 'My Team',
            slug: 'team-00VkR4NvJvM5h9Ae'
          },
          oncallNow: [
            {
              escalationPolicy: {
                name: 'My Policy',
                slug: 'team-00VkR4NvJvM5h9Ae'
              },
              users: [
                {
                  onCalluser: {
                    username: 'johndoe'
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    it(`should return the current on-call users/teams schedule`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/oncall/current')
        .reply(200, response);

      const schedule = await client.oncall.getOncallUsers();

      expect(client.oncall.getOncallUsers).to.be.a('function');
      expect(schedule).to.be.an('object');
      expect(schedule).to.have.property('teamsOnCall');
      expect(schedule.teamsOnCall).to.be.an('array');
      expect(schedule.teamsOnCall).to.eql(response.teamsOnCall);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the current on-call users/teams schedule`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/oncall/current')
        .replyWithError('Something bad happened!');

      await expect(client.oncall.getOncallUsers()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createOncallOverride()', () => {
    const response = {
      result: 'ok'
    };

    it(`should replace the current on-call user`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .patch('/api-public/v1/policies/team-00VkR4NvJvM5h9Ae/oncall/user')
        .reply(200, response);

      const resp = await client.oncall.createOncallOverride(
        'team-00VkR4NvJvM5h9Ae', {
          fromUser: 'johndoe',
          toUser: 'johnsmith'
        });

      expect(client.oncall.createOncallOverride).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when replacing the current on-call user`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .patch('/api-public/v1/policies/team-whatever/oncall/user')
        .replyWithError('Something bad happened!');

      await expect(
        client.oncall.createOncallOverride('team-whatever')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});
