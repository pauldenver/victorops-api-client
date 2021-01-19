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

describe('Personal Paging Policy Values Endpoint Tests', () => {
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

  context('#getNotificationTypes()', () => {
    const response = {
      notificationTypes: [
        {
          type: 'push',
          description: 'Send a push notification to all my devices'
        },
        {
          type: 'email',
          description: 'Send an email to an email address'
        },
        {
          type: 'sms',
          description: 'Send an SMS to a phone number'
        },
        {
          type: 'phone',
          description: 'Make a phone call to a phone number'
        }
      ],
      _selfUrl: '/api-public/v1/policies/types/notifications'
    };

    it(`should return the available notification types`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/policies/types/notifications')
        .reply(200, response);

      const types = await client.pagingPolicyValues.getNotificationTypes();

      expect(client.pagingPolicyValues.getNotificationTypes).to.be.a('function');
      expect(types).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the notification types`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/policies/types/notifications')
        .replyWithError('Something bad happened!');

      await expect(
        client.pagingPolicyValues.getNotificationTypes()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getContactTypes()', () => {
    const response = {
      contactTypes: [
        {
          type: 'email',
          description: 'Email Address'
        },
        {
          type: 'phone',
          description: 'Phone Number'
        }
      ],
      _selfUrl: '/api-public/v1/policies/types/contacts'
    };

    it(`should return the available contact types`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/policies/types/contacts')
        .reply(200, response);

      const types = await client.pagingPolicyValues.getContactTypes();

      expect(client.pagingPolicyValues.getContactTypes).to.be.a('function');
      expect(types).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the contact types`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/policies/types/contacts')
        .replyWithError('Something bad happened!');

      await expect(
        client.pagingPolicyValues.getContactTypes()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getTimeoutValues()', () => {
    const response = {
      timeoutTypes: [
        {
          type: '1',
          description: 'If still unacked after 1 minute'
        },
        {
          type: '5',
          description: 'If still unacked after 5 minutes'
        },
        {
          type: '10',
          description: 'If still unacked after 10 minutes'
        },
        {
          type: '15',
          description: 'If still unacked after 15 minutes'
        },
        {
          type: '20',
          description: 'If still unacked after 20 minutes'
        },
        {
          type: '25',
          description: 'If still unacked after 25 minutes'
        },
        {
          type: '30',
          description: 'If still unacked after 30 minutes'
        },
        {
          type: '45',
          description: 'If still unacked after 45 minutes'
        },
        {
          type: '60',
          description: 'If still unacked after 60 minutes'
        }
      ],
      _selfUrl: '/api-public/v1/policies/types/timeouts'
    };

    it(`should return the available timeout values`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/policies/types/timeouts')
        .reply(200, response);

      const types = await client.pagingPolicyValues.getTimeoutValues();

      expect(client.pagingPolicyValues.getTimeoutValues).to.be.a('function');
      expect(types).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the timeout values`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get('/api-public/v1/policies/types/timeouts')
        .replyWithError('Something bad happened!');

      await expect(
        client.pagingPolicyValues.getTimeoutValues()
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});