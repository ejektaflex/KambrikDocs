
# File Structure

Customizing bounty objectives in Bountiful can be done in two different ways:
* Data Packs
* Configs

It is recommended that you read up on both methods, because knowing how one system
works will aid you with the other.

## Data Packs

You can create your own data pack using instructions
from the [Minecraft wiki](https://minecraft.fandom.com/wiki/Data_pack). You
should come to an understanding that data packs override data from the vanilla
game, and from other mods. In this case, you want to create a data pack that
overrides Bountiful's data files, which can be found 
[right here](https://github.com/ejektaflex/Bountiful/tree/6.0.3-1.20.1/datagen/data/content/common/bountiful).

An example data pack can be found [on Modrinth](https://modrinth.com/datapack/bountiful-examplepack).

To aid in the creation of Data Packs, you may want to use a mod such as [Open Loader](https://www.curseforge.com/minecraft/mc-mods/open-loader)
that allows global data pack loading across all worlds.


## Config Pack

A "config pack", as I call it, is nearly identical to a data pack, except
the folder structure exists inside of the config folder. In the config folder,
you will find two subfolders:
* `bounty_decrees`
* `bounty_pools`

Just like with data packs, you can create Pools and Decrees, and add them here. 
However, *unlike data packs*, you do **not** need to create a subfolder for each mod you
are adding compatibility for, since we are modifying the pool and decree data after 
it has already been loaded. 

E.g.:

```yaml
config
    bountiful
        bounty_pools
            - new_pool.json
            - toolsmith_objs.json
```

By default, adding a new file will **add** all of the file's elements into the game data.
If you instead wish to **replace** the datapack/game data with your config data, you can add
`"replace": true` to the top of your file's json object.


## Changing Content

Bountiful tries to balance itself against the vanilla game, but inevitably it's understandable that you've got some mods.
Perhaps you want to make some things more expensive, or replace emeralds with a different type of currency. In that case,
we can do what we call a "patch".

### Entry Patching

Lets say we want to take the farmer objective that asks the player to bring back some saplings, and make the saplings worth more.
Maybe 50 is too low, and we want to increase it to 100. To do that, we would create a new file at 
`config/bountiful/bounty_pools/farmer_objs.json` and put this in it:


```json
{
	"content": {
        "oak_sapling": {
            "unitWorth": 100
        }
    }
}
```

When Bounty data loads, Bountiful will look for the ID `oak_sapling` in the `farmer_objs` pool, and overwrite the 
old `unitWorth` with the new one. Any JSON key can be patch-overwritten for any pool entry.

We could use this method to do any sort of updates we want, such as:
* Increase the worth of a reward or objective
* Make a reward more or less rare
* Change how many of the objective/reward can be asked for / given


## Removing Content


### Removing a Single Entry

If we wanted to take the earlier example, and instead completely remove the oak sapling from the farmer objective pool,
we just need to refer to it by its ID and set it to null in `config/bountiful/bounty_pools/farmer_objs.json`:

```json
{
	"content": {
        "farmer_obj_oak_sapling": null
    }
}
```


### Entire Pool Wipes

Removing all entries from a pool is simple. If you want to completely remove all entries from `farmer_objs.json`,
write this text a new file at `config/bountiful/bounty_pools/farmer_objs.json`:

```json
{
    "replace" true,
	"content": {}
}
```

This uses the `replace` key we mentioned earlier and replaces the entire contents of the `farmer_objs` pool with an empty list.

### Bulk Removals

If you want to remove certain decrees and pools from the game, Bountiful's config allows you to specify
certain datapack/game data files which you would like to exclude from loading. For example:
* `bounty_pools/bountiful/*` will exclude all Bountiful pools from loading
* `bounty_pools/*` will exclude all pools from loading
* `bounty_*` or just `*` would exclude all pools and decrees from loading 


## Localizing Content

Some content (namely, decrees or objectives/rewards with custom translation keys) may require you to contribute a 
localization to the game. This can be done via a resource pack. If you'd like a more simple approach, then something
such as Open Loader (mentioned above) will also work wonderfully.

