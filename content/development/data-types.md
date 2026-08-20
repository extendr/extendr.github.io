---
title: R to Rust type mapping
description: ''
weight: 3
---


extendr is allows us to create a bridge between R and Rust. When writing a function in Rust that is intended to be called from R, it is important that the input types be R types. There are many types of objects in R (almost) all of which are available in extendr via a wrapper struct.

The below lists the extendr structs that wrap R object types. These types can be used as function arguments or return values.

## Scalar types

R has no concept of scalar values whereas Rust does. Rust does not have the concept of an NA. As such, we have types to represent scalar values in R. The below is how they are mapped.

| R              | Rust           | extendr  |
|----------------|----------------|----------|
| `integer(1)`   | `i32`          | `Rint`   |
| `logical(1)`   | `bool`         | `Rbool`  |
| `double(1)`    | `f64`          | `Rfloat` |
| `complex(1)`   | `Complex<f64>` | `Rcplx`  |
| `character(1)` | `String`       | `Rstr`   |

## Vector types

Everything in R is a vector. In Rust, we have to point to R's owned vector types rather than use Rust's native `Vec` collection. These are mapped accordingly:

| R             | extendr     | scalar   | C API     |
|---------------|-------------|----------|-----------|
| `integer()`   | `Integers`  | `Rint`   | `INTSXP`  |
| `double()`    | `Doubles`   | `Rfloat` | `REALSXP` |
| `logical()`   | `Logicals`  | `Rbool`  | `LGLSXP`  |
| `complex()`   | `Complexes` | `Rcplx`  | `CPLXSXP` |
| `character()` | `Strings`   | `Rstr`   | `STRSXP`  |
| `raw()`       | `Raw`       | `&[u8]`  | `RAWSXP`  |
| `list()`      | `List`      | `Robj`   | `VECSXP`  |

## Using Rust library types vs R-native types

Whenever possible use the extendr wrapper type. Accepting or returning a `Vec<T>` requires additional allocations. This will always incur memory usage overhead. In some cases, the overhead will be minimal and tolerable. However, if you can use the Rust type instead, always do.

## Other types

- [`Environment`](https://extendr.github.io/extendr/extendr_api/wrapper/environment/struct.Environment.html) (`ENVSXP`)
- [`Expressions`](https://extendr.github.io/extendr/extendr_api/wrapper/expr/struct.Expressions.html) (`EXPRSXP`)
- [`ExternalPtr`](https://extendr.github.io/extendr/extendr_api/wrapper/externalptr/struct.ExternalPtr.html) (`EXTPTRSXP`)
- [`Function`](https://extendr.github.io/extendr/extendr_api/wrapper/function/struct.Function.html) (`CLOSSXP`)
- [`Language`](https://extendr.github.io/extendr/extendr_api/wrapper/lang/struct.Language.html) (`LANGSXP`)
- [`RArray`](https://extendr.github.io/extendr/extendr_api/wrapper/matrix/struct.RArray.html)
- [`Pairlist`](https://extendr.github.io/extendr/extendr_api/wrapper/pairlist/struct.Pairlist.html) (`LISTSXP`)
- [`Promise`](https://extendr.github.io/extendr/extendr_api/wrapper/promise/struct.Promise.html) (`PROMSXP`)
- [`S4`](https://extendr.github.io/extendr/extendr_api/wrapper/s4/struct.S4.html) (`S4SXP`)
