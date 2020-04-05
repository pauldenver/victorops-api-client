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

describe('Teams Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getTeams()', () => {
    const response = [
      {
        _selfUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae',
        _membersUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae/members',
        _policiesUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae/policies',
        _adminsUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae/admins',
        name: 'My Team',
        slug: 'team-00VkR4NvJvM5h9Ae',
        memberCount: 20,
        version: 1,
        isDefaultTeam: false
      }
    ];

    it('should return a list of teams', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/team')
        .reply(200, response);

      const teams = await client.teams.getTeams();

      expect(client.teams.getTeams).to.be.a('function');
      expect(teams).to.be.an('array');
      expect(teams).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when getting a list of teams', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/team')
        .replyWithError('Something bad happened!');

      await expect(client.teams.getTeams()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#addTeam()', () => {
    const response = {
      _selfUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv',
      _membersUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/members',
      _policiesUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/policies',
      _adminsUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/admins',
      name: 'Team Awesome',
      slug: 'team-btVkW4cvMvM5h5yv',
      memberCount: 0,
      version: 0,
      isDefaultTeam: false
    };

    it('should create a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/team')
        .reply(200, response);

      const resp = await client.teams.addTeam({ name: 'Team Awesome' });

      expect(client.teams.addTeam).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when creating a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/team')
        .replyWithError('Something bad happened!');

      await expect(client.teams.addTeam()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#removeTeam()', () => {
    const response = {
      _selfUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv',
      _membersUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/members',
      _policiesUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/policies',
      _adminsUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/admins',
      name: 'Team Awesome',
      slug: 'team-btVkW4cvMvM5h5yv',
      memberCount: 0,
      version: 0,
      isDefaultTeam: false
    };

    it('should remove a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete(`/api-public/v1/team/${response.slug}`)
        .reply(200, response);

      const resp = await client.teams.removeTeam(response.slug);

      expect(client.teams.removeTeam).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when removing a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/team/some-other-team')
        .replyWithError('Something bad happened!');

      await expect(
        client.teams.removeTeam('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getTeam()', () => {
    const response = {
      _selfUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv',
      _membersUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/members',
      _policiesUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/policies',
      _adminsUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/admins',
      name: 'Team Awesome',
      slug: 'team-btVkW4cvMvM5h5yv',
      memberCount: 0,
      version: 0,
      isDefaultTeam: false
    };

    it('should return information for a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get(`/api-public/v1/team/${response.slug}`)
        .reply(200, response);

      const team = await client.teams.getTeam(response.slug);

      expect(client.teams.getTeam).to.be.a('function');
      expect(team).to.be.an('object');
      expect(team).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when getting team information', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/team/some-other-team')
        .replyWithError('Something bad happened!');

      await expect(
        client.teams.getTeam('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#updateTeam()', () => {
    const response = {
      _selfUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv',
      _membersUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/members',
      _policiesUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/policies',
      _adminsUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/admins',
      name: 'Team Fantastic',
      slug: 'team-btVkW4cvMvM5h5yv',
      memberCount: 0,
      version: 1,
      isDefaultTeam: false
    };

    it('should update a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .put(`/api-public/v1/team/${response.slug}`)
        .reply(200, response);

      const resp = await client.teams.updateTeam(response.slug,
        { name: 'Team Fantastic' });

      expect(client.teams.updateTeam).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when updating a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .put('/api-public/v1/team/some-other-team')
        .replyWithError('Something bad happened!');

      await expect(
        client.teams.updateTeam('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getAdmins()', () => {
    const response = {
      teamAdmins: [
        {
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          createdAt: '2020-03-28T17:23:32Z',
          passwordLastUpdated: '2020-03-28T17:23:32Z',
          verified: true,
          _selfUrl: '/api-public/v1/user/johndoe'
        }
      ]
    };

    it('should return a list of team admins', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/team/team-btVkW4cvMvM5h5yv/admins')
        .reply(200, response);

      const admins = await client.teams.getAdmins('team-btVkW4cvMvM5h5yv');

      expect(client.teams.getAdmins).to.be.a('function');
      expect(admins).to.be.an('object');
      expect(admins).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when getting team admins', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/team/some-other-team/admins')
        .replyWithError('Something bad happened!');

      await expect(
        client.teams.getAdmins('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getMembers()', () => {
    const response = {
      _selfUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/members',
      _teamUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv',
      members: [
        {
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          version: 3,
          verified: true
        }
      ]
    };

    it('should return a list of team members', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/team/team-btVkW4cvMvM5h5yv/members')
        .reply(200, response);

      const members = await client.teams.getMembers('team-btVkW4cvMvM5h5yv');

      expect(client.teams.getMembers).to.be.a('function');
      expect(members).to.be.an('object');
      expect(members).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when getting team members', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/team/some-other-team/members')
        .replyWithError('Something bad happened!');

      await expect(
        client.teams.getMembers('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#addMember()', () => {
    const response = {
      _selfUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/members',
      _teamUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv',
      members: [
        {
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          version: 3,
          verified: true
        },
        {
          username: 'johnsmith',
          firstName: 'John',
          lastName: 'Smith',
          version: 0,
          verified: true
        }
      ]
    };

    it('should add a member to a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/team/team-btVkW4cvMvM5h5yv/members')
        .reply(200, response);

      const resp = await client.teams.addMember('team-btVkW4cvMvM5h5yv',
        { username: 'johnsmith' });

      expect(client.teams.addMember).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when adding a team member', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/team/some-other-team/members')
        .replyWithError('Something bad happened!');

      await expect(
        client.teams.addMember('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#removeMember()', () => {
    const response = {
      _selfUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv/members',
      _teamUrl: '/api-public/v1/team/team-btVkW4cvMvM5h5yv',
      members: [
        {
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          version: 3,
          verified: true
        }
      ]
    };

    it('should remove a member from a team', async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/team/team-btVkW4cvMvM5h5yv/members/johnsmith')
        .reply(200, response);

      const resp = await client.teams.removeMember('team-btVkW4cvMvM5h5yv',
        'johnsmith');

      expect(client.teams.removeMember).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when removing a team member', async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/team/some-other-team/members/notjohnsmith')
        .replyWithError('Something bad happened!');

      await expect(
        client.teams.removeMember('some-other-team', 'notjohnsmith')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});