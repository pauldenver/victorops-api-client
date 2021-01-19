## VictorOps API Client Changelog

## v1.0.2

### Minor changes

*  Updated Axios dependency to v0.21.1 to address a security vulnerability ([CVE-2020-28168](https://nvd.nist.gov/vuln/detail/CVE-2020-28168)).
*  Updated module dependencies to their current versions.
*  Added the `maxBodyLength` option to set the maximum allowed size of the HTTP request body in bytes.
*  Added the `Chat` and `Notes` endpoints and their operations.

### Breaking changes

*  Removed support for Node.js versions less than v10.12.0.

## v1.0.1

### Minor changes

*  Removed unused test code.

## v1.0.0

*  Initial VictorOps API Client library release.