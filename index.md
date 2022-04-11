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

On R's side, users can access to the above Rust functions as follows:

``` r
# call function
aux_func()

# create Person object
p <- Person$new()
p$set_name("foo")
p$name()   # "foo" is returned
```

The `extendr_module!` macro lists the module name and exported functions
and interfaces.

This library aims to provide an interface that will be familiar to
first-time users of Rust or indeed any compiled language.

Anyone who knows the R library should be able to write R extensions.

## Wrappers for R types

Extendr provides a number of wrappers for R types. These fall into
three categories, scalar types such as a single integer, vector
types which are an array of a scalar type and linked list
types used to represent R code and call arguments.

### Scalar types

R type|Extendr wrapper|Deref type: `&*object`
------|---------------|----------------------
`Any`|`extendr_api::robj::Robj`|N/A
`character`|`extendr_api::wrapper::Rstr`|N/A
`integer`|`extendr_api::wrapper::Rint`|N/A
`double`|`extendr_api::wrapper::Rfloat`|N/A
`complex`|`extendr_api::wrapper::Rcplx`|N/A
`extptr`|`extendr_api::wrapper::ExternalPtr<T>`|`&T`

### Vector types

R type|Extendr wrapper|Deref type: `&*object`
------|---------------|----------------------
`integer`|`extendr_api::wrapper::Integer`|`&[Rint]`
`double`|`extendr_api::wrapper::Doubles`|`&[Rfloat]`
`logical`|`extendr_api::wrapper::Logical`|`&[Rbool]`
`complex`|`extendr_api::wrapper::Complexes`|`&[Rcplx]`
`string`|`extendr_api::wrapper::Strings`|`&[Rstr]`
`list`|`extendr_api::wrapper::List`|`&[Robj]`
`data.frame`|`extendr_api::wrapper::Dataframe<T>`|`&[Robj]`
`expression`|`extendr_api::wrapper::Expression`|`&[Lang]`

### Linked list types
`pairlist`|`extendr_api::wrapper::Pairlist`|N/A
`lang`|`extendr_api::wrapper::Lang`|N/A

## Examples

### Returning lists and strings.

```rust
use extendr_api::wrapper::{List, Strings};
use extendr_api::list;

fn get_strings() -> Strings {
    Strings::from_values(
        (0..10)
        .map(|i| format!("number {}", i))
    )
}

fn get_named_list() -> List {
    list!(x=1, y="xyz", z=())
}

fn get_unnamed_list() -> List {
    List::from_values(0..10)
}
```

### Returning scalars

```rust
use extendr_api::scalar::{Rint, Rfloat};

// for .na()
use extendr_api::CanBeNA;

fn get_int() -> Rint {
    Rint::from(1)
}

fn get_na_int() -> Rint {
    Rint::na()
}

fn get_float() -> Rfloat {
    Rfloat::from(1.0)
}

fn get_na_float() -> Rfloat {
    Rfloat::na()
}
```

### Plotting a PNG file from Rust

```rust
use extendr_api::{test, Result, eval_string, eval_string_with_params};
use extendr_api::{Doubles, R};

fn main() {
    test!{
        let x = Doubles::from_values((0..100).map(|i| i as f64 / 20.0));

        // let y = Doubles::from_values(x.iter().map(|x| x.inner().sin()));
        let y = Doubles::from_values((0..100).map(|i| (i as f64 / 20.0).sin()));

        // Set a PNG device
        R!(r#"png("/tmp/sin_plot.png")"#)?;

        // Plot x and y
        R!("plot({{&x}}, {{&y}})")?;

        // Linear model.
        R!("abline(lm({{y}} ~ {{x}}))")?;

        // Flush the device to the image.
        R!("dev.off()")?;
    }
}

```
