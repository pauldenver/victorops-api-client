# VictorOps API Client  ![GitHub package.json version](https://img.shields.io/github/package-json/v/pauldenver/victorops-api-client)  [![Build Status](https://travis-ci.com/pauldenver/victorops-api-client.svg?branch=master)](https://travis-ci.com/pauldenver/victorops-api-client) [![Coverage Status](https://coveralls.io/repos/github/pauldenver/victorops-api-client/badge.svg?branch=master)](https://coveralls.io/github/pauldenver/victorops-api-client?branch=master)  [![codecov](https://codecov.io/gh/pauldenver/victorops-api-client/branch/master/graph/badge.svg)](https://codecov.io/gh/pauldenver/victorops-api-client)

The `victorops-api-client` library contains a simple and convenient HTTP client for making requests to
the [VictorOps REST API](https://portal.victorops.com/public/api-docs.html).

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Intialize the client](#initialize-the-client)
    - [Importing](#example-import-methods)
    - [Set environment variables in an application](#using-environment-variables-in-an-application)
    - [Set environment variables on the command line](#setting-environment-variables-before-running-an-application)
    - [Options](#options)
- [Examples](#examples)
- [Documentation](#documentation)
  - [On-Call](#on-call)
  - [Incidents](#incidents)
  - [Alerts](#alerts)
  - [Reporting](#reporting)
  - [Users](#users)
  - [User Contact Methods](#user-contact-methods)
  - [User Paging Policies](#user-paging-policies)
  - [Personal Paging Policy Values](#personal-paging-policy-values)
  - [Personal Paging Policies](#personal-paging-policies)
  - [Teams](#teams)
  - [Escalation Policies](#escalation-policies)
  - [Routing Keys](#routing-keys)
  - [Scheduled Overrides](#scheduled-overrides)
  - [Rotations](#rotations)
  - [Webhooks](#webhooks)
  - [Chat](#chat)
  - [Notes](#notes)
  - [Maintenance Mode](#maintenance-mode)
- [Change Log](#change-log)
- [License](#license)

## Installation

Using NPM:

```bash
$ npm install victorops-api-client
```

Using Yarn:

```bash
$ yarn add victorops-api-client
```

## Usage

### Initialize the client

The library exports a `VictorOpsApiClient` class. All you need to do is instantiate it, and you're ready to go. 
You'll need an API ID and API key provided by VictorOps. You can provide these values as `apiId` and `apiKey`
options or set these values as environment variables using `VO_API_ID` and `VO_API_KEY`.
By default, the client will use the `VO_API_ID` and `VO_API_KEY` environment variables if `apiId` and `apiKey`
are not provided in the options.  

#### Example import methods:

```javascript
const VictorOpsApiClient = require('victorops-api-client');

const client = new VictorOpsApiClient({
  apiId: 'API-ID',
  apiKey: 'API-KEY'
});
```

```javascript
import VictorOpsApiClient from 'victorops-api-client';

const client = new VictorOpsApiClient({
  apiId: 'API-ID',
  apiKey: 'API-KEY'
});
```

It is required to set the API ID and API key parameters as either environment variables or as options when instantiating the client. These parameters are necessary to execute `VictorOpsApiClient` calls. If these parameters are not provided or cannot be determined, then an error is thrown.

#### Using environment variables in an application:

```javascript
const VictorOpsApiClient = require('victorops-api-client');

// Set the API ID and key as environment variables.
process.env.VO_API_ID = 'SOME-API-ID';
process.env.VO_API_KEY = 'SOME-API-KEY';

const client = new VictorOpsApiClient();
```

#### Setting environment variables before running an application:

Linux:

```bash
$ VO_API_ID=SOME-API-ID VO_API_KEY=SOME-API-KEY node app.js
```

Windows:

```batch
> cmd /C "set VO_API_ID=SOME-API-ID && set VO_API_KEY=SOME-API-KEY && node app.js"
```

### Options

These are the available options for creating a `VictorOpsApiClient` instance. If the `apiId` and `apiKey` 
options are not provided, then the `VO_API_ID` and `VO_API_KEY` environment variables will be used instead.

| Name                | Default                      |  Description                                              |
| ------------------- | ---------------------------- | --------------------------------------------------------- |
| `apiId`             | `undefined`                  | VictorOps API ID                                          |  
| `apiKey`            | `undefined`                  | VictorOps API Key                                         |
| `timeout`           | `5000`                       | Number of milliseconds before the request times out       |
| `baseUrl`           | `https://api.victorops.com`  | The base URL for the VictorOps REST API                   |
| `fullResponse`      | `false`                      | Get the full response instead of just the body            |
| `maxContentLength`  | `10000`                      | The max size of the HTTP response content in bytes        |
| `maxBodyLength`     | `2000`                       | The max allowed size of the HTTP request body in bytes    |  

## Examples

Create an instance:

```javascript
const VictorOpsApiClient = require('victorops-api-client');

const client = new VictorOpsApiClient({
  apiId: 'API-ID',
  apiKey: 'API-KEY'
});
```

Get a list of users:

```javascript
async function getUsers() {
  try {
    const users = await client.users.getUsers();
    return users;
  } catch(err) {
    console.error(err);
  }
}
```

Get a list of incidents:

```javascript
async function getIncidents() {
  try {
    const incidents = await client.incidents.getIncidents();
    return incidents;
  } catch(err) {
    console.error(err);
  }
}
```

Create a new incident:

```javascript
async function createIncident() {
  try {
    const resp = await client.incidents.createIncident({
      summary: 'Test incident',
      details: 'Something bad happened!!!',
      userName: 'johndoe',
      targets: [
        {
          type: 'User',
          slug: 'johndoe'
        }
      ],
      isMultiResponder: true
    });
    return resp;
  } catch(err) {
    console.error(err);
  }
}
```

Get a list of teams:

```javascript
async function getTeams() {
  try {
    const teams = await client.teams.getTeams();
    return teams;
  } catch(err) {
    console.error(err);
  }
}
```

## Documentation

The client instance has a named property for each of the public endpoints in the [VictorOps REST API](https://portal.victorops.com/public/api-docs.html). Each endpoint property contains methods that correspond to the operations associated with the endpoint (according to the VictorOps API). All named endpoint methods return a `Promise` which resolves with the response data or rejects with an error. Below are the endpoints and operations included with the client.

Any endpoint operation that takes a `query` argument expects the value to be an `Object` that contains the query parameters for that particular endpoint operation. Please refer to the endpoint operation's documentation for the correct query parameters.  

### On-Call

- **`client.oncall.getUserSchedule(user, query)`** - Get a user's on-call schedule - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/On45call/get_api_public_v2_user_user_oncall_schedule)  
- **`client.oncall.getTeamSchedule(team, query)`** - Get a team's on-call schedule - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/On45call/get_api_public_v2_team_team_oncall_schedule)  
- **`client.oncall.getOncallUsers()`** - Get an organization's on-call users - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/On45call/get_api_public_v1_oncall_current)  
- **`client.oncall.createOncallOverride(policy, takeOncall)`** - Create an on-call override (take on-call) - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/On45call/patch_api_public_v1_policies_policy_oncall_user)  
<br />

### Incidents

- **`client.incidents.getIncidents()`** - Get the current incident information - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Incidents/get_api_public_v1_incidents)  
- **`client.incidents.createIncident(details)`** - Creates a new incident - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Incidents/post_api_public_v1_incidents)  
- **`client.incidents.ackIncidents(ackInfo)`** - Acknowledge an incident or list of incidents - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Incidents/patch_api_public_v1_incidents_ack)  
- **`client.incidents.rerouteIncidents(rules)`** - Reroute one or more incidents - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Incidents/post_api_public_v1_incidents_reroute)  
- **`client.incidents.resolveIncidents(resolveInfo)`** - Resolve an incident or list of incidents - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Incidents/patch_api_public_v1_incidents_resolve)  
- **`client.incidents.ackUserIncidents(ackInfo)`** - Acknowledge all incidents for which a user was paged - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Incidents/patch_api_public_v1_incidents_byUser_ack)  
- **`client.incidents.resolveUserIncidents(resolveInfo)`** - Resolve all incidents for which a user was paged - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Incidents/patch_api_public_v1_incidents_byUser_resolve)  
<br />

### Alerts

- **`client.alerts.getAlert(uuid)`** - Get information about an alert - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Alerts/get_api_public_v1_alerts_uuid)  
<br />

### Reporting

- **`client.reporting.getShiftChanges(team, query)`** - Get a list of shift changes for a team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Reporting/get_api_reporting_v1_team_team_oncall_log)  
- **`client.reporting.getIncidentHistory(query)`** - Get/search incident history - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Reporting/get_api_reporting_v2_incidents)  
<br />

### Users

- **`client.users.getUsers()`** - Get a list of users for an organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Users/get_api_public_v1_user)  
- **`client.users.addUser(user)`** - Add a user to an organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Users/post_api_public_v1_user)  
- **`client.users.addUsers(users)`** - Add users to an organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Users/post_api_public_v1_user_batch)  
- **`client.users.deleteUser(user, replacement)`** - Remove a user from an organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Users/delete_api_public_v1_user_user)  
- **`client.users.getUser(user)`** - Get the information for the specified user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Users/get_api_public_v1_user_user)  
- **`client.users.updateUser(user, userInfo)`** - Update the designated user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Users/put_api_public_v1_user_user)  
- **`client.users.getTeams(user)`** - Get the user's team membership - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Users/get_api_public_v1_user_user_teams)  
<br />

### User Contact Methods

- **`client.contactMethods.getContactMethods(user)`** - Get a list of all contact methods for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/get_api_public_v1_user_user_contact_methods)  
- **`client.contactMethods.getContactDevices(user)`** - Get a list of all contact devices for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/get_api_public_v1_user_user_contact_methods_devices)  
- **`client.contactMethods.deleteContactDevice(user, contactId)`** - Delete a contact device for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/delete_api_public_v1_user_user_contact_methods_devices_contactId)  
- **`client.contactMethods.getContactDevice(user, contactId)`** - Get the indicated contact device for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/get_api_public_v1_user_user_contact_methods_devices_contactId)  
- **`client.contactMethods.updateContactDevice(user, contactId, contactDevice)`** - Update a contact device for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/put_api_public_v1_user_user_contact_methods_devices_contactId)  
- **`client.contactMethods.getContactEmails(user)`** - Get a list of all contact emails for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/get_api_public_v1_user_user_contact_methods_emails)  
- **`client.contactMethods.createContactEmail(user, contactEmail)`** - Create a contact email for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/post_api_public_v1_user_user_contact_methods_emails)  
- **`client.contactMethods.deleteContactEmail(user, contactId)`** - Delete a contact email for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/delete_api_public_v1_user_user_contact_methods_emails_contactId)  
- **`client.contactMethods.getContactEmail(user, contactId)`** - Get a contact email for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/get_api_public_v1_user_user_contact_methods_emails_contactId)  
- **`client.contactMethods.getContactPhones(user)`** - Get a list of all contact phones for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/get_api_public_v1_user_user_contact_methods_phones)  
- **`client.contactMethods.createContactPhone(user, contactPhone)`** - Create a contact phone for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/post_api_public_v1_user_user_contact_methods_phones)  
- **`client.contactMethods.deleteContactPhone(user, contactId)`** - Delete a contact phone for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/delete_api_public_v1_user_user_contact_methods_phones_contactId)  
- **`client.contactMethods.getContactPhone(user, contactId)`** - Get a contact phone for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Contact32Methods/get_api_public_v1_user_user_contact_methods_phones_contactId)  
<br />

