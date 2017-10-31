import { nameFromDisplayName, getPlayer, getPlayerStats } from './smash'

export default {
  Query: {
    async player (_, { name }) {
      return getPlayer(name)
    }
  },

  Player: {
    async account (player, { region, platform }) {
      return (await getPlayer(player.name)).accounts.filter(account => {
        return account.platform === platform && account.region === region
      })[0]
    }
  },

  PlayerAccount: {
    async stats (account) {
      const stats = (await getPlayerStats(
        nameFromDisplayName(account.displayName),
        account.region,
        account.platform
      )).stats

      return stats
    }
  }
}
