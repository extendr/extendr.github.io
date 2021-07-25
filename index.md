# extendr - A safe and user friendly R extension interface using Rust.

[![Github Actions Build Status](https://github.com/extendr/extendr/workflows/Tests/badge.svg)](https://github.com/extendr/extendr/actions)
[![Crates.io](https://img.shields.io/crates/v/extendr-api.svg)](https://crates.io/crates/extendr-api)
[![Documentation](https://docs.rs/extendr-api/badge.svg)](https://docs.rs/extendr-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Extendr is a Rust extension mechanism for R

The following code illustrates a simple structure trait
which is written in Rust. The data is defined in the `struct`
declaration and the methods in the `impl`.

```rust
use extendr_api::prelude::*;

struct Person {
    pub name: String,
}

#[extendr]
impl Person {
    fn new() -> Self {
        Self { name: "".to_string() }
    }

    fn set_name(&mut self, name: &str) {
        self.name = name.to_string();
    }

    fn name(&self) -> &str {
        self.name.as_str()
    }
}

#[extendr]
fn aux_func() {
}


// Macro to generate exports
extendr_module! {
    mod classes;
    impl Person;
    fn aux_func;
}
```

The `#[extendr]` attribute causes the compiler to generate
wrapper and registration functions for R which are called
when the package is loaded.

The `extendr_module!` macro lists the module name and exported functions
and interfaces.

This library aims to provide an interface that will be familiar to
first-time users of Rust or indeed any compiled language.

Anyone who knows the R library should be able to write R extensions.

## Goals of the project

Where possible, we convert parameters to Rust native objects on entry
to a function. This makes the wrapped code clean and dependency free.
We aim to support writing idiomatic Rust code, with a minimum amount
of markup.

```rust
#[extendr]
pub fn my_sum(v: &[f64]) -> f64 {
    v.iter().sum()
}
```

You can interact in more detail with R objects using the RObj
type which wraps the native R object type. This supports a large
subset of the R internals functions, but wrapped to prevent
accidental segfaults and failures.
