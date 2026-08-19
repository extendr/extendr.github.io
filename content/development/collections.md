---
title: Using HashMaps
description: ''
weight: 5
---


In addition to vectors and [lists](@/development/extendr-macro.md), extendr supports using Rust's `HashMap` type as function arguments. This allows you to work with R named lists using Rust's hash map data structure.

{% <callout> %}
A `HashMap` is Rust's implementation of a hash table. It stores key-value pairs and provides fast lookup, insertion, and deletion operations. Unlike R's named lists or vectors, HashMaps do not maintain any particular ordering of their elements.
{% </callout> %}

### Basic HashMap Type Mapping

The table below shows common HashMap types that can be used with extendr:

| R type                          | Rust type                    | Description                          |
|---------------------------------|------------------------------|--------------------------------------|
| `list(a = 1L, b = 2L)`          | `HashMap<String, i32>`       | Named list with integer values       |
| `list(a = 1.0, b = 2.0)`        | `HashMap<String, f64>`       | Named list with double values        |
| `list(a = "x", b = "y")`        | `HashMap<String, String>`    | Named list with character values     |
| `list(a = TRUE, b = FALSE)`     | `HashMap<String, bool>`      | Named list with logical values       |
| `list(a = list(), b = 1)`       | `HashMap<String, Robj>`      | Named list with mixed types          |

{% <callout type="warning"> %}
There are two important behaviors to be aware of when using HashMaps with R lists:

1.  **Unordered**: HashMaps do not maintain insertion order. When you convert a HashMap back to an R list using `List::from_hashmap()`, the order of elements may differ from the original input.

2.  **Duplicate Names**: If an R list contains duplicate names (e.g., `list(x = 1, x = 2)`), only the last value will be retained in the HashMap. In this example, the HashMap would contain `("x", 2)`.
    {% </callout> %}

### Using HashMaps in Functions

To use a HashMap in your extendr functions, you need to import `std::collections::HashMap` and specify it as a function argument type. Here's a simple example that takes a named list of integers:

``` rust
use std::collections::HashMap;

#[extendr]
fn test_hm_i32(mut x: HashMap<String, i32>) -> List {
    x.insert("inserted_value".to_string(), 314);
    List::from_hashmap(x).unwrap()
}
```

This function accepts a named list of integers, adds a new key-value pair, and returns the modified list back to R using `List::from_hashmap()`.

``` r
test_hm_i32(list(a = 1L, b = 2L, c = 3L))
```

``` output
$a
[1] 1

$b
[1] 2

$c
[1] 3

$inserted_value
[1] 314
```

Notice that the order of elements in the returned list may differ from the input order due to HashMap's unordered nature.

### Working with Mixed Types

When working with named lists that contain different types of values, use `HashMap<String, Robj>` to accept any R object:

``` rust
use std::collections::HashMap;

#[extendr]
fn test_hm_string(mut x: HashMap<String, Robj>) -> List {
    x.insert("inserted_value".to_string(), List::new(0).into());
    List::from_hashmap(x).unwrap()
}
```

``` r
test_hm_string(
  list(
    a = 1L,
    b = "hello",
    c = c(1.0, 2.0, 3.0)
  )
)
```

``` output
$a
[1] 1

$inserted_value
list()

$c
[1] 1 2 3

$b
[1] "hello"
```

### Custom Types with TryFrom

Similar to the examples in the [`serde` integration guide](@/development/serde-integration.md), you can use HashMaps with custom types by implementing the `TryFrom<Robj>` trait. This is particularly useful when you want to work with complex data structures.

Here's an example using a custom `Point` struct:

``` rust
#| code-fold: true
#| code-summary: "View TryFrom trait implementations"
use std::collections::HashMap;

struct Point {
    x: f64,
    y: f64,
}

impl TryFrom<Robj> for Point {
    type Error = Error;

    fn try_from(value: Robj) -> std::result::Result<Self, Self::Error> {
        let inner_vec = Doubles::try_from(value)?;
        let x: f64 = inner_vec[0].0;
        let y: f64 = inner_vec[1].0;
        Ok(Point { x, y })
    }
}

impl From<Point> for Doubles {
    fn from(value: Point) -> Self {
        Doubles::from_values([value.x, value.y])
    }
}

impl From<Point> for Robj {
    fn from(value: Point) -> Self {
        Robj::from(Doubles::from(value))
    }
}
```

``` rust
#[extendr]
fn test_hm_custom_try_from(mut x: HashMap<&str, Point>) -> List {
    x.insert("inserted_value", Point { x: 3.0, y: 0.1415 });
    List::try_from(x).unwrap()
}
```

This function accepts a named list where each element is a numeric vector of length 2, which gets converted to a `Point` struct:

``` r
test_hm_custom_try_from(
  list(
    origin = c(0.0, 0.0),
    point_a = c(1.0, 2.0),
    point_b = c(3.0, 4.0)
  )
)
```

``` output
$origin
[1] 0 0

$point_a
[1] 1 2

$point_b
[1] 3 4

$inserted_value
[1] 3.0000 0.1415
```

## See Also

- [`serde` Integration](@/development/serde-integration.md) - Working with custom structs and `TryFrom`
- [Rust's HashMap documentation](https://doc.rust-lang.org/std/collections/struct.HashMap.html) - Official Rust documentation
