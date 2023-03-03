# Data Persistence <Badge text="unstable" type="warning"/>

Kambrik uses a simple type of data persistence to save data in different situations:
* On the server (Server Persistence)
* In config files (Config Persistence)

Unlike the persistence methods that many other libraries use, these simply read and write to files.
Synchronization between the client and server is not done. Rather, this persistence API is 
simply meant for data storage.

## Server Persistence

If our data is serializable, we can store it on the server by declaring a variable like so, passing in an identifier and a default value:

```kotlin
var serverData = ServerDataFile(file)
var names: MutableList<String> by serverData.of("my_names") { mutableListOf() }
```
Accessing it works just like any other variable
```kotlin
names.add("Joe")
names = mutableListOf("James", "Joe", "Jack")
names.clear()
```
This data is automatically saved when the server shuts down, and
automatically loaded when the server starts up.


::: warning
Server data persistence only works while the server is open! If you try to access data before the server has started, or after the server has stopped, using this feature will throw an error.

If you want to persist data and access it at any time, consider using [Config Persistence](#config-persistence) instead.
:::

## Config Persistence

We can also automatically store data in config files. The process is generally quite similar:

```kotlin
var configData = ConfigDataFile(file)
var faveNum by configData.of { 1 }
// ...
faveNum = 33
```
Unlike Server Persistence, this data will be loaded as soon as it is requested. It will be saved:
* If the config is on a server, when the server shuts down.
* If the config is on a client, when the client closes.


## Other Considerations

In order to load and save these pieces of data, they must be serializable with `KotlinX Serialization`. As such, if they are Vanilla classes, they must also be marked with contextual.

```kotlin
var locations: MutableList<@Contextual BlockPos> by myConfigDatafile.of {
    mutableListOf()
}
```


