
# Bounty Generation

Bountiful follows a specific set of rules when determining which objectives and rewards should get used for a given bounty.

## Pools

Pools are lists of objectives and rewards that can be chosen from. A good example is `farmer_objs`, which
is a pool that contains some of the possible objectives in the Farming [Decree](../general/decrees.md).

## Decrees

Decrees are simply items that determine a set of pools that can be chosen from when generating a new Bounty.
For example, the `farmer` decree has these pools:

Objectives:
* `farmer_objs`
* `_all_objs`

Rewards:
* `farmer_rews`
* `_all_rews`
* `_gardening_rews`

If multiple Decrees exist on a bounty board, all of their pools will be combined when determining which
objectives and rewards to pick from.

## Matching Objectives & Rewards

Generating a new Bounty is fairly straightforward, this is what happens:

### **Reward Picking**

The Bounty system will pick several rewards at random (by default, 1 or 2), plus a random amount of each reward.

```json
"farmer_rew_apple": {
    "type": "item",
    "content": "minecraft:apple",
    "amount": {
        "min": 1,
        "max": 4
    },
    "unitWorth": 250
},


"farmer_rew_cookie": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:cookie",
    "amount": {
        "min": 2,
        "max": 32
    },
    "unitWorth": 150
}
```


The odds of a specific reward being picked are dependent on the reward's rarity and the board's reputation. Rewards
with higher rarity will be picked less often as rewards. As reputation goes up, rare rewards dynamically become slightly more common.

Once we pick our rewards, we calculate a total value of our rewards. If we picked 4x Cookies and 3x Apples, as per the JSON above, the Total Worth would be (4 * 150) + (3 * 250) = 600 + 750 = `1350`.


### **Objective Picking**

Next, we generate some objectives to match the rewards that we've come up with. 

```json
"farmer_obj_ingot": {
    "type": "item",
    "content": "minecraft:iron_ingot",
    "amount": {
        "min": 2,
        "max": 5
    },
    "unitWorth": 1000
},

"farmer_obj_bread": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:bread",
    "amount": {
        "min": 2,
        "max": 32
    },
    "unitWorth": 100
},

"farmer_obj_bread": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:cake",
    "amount": {
        "min": 1,
        "max": 5
    },
    "unitWorth": 600
}
```

Objectives can have multiple possible worth values, depending on the amount and unitWorth.
For example, an Iron Ingot with an amount range of `"min": 2` and `"max": 5`, plus a `unitWorth` of `1000` could have a total worth of any of these values: `[2000, 3000, 4000, 5000]`, depending on how many ingots are picked. At the same time, the range for bread in our example is very large, and looks like this: `[200, 300, 400, ..... 3100, 3200]`. Our cake range worth range is `[600, 1200, 1800, 2400, 3000]`.

For this example, the total value of our rewards is `1350`, so we should come up with some good objectives.

Bountiful has a default preference for how many objectives it wants, which is 1 or 2. Let's say that for our example it picks 2. It will go ahead and randomly divide our total reward worth into 2 pieces, let's say `800` and `550`.

Now, we have to find a suitable objective for each of those numbers. The valid range we can search is equal to that number +/- 25%. So:
* For `800`, we can match with any objectives within the range of `600-1000`. 1xCake = 600, so Cake is valid. 8xBread = 800, so Bread is also valid. We will pick one randomly. For this example, we will choose 1xCake.
* For `550`, we can match with any objectives within the range of `412.5-687.5`. We already picked Cake, so we can't use that. There is only one other option, 5xBread = 500, so we will pick 5xBread.


### **Balancing**

For our example, we have now picked the following rewards:
* 4x Cookies (150 worth each, 600 total)
* 3x Apples (250 worth each, 750 total)

And the following objectives:
* 1x Cake (600 each, 600 total)
* 5x Bread (100 each, 500 total)

Note that this results in a bounty with rewards worth 1350 and objectives worth 1100. These two values will often not be equal, but will vary a bit. This is normal, it allows for some bounties to sometimes be better deals than others. The objective value is close to the reward value, so we generally say that this is *good enough* for our purposes and is a fairly balanced bounty.


### **Reputation & Discounts**

