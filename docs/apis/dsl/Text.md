# Text DSL

Creating many types of `MutableText` can be done more easily with Kambrik's Text DSL.

## Types

Here are some (not all) ways of creating some simple `Text`:

```kotlin
val textA = textLiteral("Hello!")
val textB = textTranslate("my.translation.key")
val textC = textKeybind("key.jump")
```

## Siblings

In order to add a sibling text, use the `add*` methods within the DSL block:

```kotlin
val text = textLiteral("Hello ") {
    addLiteral(player.displayName)
    addLiteral(", how are you?")
}
```

## Styles

Sibling texts inherit the style of their parent, unless they specify their own styles.

We can add Formatting with `format(...formattings)`.


::: code-group

```kotlin [Kambrik]
// All of this text will be Gold colored and Italicized, 
// except for the player's name, which is Aqua colored.
val text = textLiteral("Hello ") {
    format(Formatting.GOLD, Formatting.ITALIC)
    addLiteral(player.displayName) {
        format(Formatting.AQUA)
    }
    addLiteral(", how are you?")
}
```

```kotlin [Vanilla]
// All of this text will be Gold colored and Italicized, 
// except for the player's name, which is Aqua colored.
val text = LiteralText("Hello ")
    .formatted(Formatting.GOLD, Formatting.ITALIC)
    .append(
        LiteralText(player.displayName)
            .formatted(Formatting.AQUA)
    )
    .append(LiteralText(", how are you?"))
```

:::


We can also change some simple style properties without much effort:

```kotlin
val test = textLiteral("Hello ") {
    format(Formatting.GOLD)
    addLiteral("Joe") {
        color = 0x55ff33
        bold = true
        italics = true
        strikeThrough = false
        obfuscated = false
    }
    addLiteral(", how are you?")
}
```


## Hover Events

We can add hover events by setting the `hoverEvent` property.

::: code-group

```kotlin [Kambrik]
val test = textLiteral("Look at this bucket!") {
    format(Formatting.AQUA)
    hoverEvent = HoverEvent(HoverEvent.Action.SHOW_ITEM, HoverEvent.ItemStackContent(
        ItemStack(Items.BUCKET)
    ))
}
```

```kotlin [Vanilla]
val test = LiteralText("Look at this bucket!")
    .formatted(Formatting.AQUA)
    .styled { 
        it.withHoverEvent(
            HoverEvent(HoverEvent.Action.SHOW_ITEM, HoverEvent.ItemStackContent(
                ItemStack(Items.BUCKET)
            ))
        )
    }
```

:::

### Showing ItemStack text on Hover

We also have a shorthand for showing ItemStack tooltips when hovering over text,
making the previous example even shorter:

::: code-group

```kotlin [Kambrik]
val test = textLiteral("Look at this bucket!") {
    format(Formatting.AQUA)
    onHoverShowItem(
        ItemStack(Items.BUCKET)
    )
}
```

```kotlin [Vanilla]
val test = LiteralText("Look at this bucket!")
    .formatted(Formatting.AQUA)
    .styled { 
        it.withHoverEvent(
            HoverEvent(HoverEvent.Action.SHOW_ITEM, HoverEvent.ItemStackContent(
                ItemStack(Items.BUCKET)
            ))
        )
    }
```

:::

### Showing Text on Hover

Similarly, we can show Text when hovering over Text as well.

::: code-group

```kotlin [Kambrik]
val test = textLiteral("Hello World!") {
    onHoverShowText {
        format(Formatting.ITALIC)
        addLiteral("How are you?")
    }
}
```

```kotlin [Vanilla]
val test = LiteralText("Hello World!")
    .styled { 
        it.withHoverEvent(
            HoverEvent(
                HoverEvent.Action.SHOW_TEXT,
                LiteralText("How are you?")
                    .formatted(Formatting.ITALIC)
            )
        )
    }
```

:::


<!--
### Showing Entities on Hover

Showing entities on hover is simple, too:

```kotlin
val test = textLiteral("Look at this player!") {
    +Formatting.AQUA
    onHoverShowEntity(
        player
    )
}
```
-->