### User Paging Policies

- **`client.userPagingPolicies.getPagingPolicies(user)`** - Get paging policies for a user - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/User32Paging32Policies/get_api_public_v1_user_user_policies)  
<br />

### Personal Paging Policy Values

- **`client.pagingPolicyValues.getNotificationTypes()`** - Get the available notification types - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policy32Values/get_api_public_v1_policies_types_notifications)  
- **`client.pagingPolicyValues.getContactTypes()`** - Get the available contact types - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policy32Values/get_api_public_v1_policies_types_contacts)  
- **`client.pagingPolicyValues.getTimeoutValues()`** - Get the available timeout values - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policy32Values/get_api_public_v1_policies_types_timeouts)  
<br />

### Personal Paging Policies

- **`client.personalPagingPolicies.getPagingPolicy(username)`** - Get a user's paging policy - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/get_api_public_v1_profile_username_policies)  
- **`client.personalPagingPolicies.createPolicyStep(username, stepInfo)`** - Create a paging policy step - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/post_api_public_v1_profile_username_policies)  
- **`client.personalPagingPolicies.getPolicyStep(username, step)`** - Get a paging policy step - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/get_api_public_v1_profile_username_policies_step)  
- **`client.personalPagingPolicies.createPolicyStepRule(username, step, ruleInfo)`** - Creates a rule for a paging policy step. - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/post_api_public_v1_profile_username_policies_step)  
- **`client.personalPagingPolicies.updatePolicyStep(username, step, stepInfo)`** - Updates a paging policy step - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/put_api_public_v1_profile_username_policies_step)  
- **`client.personalPagingPolicies.deletePolicyStepRule(username, step, rule)`** - Deletes a rule for a paging policy step - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/delete_api_public_v1_profile_username_policies_step_rule)  
- **`client.personalPagingPolicies.getPolicyStepRule(username, step, rule)`** - Gets a rule for a paging policy step - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/get_api_public_v1_profile_username_policies_step_rule)  
- **`client.personalPagingPolicies.updatePolicyStepRule(username, step, rule, ruleInfo)`** - Updates a rule for a paging policy step - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Personal32Paging32Policies/put_api_public_v1_profile_username_policies_step_rule)  
<br />

