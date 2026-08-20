---
title: CRAN's Rust versions
description: ''
weight: 5
extra:
  short_title: CRAN MSRV
---


CRAN does not coordinate versions of Rust across build machines, so it can be
challenging to ensure your package builds on *any* CRAN machine. The only sure
fire way to do that is to ensure that your package builds under the lowest
version of Rust currently supported by a CRAN build machine, that being the
minimal supported Rust version (or MSRV) on CRAN. That includes your package's
Rust dependencies, too. Any crate or feature you list in your manifest must also
fall under CRAN's MSRV.

The below table reports CRAN versions per check flavor based on the
[check results](https://cran.r-project.org/web/checks/check_results_fio.htm) of
the extendr package [`{fio}`](https://albersonmiranda.github.io/fio/).

**CRAN's MSRV** is 1.91.1.

| Check flavor                      | rustc  | cargo  |
|:----------------------------------|:-------|:-------|
| r-oldrel-macos-arm64              | 1.91.1 | 1.91.1 |
| r-devel-windows-x86_64            | 1.92.0 | 1.92.0 |
| r-release-windows-x86_64          | 1.92.0 | 1.92.0 |
| r-oldrel-windows-x86_64           | 1.92.0 | 1.92.0 |
| r-release-macos-arm64             | 1.93.0 | 1.93.0 |
| r-release-macos-x86_64            | 1.93.0 | 1.93.0 |
| r-oldrel-macos-x86_64             | 1.93.0 | 1.93.0 |
| r-devel-linux-x86_64-debian-clang | 1.95.0 | 1.95.0 |
| r-devel-linux-x86_64-debian-gcc   | 1.95.0 | 1.95.0 |
| r-patched-linux-x86_64            | 1.95.0 | 1.95.0 |
| r-release-linux-x86_64            | 1.95.0 | 1.95.0 |
| r-devel-linux-x86_64-fedora-clang | 1.97.1 | 1.97.1 |
| r-devel-linux-x86_64-fedora-gcc   | 1.97.1 | 1.97.1 |
