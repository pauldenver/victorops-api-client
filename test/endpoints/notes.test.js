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

describe('Notes Endpoint Tests', () => {
  let client;
  let reqHeaders;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539',
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);

    // Get the headers from the instance.
    reqHeaders = { reqheaders: client._headers };
  });

  context('#getNotes()', () => {
    const incidentNum = 32;

    const response = {
      name: 'note_1',
      displayName: 'Note #1',
      json_value: {},
    };

    it(`should get notes associated with an incident`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get(`/api-public/v1/incidents/${incidentNum}/notes`)
        .reply(200, response);

      const resp = await client.notes.getNotes(incidentNum);

      expect(client.notes.getNotes).to.be.a('function');
      expect(resp).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting notes`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .get(`/api-public/v1/incidents/${incidentNum}/notes`)
        .replyWithError('Something bad happened!');

      await expect(client.notes.getNotes(incidentNum)).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#createNote()', () => {
    const incidentNum = 75;

    const noteInfo = {
      name: 'note_2',
      displayName: 'Note #2',
      json_value: {},
    };

    it(`should create a new note for an incident`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post(`/api-public/v1/incidents/${incidentNum}/notes`)
        .reply(200, noteInfo)
        .post(`/api-public/v1/incidents/${incidentNum}/notes`, {})
        .reply(200, {});

      let resp = await client.notes.createNote(incidentNum, noteInfo);

      expect(client.notes.getNotes).to.be.a('function');
      expect(resp).to.eql(noteInfo);

      resp = await client.notes.createNote(incidentNum);

      expect(resp).to.eql({});

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when creating a new note`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .post(`/api-public/v1/incidents/${incidentNum}/notes`, {})
        .replyWithError('Something bad happened!');

      await expect(client.notes.createNote(incidentNum)).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#deleteNote()', () => {
    const incidentNum = 18;
    const noteName = 'note_3';

    it(`should delete an existing note`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete(`/api-public/v1/incidents/${incidentNum}/notes/${noteName}`)
        .reply(200, {});

      const resp = await client.notes.deleteNote(incidentNum, noteName);

      expect(client.notes.getNotes).to.be.a('function');
      expect(resp).to.eql({});

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when deleting a note`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .delete(`/api-public/v1/incidents/${incidentNum}/notes/${noteName}`)
        .replyWithError('Something bad happened!');

      await expect(
        client.notes.deleteNote(incidentNum, noteName),
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });

  context('#updateNote()', () => {
    const incidentNum = 47;
    const noteName = 'note_4';

    const noteInfo = {
      name: 'note_4',
      displayName: 'Note #4',
      json_value: {},
    };

    it(`should update an existing note for an incident`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put(`/api-public/v1/incidents/${incidentNum}/notes/${noteName}`)
        .reply(200, {})
        .put(`/api-public/v1/incidents/${incidentNum}/notes/${noteName}`, {})
        .reply(200, {});

      let resp = await client.notes.updateNote(incidentNum, noteName, noteInfo);

      expect(client.notes.updateNote).to.be.a('function');
      expect(resp).to.eql({});

      resp = await client.notes.updateNote(incidentNum, noteName);

      expect(resp).to.eql({});

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when updating a note`, async () => {
      // Mock the API request.
      nock(baseUrl, reqHeaders)
        .put(`/api-public/v1/incidents/${incidentNum}/notes/${noteName}`, {})
        .replyWithError('Something bad happened!');

      await expect(
        client.notes.updateNote(incidentNum, noteName),
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});
