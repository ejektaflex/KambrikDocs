
# Bounty Customization

Customizing bounty objectives & rewards is quite easy. All you need to do is create
a new file that matches the name of the pool/decree you are trying to override,
and add your JSON entries there.

You can view the existing file structure [here](https://github.com/ejektaflex/Bountiful/tree/1.19.2-legacy-fabric/src/main/resources/data/bountiful).

For example, if we want to add a new objective to all pools:

1) Create a new file at `config/bountiful/bounty_pools/_all_objs.json`
2) Add this to the file:
```json
{
    "content": [
        {
            "type": "ITEM",
            "content": "minecraft:torch",
            "amount": {
                "min": 1,
                "max": 8
            },
            "unitWorth": 100
        }
    ]
}
```
3) Save it!
4) If you are in the game, type `/reload`.

## A Typical Entry

Lets break down what a typical entry is made of:
* `type` - the type of bounty we are making. Valid are: `ITEM`, `ITEM_TAG`, `ENTITY`, `COMMAND`.
* `content` - a textual representation of the content.
* `amount` - the minimum and maximum amount of this content that can be picked.
* `unitWorth` - how much a single amount of this objective is worth

### Lesser Used Keys

Here are some other keys that are used somewhat more infrequently:
* `rarity` - how rare this entry is. more rare entries show up less often (but become
    more common at higher reputations). Valid values are `COMMON`, `UNCOMMON`, `RARE`, `EPIC` and `LEGENDARY`
* `weightMult` - in case you'd like to further tweak the weight a bit, for some reason
    * Use sparingly, and try stick with changing `rarity` if you can
* `timeMult` - in case you want to give the user more time to complete this bounty
* `translation` - a translation key, for if you want to give this entry a custom name.
    This takes precedence over the `name` key.
* `name` - literal text, in case you want an unlocalized name for this entry
    * Please stick with translation keys when you can so that your modpack can be localized.
    The name feature is intended for users who do not plan to release their configs
    as part of a public modpack.
* `repRequired` - sets a hard requirement on the board reputation needed to be given this entry.
    Can be useful, but is never used in the default bounty data. Only works for rewards.
* `forbids` - a list of other entries that you never want to see opposed to this one. E.g. if
    you never want an iron ingot to be an objective where iron blocks are a reward, you can do this:
```json
{
    "type": "ITEM",
    "content": "minecraft:iron_block",
    "amount": {
        "min": 1,
        "max": 1
    },
    "unitWorth": 9000,
    "forbids": [
        {
            "type": "ITEM",
            "content": "minecraft:iron_ingot"
        }
    ]
}
```
Note that `forbids` key accepts only an array of object with the keys `type` and `content`. No other keys
are allows for the forbids list entries


## Entry Types

### Item Entries (`ITEM`)

Item entries can be objectives or rewards. Their content is defined by an itemstack.
For example: `minecraft:torch` or `minecraft:diamond`.

Item entries can also be [item tags](https://minecraft.fandom.com/wiki/Tag), prefixed with a hashtag. 
For example, you could make an item entry `#minecraft:beds`, and when the objective/reward is generated,
it will substitute this with a random bed from the bed tag. 

Item entries also have an extra key: `nbt`. This contains a string representation of the NBT of the item 
asked for / given. Note: quotation marks must be backslash escaped. It may be easier to hold an item in
your hand and type `/bo hand` to have the correct entry with the correct NBT copied to your clipboard.

### Entity Entries (`ENTITY`)

Entity entries ask you to go out and kill a certain number of mobs. As such, they can only be rewards.
Entity entries are defined by their entity type. E.g. `minecraft:husk` or `minecraft:cave_spider`.

### Item Tag Entries (`ITEM_TAG`)

Item tag entries act like a wildcard objective entry for items. When given a valid tag (no hashtag, unlike ITEM), 
for example `minecraft:candles` or `minecraft:doors`, it will accept any combination of any valid items that the 
tag represents.

### Command Entries (`COMMAND`)

Command entries are rewards that allow you to specify a command that is run when you turn in the reward. 
Specifically, it is run as the server. Several strings will be auto-replaced in the final command, as
follows:
* `%PLAYER_NAME%` -> the name of the player that submitted the bounty
* `%PLAYER_NAME_RANDOM%` -> the name of a random player on the server
* `%PLAYER_POSITION%` -> gets replaced with the `x y z` coordinates of the submitting player
* `%BOUNTY_AMOUNT%` -> the amount that was assigned to this entry


