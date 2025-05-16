# Customizing Bounties

Customizing bounty objectives is done in 1.14 via data packs. You can create your own data pack using instructions on the **[Minecraft wiki](https://minecraft.gamepedia.com/Data_pack)**, or (if you are a modpack maker) you can use a data pack loader mod such as **[Open Loader](https://www.curseforge.com/minecraft/mc-mods/open-loader)** to more easily create data packs for modpacks.

## Decrees

Decrees are items that determine which items show up in bounty boards. A "Fisherman" Decree will only create bounties with objectives and rewards related to fishing! These decrees pull objectives and rewards from different pools. All default Decree data can be [found here](https://github.com/ejektaflex/Bountiful/tree/1.14-legacy-forge/src/main/resources/data/bountiful/bounties/decrees/bountiful).

### A Typical Decree Entry

Here's a typical Decree entry (`toolsmith.json`):
```json
{
  "spawnsInBoard": true,
  "objectivePools": [
    "common_crafts",
    "all_villager_objs",
    "toolsmith_objs"
  ],
  "rewardPools": [
    "all_villager_rews",
    "toolsmith_rews"
  ]
}
```
NOTE: As of v`3.1.0`, `spawnsInBoard` does not do anything. It will be implemented in a future release.

As you can see, the Toolsmithing Decree pulls objectives from three different pools and pulls rewards from two different pools. Overriding this file with your own `toolsmith.json` via a data pack will let you add to or replace this data.

## Pools

Pools are lists of objectives/rewards that Decrees can pull from. All default Pool data can be [found here](https://github.com/ejektaflex/Bountiful/tree/1.14-legacy-forge/src/main/resources/data/bountiful/bounties/pools/bountiful).

### A Typical Pool Entry
Here is an example of a typical entry:
```json
{
  "type": "item",
  "content": "minecraft:cobblestone",
  "amountRange": {
    "min": 8,
    "max": 64
  },
  "unitWorth": 25,
  "weight": 1000
}
```

Here is a description of each key:
* `type` - What type of entry this is
  * Valid objective types are: `item`, `item-tag`, and `entity`
  * Valid reward types are: `item`, `item-tag` and `command`
* `content` - A string describing the objective. 
  * For items, use `modid:itemid`.
    * Examples: `minecraft:iron_axe`, `minecraft:stick`
  * For entities, use `modid:entityid`.
    * Examples: `minecraft:sheep`, `minecraft:skeleton`
    * Use `/bo entities` to dump a list of all entities to `logs/bountiful.log`.
* `amountRange` - The minimum and maximum amount of this item that will be requested in the bounty
* `unitWorth` - The amount of "worth" that a single one of this objective will be worth. This value will be used to find suitable objectives that match the combined worth of the rewards.
* `weight` - This is an arbitrary number that determines how often, relatively, this bounty reward will be picked compared to another. Rewards with higher weights will be picked more often.
  * NOTE: Weight is ***not*** considered when picking objectives, just rewards!


#### Item Objectives/Rewards

For item objectives/rewards, use `"type": "item"`. 
* `content` should be the item's registry name (e.g. `minecraft:iron_axe`, `minecraft:stick`).
* If you want the item to have NBT, use an `"nbt": {}` key. See [this file](https://github.com/ejektaflex/Bountiful/blob/1.14-legacy-forge/src/main/resources/data/bountiful/bounties/pools/bountiful/common_enchants.json) for some examples of item objectives/rewards with NBT data.
* To easily generate JSON data for entries, type `/bo hand` with an item in your hand and it will copy the correct JSON data to your clipboard. Make sure to check the `nbt` field, because it can occasionally convert NBT->JSON data incorrectly (Long number being converted from say `5` to `"5L"`, shorts and bytes as `"5s"` and `"5b"`) depending on how it was stored.


#### Tag Objectives/Rewards

For item objectives/rewards that you want to use a tag for, use `"type": "item-tag"`.
* `content` should be the name of the tag (see: [tag list](https://minecraft.gamepedia.com/Tag)). (e.g. `forge:dyes`, `minecraft:logs`, `minecraft:trapdoors`)


#### Entity Objectives (Mobs)

For entity objectives, use `"type": "entity"`
* `content` should be the registry name of the entity (e.g. `minecraft:spider`, `minecraft:zombie`, `minecraft:magma_cube`)

### Command Rewards

For command rewards, use `"type": "command"`
* `content` should be the commmand you want to run. (e.g. `/time set day`, `/give %player% torch 1`)
* There are several replacements that you can add:
  * `%player%` will be replaced with the name of the player that completed the reward
  * `%amount%` will be replaced by the random amount that the bounty picked for that reward. Useful



#### Misc

* If you want your objective / reward to have a custom name, use `"name": "Your Name Here"`. Note that this is not localized, so it will always show up this way regardless of language. There will be a translation key option in a later update.