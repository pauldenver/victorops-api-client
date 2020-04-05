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

describe('Users Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getUsers()', () => {
    const response = {
      users: [
        [
          {
            firstName: 'Boba',
            lastName: 'Fett',
            username: 'bobafett',
            email: 'bobafett@starwars.com',
            createdAt: '2020-01-31T14:19:33Z',
            passwordLastUpdated: '2020-01-31T14:19:33Z',
            verified: true,
            _selfUrl: '/api-public/v1/user/bobafett'
          }
        ]
      ]
    };

    it('should return a list of users', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user')
        .reply(200, response);

      const userList = await client.users.getUsers();

      expect(client.users.getUsers).to.be.a('function');
      expect(userList).to.be.an('object');
      expect(userList).to.have.property('users');
      expect(userList.users).to.be.an('array');
      expect(userList.users).to.eql(response.users);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when getting a list of users', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user')
        .replyWithError('Something bad happened!');

      await expect(client.users.getUsers()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#addUser()', () => {
    const response = {
      firstName: 'John',
      lastName: 'Smith',
      username: 'johnsmith15',
      email: 'john.smith@myfakeemail.com',
      createdAt: '2020-03-15T16:13:14Z',
      passwordLastUpdated: '2020-03-15T16:13:14Z',
      verified: false,
      _selfUrl: '/api-public/v1/user/johnsmith15'
    };

    it('should return the details of the added user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user')
        .reply(200, response);

      const addedUser = await client.users.addUser({
        firstName: 'John',
        lastName: 'Smith',
        username: 'johnsmith15',
        email: 'john.smith@myfakeemail.com',
        admin: true,
      });

      expect(client.users.addUser).to.be.a('function');
      expect(addedUser).to.be.an('object');
      expect(addedUser).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when adding a user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user')
        .replyWithError('Something bad happened!');

      await expect(client.users.addUser()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#addUsers()', () => {
    const response = {
      users: [
        {
          username: 'johndoe',
          _selfUrl: '/api-public/v1/user/johndoe',
          errors: []
        }
      ]
    };

    it('should return the details of the added users', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user/batch')
        .reply(200, response);

      const addedUsers = await client.users.addUsers({
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@myfakeemail.com',
        admin: true,
      });

      expect(client.users.addUsers).to.be.a('function');
      expect(addedUsers).to.be.an('object');
      expect(addedUsers).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when adding a user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user/batch')
        .replyWithError('Something bad happened!');

      await expect(client.users.addUsers()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deleteUser()', () => {
    const response = {
      result: 'johndoe deleted',
    };

    it('should successfully delete a user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/user/johndoe')
        .reply(200, response);

      const resp = await client.users.deleteUser('johndoe');

      expect(client.users.deleteUser).to.be.a('function');
      expect(resp).to.be.an('object');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when deleting a user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/user/notjohndoe')
        .replyWithError('Something bad happened!');

      await expect(
        client.users.deleteUser('notjohndoe')).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getUser()', () => {
    const response = {
      firstName: 'John',
      lastName: 'Smith',
      username: 'johndoe',
      email: 'john.doe@myfakeemail.com',
      createdAt: '2020-03-15T16:13:14Z',
      passwordLastUpdated: '2020-03-15T16:13:14Z',
      verified: true,
      _selfUrl: '/api-public/v1/user/johndoe'
    };

    it('should return the information for a user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/johndoe')
        .reply(200, response);

      const userInfo = await client.users.getUser('johndoe');

      expect(client.users.getUser).to.be.a('function');
      expect(userInfo).to.be.an('object');
      expect(userInfo).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when getting the user information', async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe')
        .replyWithError('Something bad happened!');

      await expect(client.users.getUser('notjohndoe')).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#updateUser()', () => {
    const response = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@anotheremail.com',
      createdAt: '2020-03-15T16:13:14Z',
      passwordLastUpdated: '2020-03-15T16:13:14Z',
      verified: true,
      _selfUrl: '/api-public/v1/user/johndoe'
    };

    it('should return the updated details of the user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .put('/api-public/v1/user/johndoe')
        .reply(200, response);

      const updatedUser = await client.users.updateUser('johndoe', {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john.doe@anotheremail.com',
        admin: false,
      });

      expect(client.users.updateUser).to.be.a('function');
      expect(updatedUser).to.be.an('object');
      expect(updatedUser).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it('should throw an error when updating a user', async () => {
      // Mock the API request.
      nock(baseUrl)
        .put('/api-public/v1/user/notjohndoe')
        .replyWithError('Something bad happened!');

      await expect(client.users.updateUser()).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getTeams()', () => {
    const response = {
      teams: [
        {
          name: 'My Team',
          slug: 'team-00VkR4NvJvM5h9Ae',
          _membersUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae/members',
          _policiesUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae/policies',
          _adminsUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae/admins',
          _selfUrl: '/api-public/v1/team/team-00VkR4NvJvM5h9Ae'
        }
      ]
    };

    it(`should return the user's team memberships`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/johndoe/teams')
        .reply(200, response);

      const userTeams = await client.users.getTeams('johndoe');

      expect(client.users.getTeams).to.be.a('function');
      expect(userTeams).to.be.an('object');
      expect(userTeams).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the user's teams`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/teams')
        .replyWithError('Something bad happened!');

      await expect(client.users.getTeams('notjohndoe')).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});