

# Keybinding API

Kambrik lets us easily register new keybinds, with several options available to us.


### Keyboard Keybinds
```kotlin
val eraseKeybind = Kambrik.Input.registerKeyboardBinding(
    GLFW.GLFW_KEY_BACKSPACE,
    keyTranslation = "mod.key.erase",
    keyCategory = "My Mod"
) {
    onDown { /* ... */ }
    onUp { /* ... */ }
}
```

### Mouse Keybinds
```kotlin
val mouseKeybind = Kambrik.Input.registerMouseBinding(
    GLFW.GLFW_MOUSE_BUTTON_1,
    keyTranslation = "mod.key.dothing",
    keyCategory = "My Mod"
) {
    onDown { /* ... */ }
    onUp { /* ... */ }
}
```

### Other Considerations

Both keybind registrations take an extra option boolean, `realTime: Boolean = false`. By default, all Kambrik keybinds are processed per tick. In practice, this is fine for most cases and should be left at it's default value whenever possible. In certain circumstances, you may need frame perfect keybind input, with which you can set `realTime` to `true`. This will cause the keybind to check for updates each frame, instead of each tick. 