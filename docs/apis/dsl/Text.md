# Text DSL

Creating many types of `MutableText` can be done more easily with Kambrik's Text DSL.

## Types

Here are some (not all) ways of creating some simple `Text`:

```kt
val textA = textLiteral("Hello!")
val textB = textTranslate("my.translation.key")
val textC = textKeybind("key.jump")
```

## Siblings

Adding sibling texts can be done by nesting them inside of the main text, preceded by a unary `+` symbol.

In order to add a sibling text, put a `+` before your sibling!

```kt
val text = textLiteral("Hello ") {
    +textLiteral(player.displayName)
    +textLiteral(", how are you?")
}
```

### Shorthands

You can substitute `textLiteral` for a string inside a builder to make your text shorter.

```kt
val text = textLiteral("Hello ") {
    +player.displayName
    +", how are you?"
}
```

## Styles

Sibling texts inherit the style of their parent, unless they specify their own styles.

We can add Formatting with `format(...formattings)`.

We can use the `+` shorthand here, too.

:::: code-group

::: code-group-item Kambrik

```kt
// All of this text will be Gold colored and Italicized, 
// except for the player's name, which is Aqua colored.
val text = textLiteral("Hello ") {
    format(Formatting.GOLD, Formatting.ITALIC)
    +player.displayName {
        format(Formatting.AQUA)
    }
    +", how are you?"
}
```

:::

::: code-group-item Shorthand

```kt
// All of this text will be Gold colored and Italicized, 
// except for the player's name, which is Aqua colored.
val text = textLiteral("Hello ") {
    +Formatting.GOLD; +Formatting.ITALIC
    +player.displayName {
        +Formatting.AQUA
    }
    +", how are you?"
}
```

:::

::: code-group-item Vanilla

```kt
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

::::


We can also change some simple style properties without much effort:

```kt
val test = textLiteral("Hello ") {
    +Formatting.GOLD
    +"Joe" {
        color = 0x55ff33
        bold = true
        italics = true
        strikeThrough = false
        obfuscated = false
    }
    +", how are you?"
}
```


## Hover Events

We can add hover events by setting the `hoverEvent` property.

Unary plus `+` syntax applies here as well.

:::: code-group

::: code-group-item Kambrik

```kt
val test = textLiteral("Look at this bucket!") {
    +Formatting.AQUA
    hoverEvent = HoverEvent(HoverEvent.Action.SHOW_ITEM, HoverEvent.ItemStackContent(
        ItemStack(Items.BUCKET)
    ))
}
```

:::

::: code-group-item Vanilla

```kt
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

::::

### Showing ItemStack text on Hover

We also have a shorthand for showing ItemStack tooltips when hovering over text,
making the previous example even shorter:

:::: code-group

::: code-group-item Kambrik

```kt
val test = textLiteral("Look at this bucket!") {
    +Formatting.AQUA
    onHoverShowItem(
        ItemStack(Items.BUCKET)
    )
}
```

:::

::: code-group-item Vanilla

```kt
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

::::

### Showing Text on Hover

Similarly, we can show Text when hovering over Text as well.

:::: code-group

::: code-group-item Kambrik

```kt
val test = textLiteral("Hello World!") {
    onHoverShowText {
        format(Formatting.ITALIC)
        +"How are you?"
    }
}
```

:::

::: code-group-item Vanilla

```kt
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

::::


<!--
### Showing Entities on Hover

Showing entities on hover is simple, too:

```kt
val test = textLiteral("Look at this player!") {
    +Formatting.AQUA
    onHoverShowEntity(
        player
    )
}
```
-->
