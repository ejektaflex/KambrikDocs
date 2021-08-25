
# Design Philosophy

Kambrik has a specific set of goals in mind when it comes to how the API has been designed.

### Write for Discoverability

Most people using Kotlin are going to be writing code with IntelliJ. As such, autocompletion
features are important when it comes to writing code. Kambrik attempts to use method names that
enable discovery of new methods, as well as extension methods. For example, when typing `text`, you will see the options
for:
* `textLiteral`
* `textTranslate`
* `textKeybind`

All possibilities are brought to your attention with autocomplete alone, saving you time and logically
grouping similar functions together. Another place we do this is within Command DSLs, where typing `arg`
might give you:
* `argString`
* `argInt`
* `argIdentifier`
* `argBlockpos`
* etc.

Common method naming schemes make writing new code faster, and remove some of the
guesswork when it comes to using a new library.

### Write for Readability

Code should be readable and understandable. Methods should clearly describe what they are doing when possible. When impossible, they should be documented/annotated.

Docs and wikis, like this website itself, should not focus on documenting methods and properties, but instead focus on explaining how to use them together. If the method name must be verbose to express it's own purpose, then so be it.