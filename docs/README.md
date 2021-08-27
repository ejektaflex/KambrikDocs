---
home: true
title: Home
heroImage: /images/android-chrome-512x512.png
actions:
  - text: Get Started
    link: /main/Getting-Started.md
    type: primary
  - text: Features
    link: /apis/dsl/Command.md
    type: secondary
features:
  - title: Kotlin-Based
    details: Kambrik uses Kotlin 1.5.31 under the hood, along with KotlinX Serialization for data serialization.
  - title: Fabric Integration
    details: We use existing Fabric APIs when possible to avoid reinventing the wheel.
  - title: Plug-And-Play
    details: Easy to add to a new project, and all API features are separate. Just use the ones you want.
  - title: Automatic Registration
    details: Item/Block/Potion/Etc registration is simplified, removing some of the verbosity.
  - title: Command DSL
    details: A Kotlin-esque Command DSL works on top of Brigadier to make command creation more simple.
  - title: Message API
    details: Messages can be sent between the client and server without ever writing to a packet.
footer: MIT Licensed with ♡
---

### Setup is as simple as two new lines of code.

<CodeGroup>

<CodeGroupItem title="Kotlin Gradle">

```kt
repositories {
    mavenCentral()
}

dependencies {
    modImplementation("io.ejekta:kambrik:1.0.0")
}
```

</CodeGroupItem>

<CodeGroupItem title="Gradle">

```groovy
dependencies {
    modImplementation 'io.ejekta:kambrik:VERSION'
}
```

</CodeGroupItem>

</CodeGroup>
