## CLAUDE.md

This is the source of the extendr project's website.

- `user-guide` Is the user guide for using `extendr-api`
- `blog` is the source code for blogs for the extendr-project
- Code chunks for extendr should look like:

````
```{extendrsrc engine.opts = list(use_dev_extendr=TRUE)}
#[extendr]
fn fx() {}
```
````

## User guide

The user guide is a friendly introduction to the `extendr-api` crate. It is written using concise language.

- Each entry for the user guide is given a title.
- The first paragaph gives a motivation of the functionality we are covering.
- It then introduces the feature.
- The second paragraph covers basic usage with an example.
- The next section covers advanced usage with one or more examples.

The user-guide/serde-integration.qmd is the best example. Try to emulate this style.

### writing style

- use of second person is fine, but you cannot write about one's intention in the second person.
- Banned phrases ❌:
  - "you want to"
  - "you need to"
- never use `print()` to print an R object