But what about the bounty board's Reputation? Doesn't that give a discount?

Yes! As the board's reputation goes up, the discount also increases. This lowers the objective requirements needed to complete an equivalent reward. For example, at a 10% discount,
rewards worth 1000 will be matched with objectives worth 900. Increasing board Reputation therefore increases the number of worthwhile bounties, and makes them easier to complete!


### **Solving Balancing Issues**

What happens if our data is not designed to be balanced? Good question... take a look at this example reward pool:

```json
"cool_diamond": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:diamond",
    "amount": {
        "min": 1,
        "max": 6
    },
    "unitWorth": 5000
}
```

And here's our objective pool:

```json
"menial_task_1": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:dirt",
    "amount": {
        "min": 1,
        "max": 32
    },
    "unitWorth": 10
},

"menial_task_2": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:copper_ingot",
    "amount": {
        "min": 1,
        "max": 6
    },
    "unitWorth": 500
},

"menial_task_3": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:feather",
    "amount": {
        "min": 1,
        "max": 64
    },
    "unitWorth": 25
},

"menial_task_4": {
    "type": "item",
    "rarity": "UNCOMMON",
    "content": "minecraft:gravel",
    "amount": {
        "min": 1,
        "max": 50
    },
    "unitWorth": 20
},
```

Let's pretend that we're making another bounty. This time, the system chooses 6 diamonds. Diamonds in this example are worth 5000 each, so the Total Reward Worth is 6x5000 = `30000`. Wow!

Now the objectives need to be picked. Let's say that for this example, the objective picker prefers to only have 1 objective. We need to pick an objective in the range +/- 25% of 30000. That means we need to find an objective somewhere in the range of `22500-37500`:
* 10x Dirt = 320. That's not nearly enough.
* 6x Copper Ingot = 3000. That's still not even close.
* 64x Feather = 1600. That's not enough!
* 50x Gravel = 1000. Not enough.

This is an example of unbalanced objectives. We have a situation where no objective can match the value of the rewards being offered! What does Bountiful do in this situation? It will pick the best possible objective - in this case, *it will pick 6x Copper Ingots* for a total objective value of `3000`.

Now, we obviously have a problem. If the reward is worth `30000` but the objective is worth `3000`, well, that's not balanced! We can't use this as a real bounty! So, Bountiful goes into a sort of 'emergency mode' and will continue to find objectives and add them to the bounty until it has satisfied **50%** of the total reward value, which is in this case `15000`. Let's try to hit that goal:
* Feathers are worth the next highest, so we'll add 64x Feather for another 1600 worth. 3000 + 1600 = 4600.
* Gravel is worth the most after that, so we'll add 50x Gravel for another 1000 worth. 4600 + 1000 = 5600
* Dirt is worth the next highest amount, so we'll add 32x Dirt for another 320 worth. 5600 + 320 = 5920.

Oh no. We've hit our limit - there are no more objectives in this pool, but `5920` isn't anywhere close to `15000`, or even `30000`. There's sadly nothing else we can do in this situation, there is nothing else we can do. Our final bounty looks like this:

Rewards:
* 6x Diamonds (5000 each, 30000 total)

Objectives:
* 6x Copper Ingots (500 each, 3000 total)
* 64x Feathers (25 each, 1600 total)
* 50x Gravel (20 each, 1000 total)
* 32x Dirt (10 each, 320 total)

This is obviously an unbalanced bounty, despite our best attempts at balancing it, simply because there were not enough objectives to match the total reward worth.

In fact, if we had more objectives, **it would continue to add objectives until the worths are balanced - there could even be as many as a dozen or more objectives if needed to balance the bounty!**

#### Reasoning

Why does Bountiful balance bounties this way? The simple reason is that we want imbalance to be obvious to the modpack creator so that they can balance their objectives and rewards themselves, rather than put the problem on the player. We want to avoid the player seeing highly imbalanced bounties and thinking that there are bugs. So, when a modpack maker sees a bounty with an unreasonable amount of objectives, this should signal that something in their data is unbalanced and needs another look. Most likely, the modpack author needs to add more objectives with a higher range of worth values. It's worth taking a look at the rewards with the highest possible worth, and making sure that you have one or a few objectives that can match that worth.