### Teams

- **`client.teams.getTeams()`** - Get a list of teams for your organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/get_api_public_v1_team)  
- **`client.teams.addTeam(teamInfo)`** - Add a team to your organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/post_api_public_v1_team)  
- **`client.teams.removeTeam(team)`** - Remove a team from your organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/delete_api_public_v1_team_team)  
- **`client.teams.getTeam(team)`** - Get the information for the specified team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/get_api_public_v1_team_team)  
- **`client.teams.updateTeam(team, teamInfo)`** - Update the information for the specified team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/put_api_public_v1_team_team)  
- **`client.teams.getAdmins(team)`** - Get the team admins for the specified team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/get_api_public_v1_team_team_admins)  
- **`client.teams.getMembers(team)`** - Get the team members for the specified team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/get_api_public_v1_team_team_members)  
- **`client.teams.addMember(team, memberInfo)`** - Add a team member to the specified team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/post_api_public_v1_team_team_members)  
- **`client.teams.removeMember(team, user, replacement)`** - Remove a team member from the specified team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Teams/delete_api_public_v1_team_team_members_user)  
<br />

### Escalation Policies

- **`client.escalationPolicies.getPolicies()`** - Get a list of escalation policy information - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Escalation32Policies/get_api_public_v1_policies)  
- **`client.escalationPolicies.createPolicy(policyInfo)`** - Create an escalation policy - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Escalation32Policies/post_api_public_v1_policies)  
- **`client.escalationPolicies.deletePolicy(policy)`** - Delete a specified escalation policy - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Escalation32Policies/delete_api_public_v1_policies_policy)  
- **`client.escalationPolicies.getPolicy(policy)`** - Get a specific escalation policy - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Escalation32Policies/get_api_public_v1_policies_policy)  
<br />

