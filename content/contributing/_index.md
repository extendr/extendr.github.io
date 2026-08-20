---
title: A Guide for Contributors
description: >-
  How to contribute to extendr's Rust crates, the rextendr R package, and this
  documentation site.
sort_by: weight
weight: 1
extra:
  section_title: Contributing
---


The extendr project has three main areas where you can contribute:

**extendr crates** — The core Rust library. This is where the `#[extendr]`
macro, R type bindings, and the Rust API live.
Contributions here require Rust experience. The repository is at
[github.com/extendr/extendr](https://github.com/extendr/extendr).

**rextendr package** — The R package that scaffolds new extendr projects.
Contributions here require R package development experience. The repository is
at [github.com/extendr/rextendr](https://github.com/extendr/rextendr).

**Documentation website** — The site you are reading now. Contributions
here range from fixing typos to writing new guides and tutorials. The
repository is at
[github.com/extendr/extendr.github.io](https://github.com/extendr/extendr.github.io).

## Software requirements

This guide assumes the following versions of necessary software:

- R: {{<version name="r"/>}}
- Rust: {{<version name="rust"/>}}
- extendr-api: {{<version name="extendr"/>}}
- rextendr {{<version name="rextendr"/>}}

Please see [Installation Guide](@/installation.md) if you have not
already installed this software.
