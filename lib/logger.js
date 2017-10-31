import bunyan from 'bunyan'

let logger = bunyan.createLogger({
  name: 'oversmashql',
  serializers: bunyan.stdSerializers
})

// https://github.com/trentm/node-bunyan/pull/148#issuecomment-53232979
export function muteLogger () {
  logger.level(bunyan.FATAL + 1)
}

export default logger
