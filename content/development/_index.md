---
title: Developing Rust-powered R Packages
description: Learn how to develop an R package that calls Rust code with extendr
sort_by: weight
weight: 1
extra:
  section_title: Development
---


This guide focuses on developing R packages that call Rust code. A basic
understanding of Rust and R package development is assumed. If you are new to
Rust, you might find it helpful to start with our [Rust Tutorials](@/rust-intro/_index.md).

## What's *not* in this guide?

This guide is not a comprehensive introduction to Rust. It's also not a
comprehensive guide to R package development. Better resources exist for both,
notably ["The Book"](https://doc.rust-lang.org/stable/book/) for writing Rust
and [R Packages (2e)](https://r-pkgs.org/) for developing R packages. For this
guide, we focus on extendr-specific tools, referencing other ideas only where
necessary. We will also point you to relevant external resources as needed.

## Software requirements

This guide assumes the following versions of necessary software:

- R: {{<version name="r"/>}}
- Rust: {{<version name="rust"/>}}
- extendr-api: {{<version name="extendr"/>}}
- rextendr {{<version name="rextendr"/>}}

Please see the [Installation Guide](@/installation.md) if you have not already
installed this software.
