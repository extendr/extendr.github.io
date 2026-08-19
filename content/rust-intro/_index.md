---
title: A Brief Introduction to Rust
description: Learn the basics of Rust programming with this introduction for R developers.
sort_by: weight
weight: 2
extra:
  section_title: Rust Tutorials
---


Want to build Rust powered R packages but don't know where to start? These
tutorials will walk you through the basics of Rust programming using familiar R
concepts.

## Why Rust? 🦀

Unlike *interpreted* languages like R and Python, Rust is a *compiled* language.
That means it can often be much faster and more efficient, similar to other
compiled languages like C or C++. But where those compiled languages can be hard
to use and easy to break, Rust was built to be both safer and easier to work
with. Rust is also designed with developers and developer experience in mind. No
where is this more evident than in the quality of Rust's error messages. The
Rust compiler provides error messages that rival --- or maybe even surpass ---
the quality of tidyverse error messaging.

## Prerequisites

This introduction is designed for **intermediate R developers** who are familiar
with fundamental computing concepts, including data types (like floats,
integers, and booleans), iteration (with `for` and `while` loops, `purrr::map()`
style iterators, and the `apply()` family of functions), control flow, and
functions. Being comfortable with a terminal environment will be helpful, too.

Regardless of whether you meet those prerequisites, you may find it helpful to
freshen up on your R fundamentals by reading or reviewing the following
materials:

- [R for Data Science](https://r4ds.hadley.nz)
- [Hands-On Programming with R](https://rstudio-education.github.io/hopr)
- [Advanced R](https://adv-r.hadley.nz)

As for Rust, a lot of the materials in this brief introduction come from the
official guide, [The Rust Programming
Language](https://doc.rust-lang.org/book/), what Rust developers affectionately
call "The Book."

## Software requirements

This guide assumes that you have Rust {{<version name="rust"/>}} installed. Please
see [Installation Guide](@/installation.md) if you do not. If you are not
yet comfortable with installing Rust, you may find it helpful to try out
examples in this tutorial using the open source [Rust
Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021)
browser app.

## Acknowledgment

These introductory tutorials are based on the [Rust for R
Developers](https://josiahparry.github.io/2025-cascadia-rust-for-r-devs/)
workshop led by Josiah Parry at the 2025 Cascadia R Conference.
