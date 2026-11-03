# External URL App

A small interactive BigID TPA sample that opens a configured URL in a browser tab. On startup it defaults to `https://bigid.com/` and the app name `External URL`.

## How it works

- `GET /manifest` returns the `updateURL` action and its Redirect URL and App Name parameters.
- `POST /execute` validates and stores the supplied URL/name in process memory.
- `GET /ui` opens the current URL in a new tab; `GET /logs` serves the application log.

The configured values are not persisted and reset to their defaults when the service restarts. The service listens over HTTP on **port 3000**.

## Run locally

Requires Node.js and npm.

```sh
npm install
npm run run
```

`npm run run` invokes Gulp’s TypeScript development build. To build the files for the included Dockerfile:

```sh
npm run build
docker build -t external-url-app .
docker run --rm -p 3000:3000 external-url-app
```

## Security and limitations

This is a demo redirect app, not an allowlisted URL service. Its endpoints have no authentication and accept user-configured destinations. Only run it inside a trusted environment, restrict reachable destinations as appropriate, and do not expose it to untrusted networks. The code also disables TLS certificate verification in Node.js; do not use that setting in production.

<!-- bigidsecure-community-guidance -->
## BigID Community

This repository is part of [BigID Community](https://github.com/bigidsecure), a place for community members to share code, integrations, examples, and projects with other BigID customers.

Project ownership and support vary by repository. Check the maintainers, license, prerequisites, and compatibility notes before use, and validate the project in your own environment. Unless this repository explicitly says otherwise, do not assume the project is officially supported or maintained by BigID.

Please do not commit credentials, customer data, or other confidential information. Check this repository’s contribution guidance before submitting changes.
