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

describe('Rotations Endpoint Tests', () => {
  let client;

  // Set the client options.
  const clientOptions = {
    apiId: '4db9c3ea',
    apiKey: '4eeb5d430d2ae2fe18d54f0c95707539'
  };

  beforeEach(() => {
    client = new VictorOpsApiClient(clientOptions);
  });

  context('#getRotationGroups()', () => {
    const response = {
      rotationGroups: [
        {
          teamSlug: 'team-btVkW4cvMvM5h5yv',
          slug: 'rtg-91CXHetYQHBLhmPV',
          label: 'Team Rotation'
        }
      ]
    };

    it(`should return a list of all rotation groups`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/teams/team-btVkW4cvMvM5h5yv/rotations')
        .reply(200, response);

      const groups = await client.rotations.getRotationGroups(
        'team-btVkW4cvMvM5h5yv');

      expect(client.rotations.getRotationGroups).to.be.a('function');
      expect(groups).to.eql(response);

      // Remove the mocks.
      nock.cleanAll();
    });

    it(`should throw an error when getting the rotation groups`, async () => {
      // Mock the API request.
      nock(baseUrl)
        .get('/api-public/v1/teams/some-other-team/rotations')
        .replyWithError('Something bad happened!');

      await expect(
        client.rotations.getRotationGroups('some-other-team')
      ).to.be.rejectedWith(Error);

      // Remove the mocks.
      nock.cleanAll();
    });
  });
});