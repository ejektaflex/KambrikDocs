
# Percale

Percale is a sister mod for Kambrik that allows for interop between KotlinX Serialization and Mojang's DynamicOps.

## Codec Generation

A simple way of explaining this is that we can take a Kotlin KSerializer and convert it automatically into a Codec:
```kotlin
@Serializable
data class MyCoordinate(val x: Int, val y: Int)

val coordCodec = MyCoordinate.serializer().toCodec()
```

Note that if you need to supply a custom Serializer Module, you can do so as a parameter to `toCodec`.

## KSerializer Generation

::: warning
KSerializer generation is experimental and unstable! There is no guarantee that a KSerializer can be created from a Codec.
:::

