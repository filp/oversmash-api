import config from 'config'
import oversmash from 'oversmash'
import lru from 'lru-cache'

import logger from './logger'

const ow = oversmash({
  normalizeNamesAs: 'camel'
})

const cache = lru({
  max: config.get('oversmash.cache.max') || 300, // All records have a size of 1, so we allow 300 records in cache
  maxAge: config.get('oversmash.cache.maxAge') || 86400000, // 1 day in ms
  length (n, key) { return 1 }
})

async function getOrSetCache (keyParts, setterFn) {
  const key = keyParts.join(':')

  if (cache.has(key)) {
    logger.info('cache', { hit: true, key })
    return cache.get(key)
  } else {
    logger.info('cache', { hit: false, key })
    const value = await setterFn()
    cache.set(key, value)

    return value
  }
}

export function nameFromDisplayName (displayName) {
  return displayName.replace('#', '-')
}

export async function getPlayer (name) {
  return getOrSetCache(['p', name], async () => ow.player(name))
}

export async function getPlayerStats (name, region, platform) {
  return getOrSetCache(['s', region, platform, name], async () => {
    return ow.playerStats(name, region, platform)
  })
}
