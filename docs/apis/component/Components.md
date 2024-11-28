
# Data Components

Kambrik allows us to register and use Kotlin data classes as Minecraft Data Components. 

You can use any immutable Kotlin data class as a component, for example:
```kotlin
@Serializable @JvmRecord
data class MyItemData(val timesUsed: Int)
```

Registering your component is easy:
```kotlin
object MyModContent : KambrikAutoRegistrar {
    val MY_ITEM_DATA by serialComponent<MyItemData>("my_item_data")
}
```

Now, you can use that component just like you would any other component!
```kotlin
val itemTimesUsed = stack[MyModContent.MY_ITEM_DATA]?.timesUsed
```

For convenience, there is also an extension function for editing a component on an ItemStack:
```kotlin
stack.edit(MyModContent.MY_ITEM_DATA) { current ->
    current.copy(timesUsed = current.timesUsed + 1)
}
```