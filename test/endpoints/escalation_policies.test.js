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

describe('Escalation Policies Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getPolicies()', () => {
    const response = {
      policies: [
        {
          policy: {
            name: 'My Policy',
            slug: 'team-00VkR4NvJvM5h9Ae',
            _selfUrl: '/api-public/v1/policies/team-00VkR4NvJvM5h9Ae'
          },
          team: {
            name: 'My Team',
            slug: 'team-00VkR4NvJvM5h9Ae'
          }
        }
      ]
    };

    it(`should return a list of escalation policies`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/policies')
        .reply(200, response);

      const policies = await client.escalationPolicies.getPolicies();

      expect(client.escalationPolicies.getPolicies).to.be.a('function');
      expect(policies).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the escalation policies`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/policies')
        .replyWithError('Something bad happened!');

      await expect(
        client.escalationPolicies.getPolicies()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createPolicy()', () => {
    const response = {
      name: 'Another Policy',
      slug: 'pol-91foBRP82kKbkuHr',
      steps: [
        {
          timeout: 0,
          entries: [
            {
              executionType: 'rotation_group',
              user: {
                username: 'johndoe',
                firstName: 'John',
                lastName: 'Doe'
              },
              rotationGroup: {
                slug: 'rtg-91CXHetYQHBLhmPV',
                label: 'Team Rotation'
              },
              webhook: {
                slug: 'wh-kmTcvqJ6ebIHdnubS',
                label: 'My Webhook'
              },
              email: {
                address: 'john.doe@anotheremail.com'
              },
              targetPolicy: {
                policySlug: 'team-00VkR4NvJvM5h9Ae'
              }
            }
          ]
        }
      ],
      ignoreCustomPagingPolicies: false
    };

    it(`should create an escalation policy`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/policies')
        .reply(200, response);

      const policy = await client.escalationPolicies.createPolicy({
        name: 'Another Policy',
        teamSlug: 'team-00VkR4NvJvM5h9Ae',
        ignoreCustomPagingPolicies: false,
        steps: [
          {
            timeout: 0,
            entries: [
              {
                executionType: 'rotation_group',
                rotationGroup: {
                  slug: 'rtg-91CXHetYQHBLhmPV'
                },
                webhook: {
                  slug: 'wh-kmTcvqJ6ebIHdnubS'
                },
                user: {
                  username: 'johndoe'
                },
                email: {
                  address: 'john.doe@anotheremail.com'
                },
                targetPolicy: {
                  policySlug: 'team-00VkR4NvJvM5h9Ae'
                }
              }
            ]
          }
        ]
      });

      expect(client.escalationPolicies.createPolicy).to.be.a('function');
      expect(policy).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating an escalation policy`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/policies')
        .replyWithError('Something bad happened!');

      await expect(
        client.escalationPolicies.createPolicy()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deletePolicy()', () => {
    const response = {
      result: 'success'
    };

    it(`should delete an escalation policy`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/policies/pol-91foBRP82kKbkuHr')
        .reply(200, response);

      const resp = await client.escalationPolicies.deletePolicy(
        'pol-91foBRP82kKbkuHr');

      expect(client.escalationPolicies.deletePolicy).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting an escalation policy`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/policies/some-other-policy')
        .replyWithError('Something bad happened!');

      await expect(
        client.escalationPolicies.deletePolicy('some-other-policy')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getPolicy()', () => {
    const response = {
      name: 'My Policy',
      slug: 'team-00VkR4NvJvM5h9Ae',
      steps: [
        {
          timeout: 0,
          entries: [
            {
              executionType: 'user',
              user: {
                username: 'johndoe',
                firstName: 'John',
                lastName: 'Doe'
              }
            }
          ]
        }
      ],
      ignoreCustomPagingPolicies: false
    };

    it(`should return an escalation policy`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/policies/team-00VkR4NvJvM5h9Ae')
        .reply(200, response);

      const policy = await client.escalationPolicies.getPolicy(
        'team-00VkR4NvJvM5h9Ae');

      expect(client.escalationPolicies.getPolicy).to.be.a('function');
      expect(policy).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting an escalation policy`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/policies/some-other-policy')
        .replyWithError('Something bad happened!');

      await expect(
        client.escalationPolicies.getPolicy('some-other-policy')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});