### Routing Keys

- **`client.routingKeys.getRoutingKeys()`** - List routing keys and associated teams - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Routing32Keys/get_api_public_v1_org_routing_keys)  
- **`client.routingKeys.createRoutingKey(keyInfo)`** - Create a new routing key with escalation policy mapping - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Routing32Keys/post_api_public_v1_org_routing_keys)  
<br />

### Scheduled Overrides

- **`client.scheduledOverrides.getOverrides()`** - List all the scheduled overrides for an organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/get_api_public_v1_overrides)  
- **`client.scheduledOverrides.createOverride(overrideInfo)`** - Create a new scheduled override - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/post_api_public_v1_overrides)  
- **`client.scheduledOverrides.deleteOverride(publicId)`** - Deletes a scheduled override - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/delete_api_public_v1_overrides_publicId)  
- **`client.scheduledOverrides.getOverride(publicId)`** - Get the specified scheduled override - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/get_api_public_v1_overrides_publicId)  
- **`client.scheduledOverrides.getAssignments(publicId)`** - Get the specified scheduled override assignments - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/get_api_public_v1_overrides_publicId_assignments)  
- **`client.scheduledOverrides.deleteAssignment(publicId, policySlug)`** - Delete a scheduled override assignment - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/delete_api_public_v1_overrides_publicId_assignments_policySlug)  
- **`client.scheduledOverrides.getAssignment(publicId, policySlug)`** - Get the specified scheduled override assignments - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/get_api_public_v1_overrides_publicId_assignments_policySlug)  
- **`client.scheduledOverrides.updateAssignment(publicId, policySlug, assignmentInfo)`** - Update a scheduled override assignment - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Scheduled32Overrides/put_api_public_v1_overrides_publicId_assignments_policySlug)  
<br />

