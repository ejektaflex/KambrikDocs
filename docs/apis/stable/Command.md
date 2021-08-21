
# Commands

Kambrik offers an alternative command DSL that exists on top of the existing command 
framework, [Brigadier](https://github.com/Mojang/brigadier). This DSL allows us to more
easily express and modify the command tree, while still using Kotlin language features.

## Command Basics


To start, we can add normal commands inside of a `CommandRegistrationCallback`. 

A simple callback that adds a command might look like this:


```kt
override fun onInitialize() {

	//... init code ...

	val callback = CommandRegistrationCallback { dispatcher, dedicated ->
		dispatcher.addCommand("test") {
			// our command!
		}
	}

	CommandRegistrationCallback.EVENT.register(callback)
}
```

This creates a simple command: `/test`. It does not do anything yet, but it will work in-game as expected.

### Execution

In order to get this command to run some code, we can add `runs`.

<CodeGroup>
	<CodeGroupItem title="Kambrik">

```kt
dispatcher.addCommand("test") {
	this runs {
		println("Hello, World!")
		1
	}

	literal("apple") {
		this runs {
			println("Apples.")
			1
		}
	}

	literal("pear") runs {
		println("Pears.")
		1
	}
}
```
</CodeGroupItem>

<CodeGroupItem title="Vanilla">

```kt
dispatcher.register(
	CommandManager.literal("test")
		.executes { 
			println("Hello, World!")
			1
		}
		.then(
			CommandManager.literal("apple")
				.executes { 
					println("Apples.")
					1
				}
		)
		.then(
			CommandManager.literal("pear")
				.executes { 
					println("Pears.")
					1
				}
		)
	)
```

</CodeGroupItem>

</CodeGroup>

This will have created a new command, `/test [apple/pear]` !

::: tip
All `execute`/`runs` blocks are a Brigadier `CommandContext` !
As such, they should similarly return the number of successes that occurred.
:::

#### Function Layout

Execution blocks can clutter up our command tree. We can extract these code blocks into functions to make our code more concise.

```kt
dispatcher.addCommand("test") {
	literal("thing") {
		this runs doFoo()
	}

	literal("other_thing") runs doFoo()
}

fun doFoo() = Command<ServerCommandSource> { ctx -> 
	print("Did foo!")
	1
}
```

#### Composite Execution

We can also call commands from other commands. To manually call a command from inside
another command, run `command.run(context)`.

```kt
dispatcher.addCommand("test") {
	literal("thing") runs {
		doFoo().run(it)
	}

	literal("other_thing") runs doBar()
}

fun doFoo() = Command<ServerCommandSource> { ctx -> 
	print("Did foo!")
	1
}

fun doBar() = Command<ServerCommandSource> { ctx -> 
	print("Did bar!")
	doFoo().run(ctx)
	1
}
```

### Literals

We can add literals to commands in several different ways, as shown below:

<CodeGroup>

<CodeGroupItem title="Kambrik">

```kt
dispatcher.addCommand("test") {
	literal("test") {
		// ...
	}

	// shorthand
	"another_test" {
		// ...
	}
}
```

</CodeGroupItem>

<CodeGroupItem title="Vanilla">

```kt
dispatcher.register(
	CommandManager.literal("test")
		.then(
			CommandManager.literal("test")
		)
		.then(
			CommandManager.literal("another_test")
		)
)
```

</CodeGroupItem>

</CodeGroup>

The shorthand version is usually preferred.


### Arguments

We can create arguments for commands rather easily as well:

<CodeGroup>

<CodeGroupItem title="Kambrik">

```kt
dispatcher.addCommand("test") {
	"count" {
		intArg("amt") runs {
			val amt = getInteger(it, "amt")

			for (i in 0 until amt) {
				println("Counting: $i")
			}

			1
		}
	}
}
```

</CodeGroupItem>

<CodeGroupItem title="Vanilla">

```kt
dispatcher.register(
	CommandManager.literal("test")
		.then(
			CommandManager.literal("count")
				.then(
					CommandManager.argument("amt", integer())
						.executes {
							val amt = getInteger(it, "amt")

							for (i in 0 until amt) {
								println("Counting: $i")
							}

							1
						}
				)
		)
)
```

</CodeGroupItem>

</CodeGroup>

This creates a new command, `/test count (amt)`. It will print to the output `amt` number of times.

Built in arguments:
* `argString`, `argInt`, `argFloat`, `argBool`, `argIdentifier`

If you wish to use a different argument, there is always `argument<T>(type: ArgumentType<T>)` . 

### Suggestions

We can also provide suggestions for different arguments!

To do this, we can use `suggestionsList` to build a suggestions list.

<CodeGroup>

<CodeGroupItem title="Kambrik">

```kt
dispatcher.addCommand("fruit") {
	"eat" {
		val fruitIdeas = suggestionList { listOf("apple", "pear", "banana") }

		argString("fruit", items = fruitIdeas) {
			// ...
		}
	}
}
```

</CodeGroupItem>

<CodeGroupItem title="Vanilla">

```kt
dispatcher.register(
	CommandManager.literal("fruit")
		.then(
			CommandManager.literal("eat")
				.then(
					CommandManager.argument("fruit", string())
						.suggests { context, builder -> 
							listOf("apple", "pear", "banana").forEach { 
								builder.suggest(it)
							}
							builder.buildFuture()
						}
				)
		)
)
```

</CodeGroupItem>

</CodeGroup>

If you want to provide tooltips, you can instead use `suggestionListTooltipped {}`.


### Requirements

Some commands might have certain requirements in order to be run. For example, a player might need
to have the right permissions. Requirements work identically to Brigadier:

```kt
dispatcher.addCommand("greet") {
	// only works when "Joe" is online
	"joe" {
		requires { 
			"Joe" in it.playerNames
		}
		this runs {
			it.source.sendFeedback(LiteralText("Hey Joe!"), false)
			1
		}
	}
}
```

The most common requirement for running a command is for the player to be in creative mode, 
or have permission level 2. As such, you can use this handy shortcut:

```kt
dispatcher.addCommand("test") {
	requires(Kambrik.Command::hasBasicCreativePermission)
	// ...
}
```


## Clientside Commands

Fabric allows us to also specify client commands. We don't register these in a serverside callback, but instead inside of the mod initializer:

<CodeGroup>

<CodeGroupItem title="Kambrik">

```kt
override fun onInitialize() {

	//... init code ...

	Kambrik.Command.addClientCommand("test") {
		// our command!
	}

}
```

</CodeGroupItem>

<CodeGroupItem title="Vanilla">

```kt
override fun onInitialize() {

	//... init code ...

	if (FabricLoader.getInstance().environmentType == EnvType.CLIENT) {
		ClientCommandManager.DISPATCHER.register(
			LiteralArgumentBuilder.literal("test")
		)
	}

}
```

</CodeGroupItem>

</CodeGroup>


## Command Examples

This section contains some examples that show how you might do some common tasks with the Command API.

::: details Examples

This example lets you pick a registry, and prints all IDs in that registry to the log.

```kt
dispatcher.addCommand("example") {
	"dump" {
		val dumpables = suggestionList { 
			Registry.REGISTRIES.toList().map { it.key.value.toString() } 
		}
		argIdentifier("dump_what", items = dumpables) runs dump()
	}
}

private fun dump() = Command<ServerCommandSource> {
	val what = getIdentifier(it, "dump_what")

	if (Registry.REGISTRIES.containsId(what)) {
		val reg = Registry.REGISTRIES[what]!!
		println("Contents of registry '$what':")
		reg.ids.forEach { id ->
			println(id)
		}
		it.source.sendFeedback(
			LiteralText("Dumped contents of '$what' to log."), 
			false
			)
	} else {
		it.source.sendError(
			LiteralText("There is no registry with that name.")
		)
	}

	1
}
```

:::