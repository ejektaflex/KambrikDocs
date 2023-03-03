
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
[right here](https://github.com/ejektaflex/Bountiful-Fabric/tree/master/src/main/resources/data/bountiful).

To aid in the creation of Data Packs, you may want to use a mod such as [Open Loader](https://www.curseforge.com/minecraft/mc-mods/open-loader)
that allows global data pack loading across all worlds.


## Config Pack

A "config pack", as I call it, is nearly identical to a data pack, except
the folder structure exists inside of the config folder. In the config folder,
you will find two subfolders:
* `bounty_decrees`
* `bounty_pools`

Just like with data packs, you can create Pools and Decrees, and add them here. 
However, unlike data packs, you do not need to create a subfolder for each mod you
are adding compatibility for, since we are modifying the pool and decree data after 
it has already been loaded. 

E.g.:

```
config
    bountiful
        bounty_pools
            - new_pool.json
            - toolsmith.json
```

By default, adding a new file will **add** all of the file's elements into the game data.
If you instead wish to **replace** the datapack/game data with your config data, you can add
`"replace": true` to the top of your file's json object.

## Removing Content

If you want to remove certain decrees and pools from the game, Bountiful's config allows you to specify
certain datapack/game data files which you would like to exclude from loading. For example:
* `bounty_pools/bountiful/*` will exclude all Bountiful pools from loading
* `bounty_pools/*` will exclude all pools from loading
* `bounty_*` or just `*` would exclude all pools and decrees from loading 

There is currently no way of removing specific entries from a given pool.

## Localizing Content

Some content (namely, decrees or objectives/rewards with custom translation keys) may require you to contribute a 
localization to the game. This can be done via a resource pack. If you'd like a more simple approach, then something
such as Open Loader (mentioned above) will also work wonderfully.

