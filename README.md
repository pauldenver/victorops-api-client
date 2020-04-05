# VictorOps API Client

A NodeJS library for interacting with the [VictorOps REST API](https://portal.victorops.com/public/api-docs.html).

## Installation

```bash
# NPM installation.
npm install victorops-api-client

# Yarn installation.
yarn add victorops-api-client
```

## Usage

Example import methods:

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