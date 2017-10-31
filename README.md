# oversmash-api

Production-ready (ish!!) GraphQL API implementation backed by [oversmash](https://github.com/filp/oversmash).

Query player information, achievements and stats for the [Overwatch](https://playoverwatch.com/en-us/) game. Includes auto-generated, complete type information for all available stats (e.g "what's the average healing as Ana for this player, in competitive mode")

Features:

- Full static schema available, which when used with a compatible tool gives you full type information and suggestions (e.g in GraphiQL)
- Configurable rate limiting support
- Proper GraphQL errors
- In-memory LRU cache for player information
- Detailed request and operation logging
- Backed by [oversmash](https://github.com/filp/oversmash), including automated efficient scraping of all hero stats

### Example query and response:

See [`docs/example.md`](/docs/example.md)

### Endpoints:

`oversmash-api` exposes two endpoints:

- `POST /graphql` - Standard GraphQL endpoint
- `GET /health` - Returns `200 OK` as long as oversmash is running

### Updating the schema

`oversmash-api` uses a static schema file bundled with this repo (see: [schema.graphql](/schema.graphql)). This file is created from a training set of random (high-ranking) users. To re-generate the schema (e.g to include new achievements, stats or heroes) run:

```shell
$ npm run generate-schema
```

## Stuff 🤠🦍

See [`LICENSE.md`](/LICENSE.md) for license information

Contributions are welcome! See [`CONTRIBUTING.MD`](/CONTRIBUTING.MD)` for information.
