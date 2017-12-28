import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import RateLimit from 'express-rate-limit'
import cors from 'cors'
import requestLogger from 'bunyan-request'
import { graphqlExpress } from 'apollo-server-express'
import { formatError } from 'apollo-errors'
import { loadSchema } from './schema'
import logger from './logger'

const app = express()
const port = process.env.PORT || (config.has('http.port') ? config.get('http.port') : 3000)
const graphqlRoute = '/graphql'

app.use(cors())

async function main () {
  app.use(requestLogger({
    logger,
    headerName: 'X-Request-Id'
  }))

  if (config.has('http.rateLimit')) {
    app.use(graphqlRoute, new RateLimit(config.get('http.rateLimit')))
  }

  app.use(graphqlRoute, bodyParser.json(), graphqlExpress({ formatError, schema: await loadSchema() }))

  // Health-check endpoint, returns an empty body and 200 OK as long as oversmash-api
  // is running.
  app.get('/health', (req, res) => res.status(200).end())

  // Basic root endpoint
  app.get('/', (req, res) => {
    res.status(200).json({
      routes: [
        '/',
        '/graphql',
        '/health'
      ]
    })
  })

  app.listen(port, () => {
    logger.info('http listening', { port })
  })
}

main()
