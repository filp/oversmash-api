# oversmash-api

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Production-ready (ish!!) GraphQL API implementation backed by [oversmash](https://github.com/filp/oversmash).

Query player information, achievements and stats for the [Overwatch](https://playoverwatch.com/en-us/) game. Includes auto-generated, complete type information for all available stats (e.g "what's the average healing as Ana for this player, in competitive mode")

Features:

- Full static schema available, which when used with a compatible tool gives you full type information and suggestions (e.g in GraphiQL)
- Configurable rate limiting support
- Proper GraphQL errors
- In-memory LRU cache for player information
- Detailed request and operation logging
- Backed by [oversmash](https://github.com/filp/oversmash), including automated efficient scraping of all hero stats

### Reference deployment

An oversmash-api reference deployment is available at https://oversmash.com

You can query it, for example, using [graphiql-app](https://github.com/skevy/graphiql-app):

![](/graphiql.png)

*Note: Hosted on Heroku's free tier, so the first request may be extra slow as the application wakes up.*

### Example query and response:

See [`docs/example.md`](/docs/example.md)

### Running oversmash-api

`oversmash-api` ships with a `Dockerfile`. If you have docker installed, you can start it with the following command:

```shell
# Build the docker image (only need to do this once, or when you make changes):
docker build -t oversmash-api .

# Run it in the foreground, exposing the default port:
docker run -p 3000:3000 -t -i oversmash-api
```

### Configuration

`oversmash-api` runs out of the box without requiring custom configuration. To customize it, you can:

- Set `NODE_CONFIG` to a JSON string with the configuration values you want to customize (see [`config/default.yml.example`](/config/default.yml.example) for the available options)
- Copy `config/default.yml.example` to `config/default.yml` and edit at your leisure.

Uses [node-config](https://github.com/lorenwest/node-config), which supports a bunch more options.

### Building for production

`oversmash-api` uses some newer language features such as `async/await`. In order to run it out of the box with your version of nodejs, you will probably need to first build it:

```shell
$ npm i # Ensure you have devDependencies installed
$ npm run build
$ npm prune --production # Optional: remove devDependencies, you no longer need them
$ node build/index.js # Start oversmash-api from the newly built build/index.js file
```

### Endpoints:

`oversmash-api` exposes two endpoints:

- `POST /graphql` - Standard GraphQL endpoint
- `GET /health` - Returns `200 OK` as long as oversmash is running
- `GET /` - Returns `200 OK` and a list of available routes

### Updating the schema

`oversmash-api` uses a static schema file bundled with this repo (see: [schema.graphql](/schema.graphql)). This file is created from a training set of random (high-ranking) users. To re-generate the schema (e.g to include new achievements, stats or heroes) run:

```shell
$ npm run generate-schema
```

## Stuff 🤠🦍

See [`LICENSE.md`](/LICENSE.md) for license information

Contributions are welcome! See [`CONTRIBUTING.MD`](/CONTRIBUTING.md) for information.
