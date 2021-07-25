# Getting started

Extendr is available on [crates.io](https://crates.io/crates/extendr-api).

Simply add this line to the `[dependencies]` section of a rust crate.
You will then be able to call R code from Rust.

```toml
[dependencies]
extendr-api = "0.2"
```
## Installation - R

There are two ways you can use the extendr API from R. First, you can use the [rextendr](https://extendr.github.io/rextendr/) package to call individual Rust functions from an R session. Second, you can write an R package that uses compiled Rust code, see the [helloextendr](https://github.com/extendr/helloextendr) repo for a minimal example.
