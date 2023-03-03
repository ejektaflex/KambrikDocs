---
layout: home

hero:
  name: Kambrik
  text: A Fabric Library Mod
  image:
    src: /images/android-chrome-512x512.png
    alt: Kambrik
  actions:
    - text: Get Started
      link: /main/Getting-Started.md
      theme: brand
    - text: Features
      link: /apis/dsl/Command.md
      theme: alt
features:
  - title: Kotlin-Based
    details: Kambrik uses Kotlin 1.8.10 under the hood, along with KotlinX Serialization for data serialization.
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

