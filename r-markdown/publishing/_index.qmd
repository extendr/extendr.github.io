---
title: Publishing Rust-powered R Packages
description: Learn how to publish an extendr-based R package to CRAN
sort_by: weight
weight: 1
extra:
  section_title: Publishing
---


This guide covers the steps required to publish an R package that depends on
Rust code via extendr. The primary focus is [CRAN](https://cran.r-project.org/),
which has the strictest requirements for compiled code, vendored dependencies,
and minimum supported toolchain versions. Packages that satisfy CRAN's
requirements should be publishable to most other R repositories with little or
no additional work.

## Software requirements

This guide assumes the following versions of necessary software:

- R: {{<version name="r"/>}}
- Rust: {{<version name="rust"/>}}
- extendr-api: {{<version name="extendr"/>}}
- rextendr {{<version name="rextendr"/>}}

Please see the [Installation Guide](@/installation.md) if you have not already
installed this software.
