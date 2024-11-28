
# Getting Started

To add Kambrik to your project, add this to your Gradle build script:

::: code-group

```kotlin [Kotlin-Gradle]
dependencies {
    modImplementation("io.ejekta:kambrik:VERSION")
}
```

```groovy [Gradle]
repositories {
    mavenCentral()
}

dependencies {
    modImplementation 'io.ejekta:kambrik:VERSION'
}
```

:::

Where `VERSION` is the version of Kambrik that you want to use. You can find the latest version [here.](https://github.com/ejektaflex/Kambrik/packages/666830)

Alternatively, new projects can [use our GitHub template.](https://github.com/ejektaflex/KambrikExampleMod/)

::: tip
Kambrik is written for multiple mod loaders. As such, it uses Mojmaps for mappings and documentation is done using Mojmaps.
:::