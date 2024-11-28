# Auto Registration

Kambrik allows developers to defer registration until Kambrik registers content.

## Registration Format

Registering the content is as simple as creating a KambrikAutoRegistrar object, defining your content, and telling Kambrik to register the object. Here is an example:

```kotlin
object MyModContent : KambrikAutoRegistrar {
    val MY_NEAT_ITEM = "neat_item" forItem NeatItem()
}
```

Doing this will register your item as `your_mod_id:neat_item`. You can still refer to your created item, `MyModContent.MY_NEAT_ITEM`, whenever you'd like after registration has completed.

## Completing Registration

In order to register this content, add a new entrypoint to your `fabric.mod.json` underneath your `main` entrypoint:

```json
"main": [/* ... */],
"kambrik": [ 
    {
        "adapter": "kotlin",
        "value": "my.neat.mod.MyModContent"
    }
]
```

If you're not using Fabric, you can manually register your mod's content with a single line, like so:

```kotlin
KambrikRegistrar.doRegistrationsFor(MyModContent)
```

## Content Types

Using this method, you can add many common types of content. Examples:

```kotlin
object MyModContent : KambrikAutoRegistrar {
    val MY_NEAT_ITEM = "neat_item" forItem NeatItem()
    val MY_POTION = "my_potion" forPotion NeatPotion()
    val COOL_BLOCK = "cool_block" forBlock CoolBlock()
}
```

You can view the full list of registration methods [on this page.](https://github.com/ejektaflex/Kambrik/blob/master/src/main/java/io/ejekta/kambrik/feature/registration/KambrikAutoRegistrar.kt)

You can view a working example of auto registration [here.](https://github.com/ejektaflex/Bountiful-Fabric/blob/master/src/main/java/io/ejekta/bountiful/content/BountifulContent.kt)