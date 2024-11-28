
# Serialization

Kambrik ships with several different serializers, allowing us to save arbitrary pieces of data to JSON and load them back later. These serializers are all made with [KotlinX Serialization](https://github.com/Kotlin/kotlinx.serialization), and *usage of this data serialization API assumes that you know the basics of KotlinX Serialization!*

To access the basic Kambrik JSON format, use `Kambrik.Serial.Format`.

## Serializing Data

Serializing data works just like regular KotlinX Serialization:
```kotlin
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

```kotlin
val format = Kambrik.Serial.formatFor(our_custom_module)

val data = format.encodeToString(
    FooData.serializer(), FooData(false, 5)
)
```
If you want to access or extend Kambrik's serializer module, you can access it via `Kambrik.Serial.DefaultSerializers`.

## Using Kambrik's Serializers

In order to serialize Vanilla data, we can add the annotation `@Contextual` to our type.

```kotlin
@Serializable
data class FooData(val pos: @Contextual BlockPos)
```

`BlockPos`, as well as any other Vanilla classes, cannot be serialized/deserialized unless `@Contextual` has been added.

These are the following classes that can be serialized to JSON when marked as `@Contextual`:
* Any registerable class* (`Block`, `Item`, etc)
* `ItemStack`*
* `BlockPos`
* `AABB/Box`
* `ResourceLocation/Identifier`
* `CompoundTag/NbtCompound`

\* These asterisk marked objects **require** a Registry context in order to be (de)serialized. See below.

### Registry Sensitive Serialization 

Some classes cannot be serialized or deserialized without a Registry context. For example, you might normally be able to serialize an `ItemStack` without issue, until an enchantment is added to it and suddenly the serializer fails. This is because Enchantment components internally rely on RegistryOps (which has access to the Enchantments registry) in order to serialize them. Similarly, Kambrik needs a registry context. This can be done by using a `PercaleJson` object and passing in a `RegistryOps` as it's first parameter.

// TODO add an example of this
