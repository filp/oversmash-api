# Example query and response:

Query:

```graphql
{
  # For this player...
  player(name:"HaventMetYou-2451") {

    # Get all accounts...
    accounts {

      # For each account (region/platform) list all these fields:
      level
      platform
      region
      displayName

      stats {
        competitiveRank
        competitive {
          ana {
            combat {
              finalBlows
            }

            misc {
              healingDone
              healingDoneMostInGame
            }

            hero {
              nanoBoostAssists
            }
          }
        }
      }
    }
  }
}
```

Response:

```json
{
  "data": {
    "player": {
      "accounts": [
        {
          "level": 259,
          "platform": "pc",
          "region": "us",
          "displayName": "HaventMetYou#2451",
          "stats": {
            "competitiveRank": 4749,
            "competitive": {
              "ana": {
                "combat": {
                  "finalBlows": 7
                },
                "misc": {
                  "healingDone": 10795,
                  "healingDoneMostInGame": 7693
                },
                "hero": {
                  "nanoBoostAssists": 6
                }
              }
            }
          }
        },
        {
          "level": 195,
          "platform": "pc",
          "region": "eu",
          "displayName": "HaventMetYou#2451",
          "stats": {
            "competitiveRank": 4749,
            "competitive": {
              "ana": {
                "combat": {
                  "finalBlows": 7
                },
                "misc": {
                  "healingDone": 18052,
                  "healingDoneMostInGame": 6873
                },
                "hero": {
                  "nanoBoostAssists": 11
                }
              }
            }
          }
        },
        {
          "level": 265,
          "platform": "pc",
          "region": "kr",
          "displayName": "HaventMetYou#2451",
          "stats": {
            "competitiveRank": 4797,
            "competitive": {
              "ana": {
                "combat": {
                  "finalBlows": 11
                },
                "misc": {
                  "healingDone": 14103,
                  "healingDoneMostInGame": 7693
                },
                "hero": {
                  "nanoBoostAssists": 7
                }
              }
            }
          }
        }
      ]
    }
  }
}
```
