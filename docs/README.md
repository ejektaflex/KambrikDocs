
# Kambrik

A lightweight Kotlin library mod for Fabric. 
Meant to simplify development through various means.

Kambrik Currently Offers: 
* Automatic Registration of Items, Blocks, Enchantments, etc.
* Command DSL for simple command creation
* Extension methods for common, reusable functionality


Experimental Features:
* Simple Kotlin <=> NBT conversion with Kotlinx Serialization


Upcoming Features:
* Simple Packet creation
* Automatic Packet serialization


Experimental library features will be put into `kambrikx` until they mature.


### Fabric?

Yes, this mod is for Fabric & Fabric API, and written in Kotlin.



### Testing For Styles :D!

```kt
"count" {
	intArt("amt") runs {
		val amt = getInteger(it, "amt")

		for (i in 0 until amt) {
			println("Counting: $i")
		}
	}
}

class Hello : MyFriend

data class HiThere

@Serializable
data class SupDude

```

Hey there matey!


::: tip Sup
This matters a lot!
:::



