+++
title = "Build blazingly fast R packages with Rust" 
description = "extendr provides developer-first tooling and support for publishing to CRAN."

[extra] 
get_started_path = "@/introduction.md"

[[extra.badges]]
href = "https://github.com/extendr/extendr/actions" 
img = "https://github.com/extendr/extendr/workflows/Tests/badge.svg" 
alt = "Github Actions Build Status"

[[extra.badges]]
href = "https://crates.io/crates/extendr-api" 
img = "https://img.shields.io/crates/v/extendr-api.svg" 
alt = "Crates.io"

[[extra.badges]]
href = "https://docs.rs/extendr-api"
img = "https://docs.rs/extendr-api/badge.svg" 
alt = "Documentation"

[[extra.badges]] 
href = "https://opensource.org/licenses/MIT" 
img = "https://img.shields.io/badge/License-MIT-yellow.svg" 
alt = "License: MIT" 
+++

```r
# setup R package
usethis::create_package("helloextendr")

# add extendr scaffolding
rextendr::use_extendr()

# build and document package
devtools::document()

# load package
devtools::load_all()

# call rust function
hello_world()
```

<div class="mt-4">

    [1] "Hello world!"

</div>
