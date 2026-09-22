---
title: Introduction
description: Write Rust code and call it in R!
weight: 2
---


This is the website for `extendr`, a developer-first utility for building R
packages that call Rust code. With extendr, you can write Rust code like this:

<div class="code-with-filename">

**lib.rs**

``` rust
use extendr_api::prelude::*;

/// Return string `"Hello world!"` to R.
/// @param name A name to greet.
/// @export
#[extendr]
fn hello(name: String) -> String {
    format!("Hello {name}!")
}

// Macro to generate exports.
// This ensures exported functions are registered with R.
// See corresponding C code in `entrypoint.c`.
extendr_module! {
    mod helloextendr;
    fn hello;
}
```

</div>

and then in R you can call it like this:

``` r
hello("world")
```

``` output
[1] "Hello world!"
```

We call the whole project extendr, of course, but it isn't just one thing. It's
actually a *suite* of software tools. On the Rust side, extendr consists of
several crates, but you will typically interact with `extender-api`, a
developer-facing crate providing a host of data structures, traits, and macros —
like `#[extendr]` in the above example — that make it easy to write Rust code to
call in R. On the R side, there is `rextendr`, an R package that works sort of
like `usethis`, sort of like `devtools`, automating many of the repetitive tasks
required to setup or scaffold your project, allowing you to focus on the
important business of writing Rust and R code.

<div class="w-fit mx-auto my-4 md:my-8 flex flex-row items-center gap-2">
  <a href="https://extendr.github.io/extendr/extendr_api/" class="bc btn-lg-outline h-auto p-2 md:p-4 font-mono md:text-[1.5em]">
    <span class="iconify mdi--language-rust"></span>
    extendr-api
  </a>
  <p class="text-gray-600 dark:text-gray-300 m-0 md:text-[1.5em]">&harr;</p>
  <a href="https://extendr.github.io/rextendr/" class="bc btn-lg-outline h-auto p-2 md:p-4 font-mono md:text-[1.5em]">
    rextendr
    <span class="iconify mdi--language-r"></span>
  </a>
</div>

So, when you go to setup a repository to develop a Rust-powered R package, you
will reach for rextendr first. Then, when you start writing Rust code for your R
package, you will turn to extendr-api.

## Create an R package

The process of building a Rust-powered R package with extendr boils down to
four simple steps:

1.  Setup R package with `usethis::create_package()`.
2.  Add extendr scaffolding with `rextendr::use_extendr()`.
3.  Write Rust code and export it with `extendr-api`.
4.  Build and document with `devtools::document()`.

Once you have worked through those steps, you can then load your package with
`devtools::load_all()` and start using your package! Here is an example that
loads the above `lib.rs` into your package at `src/rust/src/lib.rs`, compiles
it, generates wrappers and documentation, and then calls the `hello()` function
from R:

``` r
# setup R package
usethis::create_package("helloextendr")

# add extendr scaffolding
rextendr::use_extendr()

# build and document package
devtools::document()

# load package
devtools::load_all()

# call rust function
hello("world")
```

``` output
[1] "Hello world!"
```

A Rust-powered R package in one fell swoop! Now, if you want to see a complete
example of an actual R package, check out the [heck example](@/example.md).

## What's next?

- If you do not already have Rust, R, and rextendr, check out our [Installation guide](@/installation.md).
- Want to learn more about Rust? Check out our [Rust tutorials](@/rust-intro/_index.md).
- Ready to dive in to package development? You will want to consult our
  [Development guide](@/development/_index.md).
- Have a Rust-powered package and want to publish it to CRAN? Jump to our
  [Publishing recommendations](@/publishing/_index.md).
- Here to join the extendr team and contribute to new features and
  maintenance? Have a look at our [Guide for contributors](@/contributing/_index.md).
