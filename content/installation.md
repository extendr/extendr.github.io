---
title: Installation
description: Get setup for development with extendr.
weight: 1
extra:
  toc_max_level: 2
---


{% <callout> %}  
This page does not try to be a comprehensive installation guide. Instead, it
provides a quick overview of the software you need to get started with extendr.
For more detailed instructions, please refer to the official documentation of
each software package.  
{% </callout> %}

## Required software

<div class="flex flex-col gap-6 [&_h3]:text-lg [&_h3]:lg:text-xl">

<div class="group/item bg-card flex flex-row items-center gap-6 p-3 border border-border">

<div class="basis-1/6 [&_img]:w-full">

<img src="/images/cuddlyferris.svg" alt="Rust language logo"/>

</div>

<div class="[&_h3]:mt-0 [&_p]:mb-0 basis-5/6">

### Rust <span class="text-sm text-muted-foreground">\[[docs](https://rust-lang.org/learn/)\]</span>

Follow the [rustup installation
instructions](https://www.rust-lang.org/tools/install) to install Rust. Note
that the current minimum supported Rust version (msrv) in **extendr** is
{{<version name="rust"/>}}. This is to ensure CRAN compliance. Windows users will
also need to install the GNU toolchain as it matches Rtools. This can be done
via rustup in the terminal: `rustup target add x86_64-pc-windows-gnu`.

</div>

</div>

<div class="group/item flex flex-row items-center gap-6 p-3">

<div class="basis-1/6 [&_img]:w-full">

<img src="/images/Rlogo.svg" alt="R language logo"/>

</div>

<div class="[&_h3]:mt-0 [&_p]:mb-0 basis-5/6">

### R <span class="text-sm text-muted-foreground">\[[docs](https://www.r-project.org/)\]</span>

We recommend using a moderately new version of R (\>= 4.2), which you can
download from [CRAN](https://cran.r-project.org/). You can check your current R
version with `getRversion()`.

</div>

</div>

<div class="group/item bg-card flex flex-row items-center gap-6 p-3 border border-border">

<div class="basis-1/6 [&_img]:w-full">

<img src="/images/rextendr-logo.png" alt="rextendr"/>

</div>

<div class="[&_h3]:mt-0 [&_p]:mb-0 basis-5/6">

### rextendr <span class="text-sm text-muted-foreground">\[[docs](https://extendr.rs/rextendr/)\]</span>

The R package `rextendr` will help you setup the necessary scaffolding for
extendr projects. It also provides tools for documenting Rust functions and
objects. To install the release version, use `install.packages("rextendr")`. For
the development version, use `pak::pak("extendr/rextendr")`. You can then run
`rextendr::rust_sitrep()` to check your Rust installation.

</div>

</div>

</div>

## Recommended software

<div class="flex flex-col gap-6 [&_h3]:text-lg [&_h3]:lg:text-xl">

<div class="group/item flex flex-row items-center gap-6 p-3">

<div class="basis-1/6 [&_img]:w-full">

<!-- ![rig logo](/images/rig.svg) -->

</div>

<div class="[&_h3]:mt-0 [&_p]:mb-0 basis-5/6">

### rig <span class="text-sm text-muted-foreground">\[[docs](https://rust-analyzer.github.io/)\]</span>

The R installation manager, [rig](https://github.com/r-lib/rig), is a cli tool
that makes installing R a breeze. With rig, installing R is as simple as
`rig add release`.

</div>

</div>

<div class="group/item bg-card flex flex-row items-center gap-6 p-3 border border-border">

<div class="basis-1/6 [&_img]:w-full">

<img src="/images/ra-logo-square.svg" alt="rust-analyzer logo"/>

</div>

<div class="[&_h3]:mt-0 [&_p]:mb-0 basis-5/6">

### rust-analyzer <span class="text-sm text-muted-foreground">\[[docs](https://rust-analyzer.github.io/)\]</span>

While this is optional, we cannot recommend it enough. If you use [Visual Studio
Code (VS Code)](https://code.visualstudio.com/download) or a similar IDE, the
[rust-analyzer](https://rust-analyzer.github.io/) will provide you type hinting
and auto-completion suggestions. It is **very** helpful!

</div>

</div>

</div>