### Rotations

- **`client.rotations.getRotationGroups(team)`** - Get a list of all rotation groups for a team - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Rotations/get_api_public_v1_teams_team_rotations)  
<br />

### Webhooks

- **`client.webhooks.getWebhooks()`** - Get a list of all the webhooks for an organization - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Webhooks/get_api_public_v1_webhooks)  
<br />

### Chat

- **`client.chat.sendChat(chatInfo)`** - Send a chat message - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Chat/post_api_public_v1_chat)  
<br />

### Notes

- **`client.notes.getNotes(incidentNumber)`** - Get the notes associated with an incident - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Notes/get_api_public_v1_incidents_incidentNumber_notes)  
- **`client.notes.createNote(incidentNumber, noteInfo)`** - Create a new note for an incident - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Notes/post_api_public_v1_incidents_incidentNumber_notes)  
- **`client.notes.deleteNote(incidentNumber, noteName)`** - Delete a note - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Notes/delete_api_public_v1_incidents_incidentNumber_notes_noteName)  
- **`client.notes.updateNote(incidentNumber, noteName, noteInfo)`** - Update an existing note - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Notes/put_api_public_v1_incidents_incidentNumber_notes_noteName)  
<br />

### Maintenance Mode

- **`client.maintenanceMode.getModeState()`** - Get an organization's current maintenance mode state - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Maintenance32Mode/get_api_public_v1_maintenancemode)  
- **`client.maintenanceMode.startMode(modeDef)`** - Start maintenance mode for routing keys - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Maintenance32Mode/post_api_public_v1_maintenancemode_start)  
- **`client.maintenanceMode.endMode(modeId)`** - End maintenance mode for routing keys - [VictorOps Documentation](https://portal.victorops.com/public/api-docs.html#!/Maintenance32Mode/put_api_public_v1_maintenancemode_maintenancemodeid_end)  
<br />

## Change Log

The [CHANGELOG](./CHANGELOG.md) contains descriptions of notable changes.

## License

This software is licensed under the [Apache 2 license](./LICENSE).