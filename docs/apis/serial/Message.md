
# Messages


The Message API is an abstraction over the game's networking system, allowing messages to be easily created and sent through plain Kotlin objects. 
It uses [Kotlinx.Serialization](https://github.com/Kotlin/kotlinx.serialization)
to send messages over the network, without needing to create NBT, a Codec or a Packet Byte Buffer!

::: tip
This page assumes you have basic knowledge of [Kotlinx Serialization](https://github.com/Kotlin/kotlinx.serialization)!
:::


## Message Basics

The Messages API allows us to send an object over the network, from the Client to the Server and vice-versa. 
To make a serializable object, it must have the `@Serializable` annotation and inherit from `KambrikMsg`.

```kotlin

@Serializable
data class TestMsg(val num: Int) : KambrikMsg() {
	override fun onClientReceived(ctx: MsgContext) {
		println("Got num!: $num")
	}
}
```

Registration and usage of these messages is simple.

```kotlin
// Registration (one time, in onInitialize):
Kambrik.Messages.registerClientMessage(
	TestMsg.serializer(), 
	Identifier("my_mod", "test_msg")
)

// Usage:
TestMsg(100).sendToClient(some_player)
// or
TestMsg(100).sendToClients(some_players)
```

::: warning
NOTE: Every message class must have one and only one associated identifier.
:::


## Usage in Code

`KambrikMsg` classes also have a `sendToClients` method. We can send this 
message to whichever players we'd like! The Fabric Networking API has a
helper class for this called `PlayerLookup`. The following example shows
a message being sent to all players that are 'tracking' (within view distance of)
the world origin.


```kotlin
@Serializable
class PurgeArea : KambrikMsg() {
	override fun onClientReceived(ctx: MsgContext) {
		ctx.client.player?.kill()
	}
}

// later on, in a Command DSL:
"purge" runs {
	PurgeArea().sendToClients(
		PlayerLookup.tracking(it.source.world, BlockPos.ORIGIN)
	)
	1
}

```


## Examples

This example shows how the Messages API could save us a lot of code:

::: code-group

```kotlin [Kambrik]
// Message Definition
@Serializable
class PlaceItemAtPosition(
    val item: @Contextual Item, val amount: Int, val pos: @Contextual BlockPos
) : ServerMsg() {
    override fun onServerReceived(ctx: MsgContext) {
        // do placement here
    }
}

// Register Message
Kambrik.Message.registerServerMessage(
	PlaceItemAtPosition.serializer(), 
	Identifier("kambrik", "place_item")
)

// Send Message
PlaceItemAtPosition(Items.BUCKET, 3, BlockPos.ORIGIN).sendToServer()
```

```kotlin [Vanilla/Fabric]
// Register packet
ClientPlayNetworking.registerGlobalReceiver(Identifier("kambrik", "place_item")) { 
	client, handler, buf, responseSender ->
		val itemStr = buf.readString()
		val item = Registry.ITEM.get(Identifier(itemStr))
		val amount = buf.readInt()
		val pos = buf.readBlockPos()
		client.execute {
			// do placement here
		}
}

// Create packet
fun createPlacementPacket(item: Item, amount: Int, pos: BlockPos): PacketByteBuf {
	return PacketByteBufs.create().apply {
		writeString(Registry.ITEM.getId(item).toString())
		writeInt(amount)
		writeBlockPos(pos)
	}
}

// Send packet
ClientPlayNetworking.send(
	Identifier("kambrik", "place_item"), 
	createPlacementPacket(Items.BUCKET, 3, BlockPos.ORIGIN)
)
```

:::