# Data Persistence

Kambrik uses a simple type of data persistence to save data in different situations:
* On the server (Server Persistence)
* In config files (Config Persistence)

## Server Persistence

If our data is serializable, we can store it on the server by declaring a variable like so, passing in an identifier and a default value:

```kt
var names: MutableList<String> by serverData(
    Identifier("mymod", "my_names")
) {
    mutableListOf()
}
```
Accessing it works just like any other variable
```kt
names.add("Joe")
names = mutableListOf("James", "Joe", "Jack")
names.clear()
```
This data is automatically saved when the server shuts down, and
automatically loaded when the server starts up.

The data is saved to: `config/kambrik_server_data.json`.


::: warning
Server data persistence only works while the server is open! If you try to access data before the server has started, or after the server has stopped, using this feature will throw an error.

If you want to persist data and access it at any time, consider using [Config Persistence](#config-persistence) instead.
:::

## Config Persistence

We can also automatically store data in config files. The process is generally quite similar:

```kt
var names: MutableList<String> by configData(
    Identifier("mymod", "my_names")
) {
    mutableListOf()
}
```
Unlike Server Persistence, this data will be loaded as soon as it is requested. It will be saved:
* If the config is on a server, when the server shuts down.
* If the config is on a client, when the client closes.

The data is saved to `config/{mod_id}/{mod_id}_data.json`.


## Other Considerations

In order to load and save these pieces of data, they must be serializable with `KotlinX Serialization`.


