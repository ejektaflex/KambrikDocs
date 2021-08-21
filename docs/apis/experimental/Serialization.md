

# NBT Serialization (WIP) <Badge text="unstable" type="warning"/>

Similarly to Kotlinx.Serialization's ability to turn Kotlin objects into JSON data and back, Kambrik
allows us to turn Kotlin objects into NBT elements and back.


```kt
@Serializable
data class TestNpc(val name: String, val age: Int)

// ...

val encoded = NbtFormat.Default.encodeToTag(
    TestNpc("Bob", 111)
)
println(encoded) //=> {name:"Bob",age:111}
```
