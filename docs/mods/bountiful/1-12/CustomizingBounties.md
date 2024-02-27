# Customizing Bounties

Currently, there are two ways of customizing the bounties that show up in the bounty board. You can either edit bounty objectives or edit bounty rewards.

## Objectives

Customizing bounty objectives is quite easy. All you need to do is edit `config/bountiful/bounties.json`.

### A Typical Entry
Here is an example of a typical entry:
```json
{
  "content": "minecraft:dirt",
  "amount": {
    "min": 16,
    "max": 128
  },
  "unitWorth": 5,
  "weight": 100
}
```
Here is a description of each key:
* `content` - A string describing the objective. 
  * For items, use `modid:itemid`. If it contains metadata, use `modid:itemid:meta`
    * Examples: `minecraft:iron_axe`, `minecraft:stick`
  * For entities, use `entity:modid:entityid`.
    * Examples: `entity:minecraft:sheep`, `entity:minecraft:skeleton`, `entity:minecraft:villager_golem`
    * Use `/bo entities` for a list of all entities and their registry ID.
* `amount` - The minimum and maximum amount of this item that will be requested in the bounty
* `unitWorth` - The amount of "worth" that a single one of this objective will be worth. This value will be used to find suitable rewards that match the combined worth of the objectives.
* `weight` - This is an arbitrary number that determines how often, relatively, this bounty objective will be picked compared to another. Objectives with higher weights will be picked more often.
### Optional Keys
There are a couple of optional keys as well, which can be used to further define functionality of your bounties (NOTE: **v2.2+**!)
Example: 
```json
"content": "minecraft:potion",
  "amount": {
    "min": 1,
    "max": 3
  },
  "unitWorth": 300,
  "weight": 100,
  "stages": ["a", "b"],
  "nbt_data": "{Potion: \"minecraft:healing\"}"
}
```

Optional keys:
* `stages` - If you are using GameStages, this is a list of stages that are required for this bounty objective to start showing up in bounties on bounty boards. 
* `nbt_data` - This determines any additional NBT data that needs to be present on the required bounty objective item. If any quotation marks are present in this data, you must escape them by putting a '\\' before each quotation mark. 
  * Note: This applies to Item objectives only!
  * Note: If there is no NBT data associated with this objective, do not include this key at all. 


## Rewards

Customizing bounty objectives is quite easy. All you need to do it edit `config/bountiful/rewards.json`.

### A Typical Entry
Here is an example of a typical reward entry:
```json
{
  "content": "minecraft:gold_ingot",
  "unitWorth": 900,
  "weight": 100
}
```
Here is a description of each key:
* `content` - A string describing the reward. For rewards, this will always be an item.
  * For these items, the syntax is `modid:itemid`. If it contains metadata, use `modid:itemid:meta`
    * Examples: `minecraft:iron_axe`, `minecraft:stick`
* `unitWorth` - The total "worth" of a single one of this item. Used for finding appropriate rewards for a given bounty.
* `weight` - This is an arbitrary number that determines how often, relatively, this reward will be picked compared to another. Rewards with higher weights will be picked more often.

Optional keys (NOTE: **v2.2+**!):
* `stages` - If you are using GameStages, this is a list of stages that are required for this reward to start showing up in bounties on bounty boards. 
* `nbt_data` - This determines any additional NBT data that is present on the reward item. If any quotation marks are present in this data, you must escape them by putting a '\' before each quotation mark. 
  * Note: If there is no NBT data associated with this objective, do not include this key at all. 