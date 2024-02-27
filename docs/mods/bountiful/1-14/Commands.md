## Commands

There are several commands that modpack makers might find useful for Bountiful, all of which use the command `/bo`:
* `/bo decree (decree id)` will give you a decree with the given ID. Hitting tab will show you a list of all available decree IDs to choose from.
* `/bo hand` will create a JSON entry out of the item in your hand and copy it to your clipboard, useful for making your own bounties for data packs. You can hover over this message in the chat to see what data it created as well.
* `/bo reload` will reload the Bountiful data pack files - this is useful if you don't want to do a full reload with `/reload`, but only works in single player, OR as the server.
* `/bo test` will test all bountiful data files for simple errors, such as incorrect item names and invalid entry amounts. It will report any errors to the chat.
* `/bo sample (decree id) (level)` is *an advanced command* for modpack makers that will simulate a worst-case bounty generation for a given decree, and tell you if any rewards do not have any suitable matching objectives. This is useful for modpack makers that want to add their own objectives and rewards.
  * For example, if you type `/bo sample armorer 1`, it will go through each reward and try to find a suitable objective that matches 1 copy of the max amount of that reward. If you get any errors, you should add some higher-worth objectives to that decree. The general rule of thumb is that you should be able to pass level 2 of any decree.
  * This is to find and avoid situations where rewards and objectives might be unbalanced (e.g. you have a decree where the only objective is for sticks and the only reward is for diamonds).
