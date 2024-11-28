
# Messages


The Message API is an abstraction over 
the [Fabric Networking API](https://github.com/FabricMC/fabric/tree/1.17/fabric-networking-api-v1). 
It uses [Kotlinx.Serialization](https://github.com/Kotlin/kotlinx.serialization)
to send messages over the network, without needing to create a `NbtElement` or `PacketByteBuf`.

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



## Serialization

When creating a `KambrikMsg`, all class properties should be serializable.
If they are not, they must be marked as `@Transient`.

## Serializing Vanilla Classes

We can also serialize a limited selection of classes from Vanilla. 

To do so, we mark the property/type with `@Contextual`:

```kotlin
@Serializable
class TellServerHello(val pos: @Contextual BlockPos) : ServerMsg() {
    override fun onServerReceived(ctx: MsgContext) {
        println("Hello from $pos!")
    }
}
```

A list of all contextual classes [can be found here](https://github.com/ejektaflex/Kambrik/blob/master/src/main/java/io/ejekta/kambrik/api/serial/KambrikSerialApi.kt).

## Reference Serializers


We can also reference some values that would otherwise be unserializable, and pass the reference to the other side. For example, `Item` classes are not serializable, but we can pass a reference to an Item registry object in a message.

Sending reference serializers works exactly like before, with a `@Contextual` annotation. In this example we send the server a Bucket:

```kotlin
@Serializable
class BanItem(val item: @Contextual Item) : KambrikMsg() {
    override fun onServerReceived(ctx: MsgContext) {
        println("We got passed a: ${item.name.asString()}!")
    }
}

//...

BanItem(Items.BUCKET).sendToServer()
```

Obviously, this will cause incorrect behaviour if the bucket does not exist on the server side. Because of this, you should
stick to using reference serializers only when you know the data exists on both sides.

A list of all reference serializers [can be found here](https://github.com/ejektaflex/Kambrik/blob/master/src/main/java/io/ejekta/kambrik/api/serial/KambrikSerialApi.kt).



## Usage in Commands

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