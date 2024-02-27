## Commands
You can either use `/bountiful`, or `/bo` for any of these commands.

* `/bo reload` - Reloads the bounty and reward registries with data from `config/bountiful/bounties.json` and `config/bountiful/rewards.json`. If this command fails, it will tell you and revert back to using it's previous working data.
* `/bo gen` - Creates a new bounty and puts it into your inventory (If OP / in creative). If no valid bounty can be created, the bounty will be empty (and right clicking with the bounty in hand will attempt to generate bounty data for the bounty).
  * `/bo gen [common/uncommon/rare/epic]` - Same as `/bo gen`, but creates a new bounty of a specified rarity.
  * `/bo gen [c/u/r/e]` - Same as above, but shorthand.
* `/bo expire` - Forces the current bounty in your hand to become expired.
* `/bo entities` - Prints out a list of the registry names of all mobs to the chat. Used to find entity registry names in order to make them bounty objectives for the file `config/bountiful/bounties.json`.