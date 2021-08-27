
# Serialization

Kambrik ships with several different serializers, allowing us to save arbitrary pieces of data to JSON and load them back later. These serializers are all made with [KotlinX Serialization](https://github.com/Kotlin/kotlinx.serialization), and *usage of this data serialization API assumes that you know the basics of KotlinX Serialization!*

To access the basic Kambrik JSON format, use `Kambrik.Serial.Format`.

## Serializing Data

Serializing data works just like regular KotlinX Serialization:
```kt
@Serializable
data class FooData(val foo: Boolean, val bar: Int)

val data = Kambrik.Serial.Format.encodeToString(
    FooData.serializer(), FooData(false, 5)
)

println(data) //=> {"foo": false, "bar": 5}

val fooBar = Kambrik.Serial.Format.decodeFromString(
    FooData.serializer(), data
)

println(fooBar) //=> FooBar(foo=false, bar=5)
```

### Custom Serializer Modules

Using a custom serializer module is as easy as:

```kt
val format = Kambrik.Serial.formatFor(our_custom_module)

val data = format.encodeToString(
    FooData.serializer(), FooData(false, 5)
)
```
If you want to access or extend Kambrik's serializer module, you can access it via `Kambrik.Serial.DefaultSerializers`.

## Using Kambrik's Serializers

In order to serialize Vanilla data, we can add the annotation `@Contextual` to our type.

```kt
@Serializable
data class FooData(val pos: @Contextual BlockPos)
```

`BlockPos`, as well as any other Vanilla classes, cannot be serialized/deserialized unless `@Contextual` has been added.

These are the following classes that can be serialized to JSON when marked as `@Contextual`:
* `Block`*
* `BlockPos`
* `Box`
* `Identity`
* `Item`*
* `NbtCompound`

\* these classes are only referentially serialized.

### Referential Serialization

Some Vanilla classes cannot be fully serialized, and are instead turned into a piece of related data. For example, serializing a `BucketItem` results in `minecraft:bucket`. Deserializing it does a lookup in the item registry and returns the original `BucketItem`. These are primarily used in the [Message API](Message). See [the related documentation](Message#reference-serializers) for more information.
