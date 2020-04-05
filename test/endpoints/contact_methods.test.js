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

describe('User Contact Methods Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getContactMethods()', () => {
    const response = {
      emails: {
        _selfUrl: '/api-public/v1/user/johndoe/contact-methods/emails',
        contactMethods: [
          {
            id: 122482,
            label: 'Default',
            value: 'john.doe@anotheremail.com',
            contactType: 'Email',
            rank: 500,
            verified: 'verified',
            extId: 'd0878692-12fb-46ba-8935-bt0d32c741b9',
            _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
              'emails/d0878692-12fb-46ba-8935-bt0d32c741b9'
          }
        ]
      },
      phones: {
        _selfUrl: '/api-public/v1/user/johndoe/contact-methods/phones',
        contactMethods: [
          {
            id: 250169,
            label: 'Burner',
            value: '+1 411-555-5555',
            contactType: 'Phone',
            rank: 500,
            verified: 'verified',
            extId: 'e250b867-6dc2-1dce-a634-7b36ubced3be',
            _selfUrl: '/api-public/v1/user/johndoe/contact-methods/phones/' +
              'e250b867-6dc2-1dce-a634-7b36ubced3be'
          }
        ]
      },
      devices: {
        _selfUrl: '/api-public/v1/user/johndoe/contact-methods/devices',
        contactMethods: [
          {
            id: 122485,
            deviceType: 'Android',
            label: 'johndoe - Verizon:SM-G928V',
            extId: '7e85f674-1441-44a8-n8d6-23de5b7c0b97',
            _selfUrl: '/api-public/v1/user/johndoe/contact-methods/devices/' +
              '7e85f674-1441-44a8-n8d6-23de5b7c0b97'
          }
        ]
      }
    };

    it(`should return a list of contact methods for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/johndoe/contact-methods')
        .reply(200, response);

      const methods = await client.contactMethods.getContactMethods('johndoe');

      expect(client.contactMethods.getContactMethods).to.be.a('function');
      expect(methods).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a list of contact methods`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/contact-methods')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.getContactMethods('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getContactDevices()', () => {
    const response = {
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/devices',
      contactMethods: [
        {
          id: 122485,
          deviceType: 'Android',
          label: 'johndoe - Verizon:SM-G928V',
          extId: '7e85f674-1441-44a8-n8d6-23de5b7c0b97',
          _selfUrl: '/api-public/v1/user/johndoe/contact-methods/devices/' +
            '7e85f674-1441-44a8-n8d6-23de5b7c0b97'
        }
      ]
    };

    it(`should return a list of contact devices for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/johndoe/contact-methods/devices')
        .reply(200, response);

      const devices = await client.contactMethods.getContactDevices('johndoe');

      expect(client.contactMethods.getContactDevices).to.be.a('function');
      expect(devices).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a list of contact devices`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/contact-methods/devices')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.getContactDevices('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deleteContactDevice()', () => {
    const deviceId = '7e85f674-1441-44a8-n8d6-23de5b7c0b97';

    const response = {
      deviceType: 'Android',
      label: 'johndoe - Verizon:SM-G928V',
      extId: deviceId,
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/devices/' +
        deviceId
    };

    it(`should delete a contact device for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete(`/api-public/v1/user/johndoe/contact-methods/devices/${deviceId}`)
        .reply(200, response);

      const resp = await client.contactMethods.deleteContactDevice(
        'johndoe', deviceId);

      expect(client.contactMethods.deleteContactDevice).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting a contact device`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/user/notjohndoe/contact-methods/devices/something')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.deleteContactDevice('notjohndoe', 'something')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getContactDevice()', () => {
    const deviceId = '7e85f674-1441-44a8-n8d6-23de5b7c0b97';

    const response = {
      id: 122485,
      deviceType: 'Android',
      label: 'johndoe - Verizon:SM-G928V',
      extId: deviceId,
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/devices/' +
        deviceId
    };

    it(`should return a contact device for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get(`/api-public/v1/user/johndoe/contact-methods/devices/${deviceId}`)
        .reply(200, response);

      const device = await client.contactMethods.getContactDevice(
        'johndoe', deviceId);

      expect(client.contactMethods.getContactDevice).to.be.a('function');
      expect(device).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a contact device`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/contact-methods/devices/something')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.getContactDevice('notjohndoe', 'something')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#updateContactDevice()', () => {
    const deviceId = '7e85f674-1441-44a8-n8d6-23de5b7c0b97';

    const response = {
      id: 122485,
      deviceType: 'Android',
      label: 'johndoe - Verizon:SM-G988',
      extId: deviceId,
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/devices/' +
        deviceId
    };

    it(`should update a contact device for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .put(`/api-public/v1/user/johndoe/contact-methods/devices/${deviceId}`)
        .reply(200, response);

      const device = await client.contactMethods.updateContactDevice(
        'johndoe', deviceId,
        {
          device_label: response.label,
          escalation_notification_sound: '',
          chat_escalation_sound: '',
          resolved_notification_sound: '',
        }
      );

      expect(client.contactMethods.updateContactDevice).to.be.a('function');
      expect(device).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when updating a contact device`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .put('/api-public/v1/user/notjohndoe/contact-methods/devices/something')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.updateContactDevice('notjohndoe', 'something')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getContactEmails()', () => {
    const response = {
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/emails',
      contactMethods: [
        {
          id: 122482,
          label: 'Default',
          value: 'john.doe@anotheremail.com',
          contactType: 'Email',
          rank: 500,
          verified: 'verified',
          extId: 'd0878692-12fb-46ba-8935-bt0d32c741b9',
          _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
            'emails/d0878692-12fb-46ba-8935-bt0d32c741b9'
        }
      ]
    };

    it(`should return a list of contact emails for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/johndoe/contact-methods/emails')
        .reply(200, response);

      const emails = await client.contactMethods.getContactEmails('johndoe');

      expect(client.contactMethods.getContactEmails).to.be.a('function');
      expect(emails).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a list of contact emails`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/contact-methods/emails')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.getContactEmails('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createContactEmail()', () => {
    const response = {
      id: 122496,
      label: 'Different Email',
      value: 'john.doe@differentemail.com',
      contactType: 'Email',
      rank: 400,
      verified: 'unverified',
      extId: 'c0038631-22fb-46ba-1635-um0d32c741c4',
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
        'emails/c0038631-22fb-46ba-1635-um0d32c741c4'
    };

    it(`should create a contact email for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user/johndoe/contact-methods/emails')
        .reply(200, response);

      const email = await client.contactMethods.createContactEmail('johndoe', {
        label: response.label,
        email: response.value,
        rank: response.rank,
      });

      expect(client.contactMethods.createContactEmail).to.be.a('function');
      expect(email).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating a contact email`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user/notjohndoe/contact-methods/emails')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.createContactEmail('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deleteContactEmail()', () => {
    const contactId = 'c0038631-22fb-46ba-1635-um0d32c741c4';

    const response = {
      id: 122496,
      label: 'Different Email',
      value: 'john.doe@differentemail.com',
      contactType: 'Email',
      rank: 400,
      verified: 'unverified',
      extId: contactId,
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
        `emails/${contactId}`
    };

    it(`should delete a contact email for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete(`/api-public/v1/user/johndoe/contact-methods/emails/${contactId}`)
        .reply(200, response);

      const resp = await client.contactMethods.deleteContactEmail(
        'johndoe', contactId);

      expect(client.contactMethods.deleteContactEmail).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting a contact email`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/user/notjohndoe/contact-methods/devices/something')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.deleteContactEmail('notjohndoe', 'something')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getContactEmail()', () => {
    const contactId = 'c0038631-22fb-46ba-1635-um0d32c741c4';

    const response = {
      id: 122496,
      label: 'Different Email',
      value: 'john.doe@differentemail.com',
      contactType: 'Email',
      rank: 400,
      verified: 'unverified',
      extId: contactId,
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
        `emails/${contactId}`
    };

    it(`should return a contact email for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get(`/api-public/v1/user/johndoe/contact-methods/emails/${contactId}`)
        .reply(200, response);

      const email = await client.contactMethods.getContactEmail(
        'johndoe', contactId);

      expect(client.contactMethods.getContactEmail).to.be.a('function');
      expect(email).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a contact email`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/contact-methods/emails/something')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.getContactEmail('notjohndoe', 'something')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getContactPhones()', () => {
    const response = {
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/phones',
      contactMethods: [
        {
          id: 250169,
          label: 'My Phone',
          value: '+1 411-555-0110',
          contactType: 'Phone',
          rank: 500,
          verified: 'verified',
          extId: '3b250afe-75bc-11ea-82b1-3c970e75c219',
          _selfUrl: '/api-public/v1/user/johndoe/contact-methods/phones/' +
            '3b250afe-75bc-11ea-82b1-3c970e75c219'
        }
      ]
    };

    it(`should return a list of contact phones for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/johndoe/contact-methods/phones')
        .reply(200, response);

      const phones = await client.contactMethods.getContactPhones('johndoe');

      expect(client.contactMethods.getContactPhones).to.be.a('function');
      expect(phones).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a list of contact phones`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/contact-methods/phones')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.getContactPhones('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createContactPhone()', () => {
    const response = {
      id: 122499,
      label: 'Different Phone',
      value: '+1 411-555-0120',
      contactType: 'Phone',
      rank: 400,
      verified: 'unverified',
      extId: 'c0038631-22fb-46ba-1635-um0d32c741c4',
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
        'phones/c0038631-22fb-46ba-1635-um0d32c741c4'
    };

    it(`should create a contact phone for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user/johndoe/contact-methods/phones')
        .reply(200, response);

      const phone = await client.contactMethods.createContactPhone('johndoe', {
        label: response.label,
        email: response.value,
        rank: response.rank,
      });

      expect(client.contactMethods.createContactPhone).to.be.a('function');
      expect(phone).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating a contact phone`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .post('/api-public/v1/user/notjohndoe/contact-methods/phones')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.createContactPhone('notjohndoe')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deleteContactPhone()', () => {
    const contactId = 'c0038631-22fb-46ba-1635-um0d32c741c4';

    const response = {
      id: 122496,
      label: 'Different Phone',
      value: '+1 411-555-0120',
      contactType: 'Phone',
      rank: 400,
      verified: 'unverified',
      extId: contactId,
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
        `phones/${contactId}`
    };

    it(`should delete a contact phone for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete(`/api-public/v1/user/johndoe/contact-methods/phones/${contactId}`)
        .reply(200, response);

      const resp = await client.contactMethods.deleteContactPhone(
        'johndoe', contactId);

      expect(client.contactMethods.deleteContactPhone).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting a contact phone`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .delete('/api-public/v1/user/notjohndoe/contact-methods/devices/something')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.deleteContactPhone('notjohndoe', 'something')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#getContactPhone()', () => {
    const contactId = '3b250afe-75bc-11ea-82b1-3c970e75c219';

    const response = {
      id: 250169,
      label: 'My Phone',
      value: '+1 411-555-0110',
      contactType: 'Phone',
      rank: 500,
      verified: 'verified',
      extId: contactId,
      _selfUrl: '/api-public/v1/user/johndoe/contact-methods/' +
        `phones/${contactId}`
    };

    it(`should return a contact phone for a user`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get(`/api-public/v1/user/johndoe/contact-methods/phones/${contactId}`)
        .reply(200, response);

      const phone = await client.contactMethods.getContactPhone(
        'johndoe', contactId);

      expect(client.contactMethods.getContactPhone).to.be.a('function');
      expect(phone).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting a contact phone`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/user/notjohndoe/contact-methods/phones/something')
        .replyWithError('Something bad happened!');

      await expect(
        client.contactMethods.getContactPhone('notjohndoe', 'something')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});