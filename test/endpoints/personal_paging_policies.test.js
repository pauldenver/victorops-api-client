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

describe('Personal Paging Policies Endpoint Tests', () => {
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

  context('#getPagingPolicy()', () => {
    const response = {
      steps: [
        {
          index: 0,
          timeout: 5,
          rules: [
            {
              index: 0,
              type: 'email',
              contact: {
                id: 312412,
                type: 'Email'
              }
            }
          ]
        }
      ],
      _selfUrl: '/api-public/v1/profile/johndoe/policies'
    };

    it(`should return the user's paging policy`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/profile/johndoe/policies')
        .reply(200, response);

      const policy = await client.personalPagingPolicies.getPagingPolicy('johndoe');

      expect(client.personalPagingPolicies.getPagingPolicy).to.be.a('function');
      expect(policy).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the user's paging policy`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/profile/notjohndoe/policies')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.getPagingPolicy('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createPolicyStep()', () => {
    const response = {
      step: {
        index: 1,
        timeout: 5,
        rules: [
          {
            index: 0,
            type: 'email',
            contact: {
              id: 312479,
              type: 'Email'
            }
          }
        ]
      },
      _selfUrl: '/api-public/v1/profile/johndoe/policies/1'
    };

    it(`should create paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/profile/johndoe/policies')
        .reply(200, response);

      const policyStep = {
        timeout: 5,
        rules: [
          {
            index: 0,
            type: 'email',
            contact: {
              id: 312479,
              type: 'Email'
            }
          }
        ]
      };

      const resp = await client.personalPagingPolicies.createPolicyStep(
        'johndoe', policyStep);

      expect(client.personalPagingPolicies.createPolicyStep).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/profile/notjohndoe/policies')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.createPolicyStep('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getPolicyStep()', () => {
    const response = {
      step: {
        index: 0,
        timeout: 5,
        rules: [
          {
            index: 0,
            type: 'email',
            contact: {
              id: 312412,
              type: 'Email'
            }
          }
        ]
      },
      _selfUrl: '/api-public/v1/profile/johndoe/policies/0'
    };

    it(`should return a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get(`/api-public/v1/profile/johndoe/policies/${response.step.index}`)
        .reply(200, response);

      const step = await client.personalPagingPolicies.getPolicyStep(
        'johndoe', 0);

      expect(client.personalPagingPolicies.getPolicyStep).to.be.a('function');
      expect(step).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/profile/notjohndoe/policies/999')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.getPolicyStep('notjohndoe', 999)
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createPolicyStepRule()', () => {
    const response = {
      stepRule: {
        index: 1,
        type: 'phone',
        contact: {
          id: 450169,
          type: 'Phone'
        }
      },
      _selfUrl: '/api-public/v1/profile/johndoe/policies/0/1'
    };

    it(`should create a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/profile/johndoe/policies/0')
        .reply(200, response);

      const stepRule = {
        contact: {
          id: 450169,
          type: 'phone'
        },
        type: 'phone'
      };

      const step = await client.personalPagingPolicies.createPolicyStepRule(
        'johndoe', 0, stepRule);

      expect(client.personalPagingPolicies.createPolicyStepRule).to.be.a('function');
      expect(step).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post('/api-public/v1/profile/notjohndoe/policies/999')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.createPolicyStepRule('notjohndoe', 999)
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#updatePolicyStep()', () => {
    const response = {
      step: {
        index: 0,
        timeout: 5,
        rules: [
          {
            index: 0,
            type: 'phone',
            contact: {
              id: 312442,
              type: 'Phone'
            }
          }
        ]
      },
      _selfUrl: '/api-public/v1/profile/johndoe/policies/0'
    };

    it(`should update a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put('/api-public/v1/profile/johndoe/policies/0')
        .reply(200, response);

      const policyStep = {
        timeout: 5,
        rules: [
          {
            index: 0,
            type: 'phone',
            contact: {
              id: 312442,
              type: 'Phone'
            }
          }
        ]
      };

      const resp = await client.personalPagingPolicies.updatePolicyStep(
        'johndoe', 0, policyStep);

      expect(client.personalPagingPolicies.updatePolicyStep).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when updating paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put('/api-public/v1/profile/notjohndoe/policies/999')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.updatePolicyStep('notjohndoe', 999)
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deletePolicyStepRule()', () => {
    const response = {
      stepRule: {
        index: 1,
        type: 'phone',
        contact: {
          id: 450169,
          type: 'Phone'
        }
      },
      _selfUrl: '/api-public/v1/profile/johndoe/policies/0/1'
    };

    it(`should delete a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete('/api-public/v1/profile/johndoe/policies/0/1')
        .reply(200, response);

      const resp = await client.personalPagingPolicies.deletePolicyStepRule(
        'johndoe', 0, 1);

      expect(client.personalPagingPolicies.deletePolicyStepRule).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete('/api-public/v1/profile/notjohndoe/policies/999/99')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.deletePolicyStepRule('notjohndoe', 999, 99)
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getPolicyStepRule()', () => {
    const response = {
      stepRule: {
        index: 0,
        type: 'email',
        contact: {
          id: 780169,
          type: 'Email'
        }
      },
      _selfUrl: '/api-public/v1/profile/johndoe/policies/0/0'
    };

    it(`should return a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/profile/johndoe/policies/0/0')
        .reply(200, response);

      const rule = await client.personalPagingPolicies.getPolicyStepRule(
        'johndoe', 0, 0);

      expect(client.personalPagingPolicies.getPolicyStepRule).to.be.a('function');
      expect(rule).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/profile/notjohndoe/policies/999/99')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.getPolicyStepRule('notjohndoe', 999, 99)
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#updatePolicyStepRule()', () => {
    const response = {
      stepRule: {
        index: 3,
        type: 'phone',
        contact: {
          id: 450169,
          type: 'Phone'
        }
      },
      _selfUrl: '/api-public/v1/profile/johndoe/policies/0/3'
    };

    it(`should update a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put('/api-public/v1/profile/johndoe/policies/0/3')
        .reply(200, response);

      const stepRule = {
        contact: {
          id: 450169,
          type: 'phone'
        },
        type: 'phone'
      };

      const rule = await client.personalPagingPolicies.updatePolicyStepRule(
        'johndoe', 0, 3, stepRule);

      expect(client.personalPagingPolicies.updatePolicyStepRule).to.be.a('function');
      expect(rule).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when updating a rule for a paging policy step`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put('/api-public/v1/profile/notjohndoe/policies/999/99')
        .replyWithError('Something bad happened!');

      await expect(
        client.personalPagingPolicies.updatePolicyStepRule('notjohndoe', 999, 99)
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});