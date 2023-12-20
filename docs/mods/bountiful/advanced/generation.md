
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

**Reward Picking**

First, several rewards are picked at random. This is usually 1-2, but the upper range can
be configured with the config file. I generally recommend keeping it at 2, as 1-2 rewards isn't
too overwhelming.

For each of these picked rewards, a random amount is also picked, as determined by it's pool's
min and max value amounts. For example:

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

The Bounty system might pick these two rewards for the Farming decree. It might pick 3 apples and 10 cookies.
Apples are worth 250, and cookies are worth 150, so the total "worth" of our Bounty will be `(3*250) + (10*150) = 750 + 1500 = 2250`.

The odds of a specific reward being picked are dependent on the reward's rarity and the board's reputation. Rewards
with higher rarity will be picked less often as rewards.


**Objective Picking**

Next, we generate some objectives to match the rewards that we've come up with. The total value of our rewards is `2250`,
so our objectives should have a total value as close to `2250` as possible. We split the total value into 1-2 groups that sum up to `2250`.
For example purposes, lets say that Group A has a value of `400` and Group B has a value of `1850`.

Now, we go through each group and try to find an objective that can total up to each group's value:
* Group A will try to find an objective that sums up to `400` in `farmer_objs`
  * Wheat is worth 50, and the amount can be between 4-24. In this case, 8 wheat is perfect!
  * 8 wheat * 50 each = 400. We did it!
* Group B will try to find an objective that sums up to `1850` in `farmer_objs`
  * Hmmm.... 37 melon slices totals 1850. But we can't use that, the max amount for melon slices is 32.
  * 8 melons is worth 1750. That's close!
  * 6 mushroom stew is worth 1800. That's also close!
  * Now we pick a random objective that will get us as close to `1850` as possible. In this case it might randomly pick the mushroom stew.
  * 6 mushroom stew * 300 each = 1800. We're 50 off!
  
Now, we came up with two objectives! We're still 50 worth away from meeting the reward value... But often times, this is considered *close enough*.
Bounty generation is done!

At the end, we now have a Bounty with rewards:
* `3x Apples (250 each, 750 total)`
* `10x Cookies (150 each, 1500 total)`
* Sum: `750 + 1500 = 2250`

And objectives:
* `8x Wheat (50 each, 400 total)`
* `6x Mushroom Stew (300 each, 1800 total)`
* Sum: `400 + 1800 = 2200`

When we compare these two final values, you'll note that the rewards are worth a *little* bit more than the objectives, but that's okay. This small amount of variance shifts
from  bounty to bounty, and means that some bounties are more worthwhile than others. It also ensures that the algorithm isn't always picking the best options, but rather an
interesting variety of options.

But what if it's not enough? What if there were no rewards that had a high enough value / amount that could total up to 2250? 

In extreme cases where the objective worth is still not close to the reward worth, Bountiful will aggressively continue to add objectives
until it meets at least half of the reward worth. Generally, the only reason this would happen is if you have a couple of really big rewards
and do not have objectives that are worth enough to satisfy these rewards - if you ever see more than three objectives on a bounty, you
probably need some more high value objectives.


But what about the bounty board's Reputation? Doesn't that give a discount?

Yes! As the board's reputation goes up, the discount also increases. This lowers the objective requirements needed to complete an equivalent reward. For example, at a 10% discount,
rewards worth 1000 will be matched with objectives worth 900. Increasing board Reputation therefore increases the number of worthwhile bounties, and makes them easier to complete!