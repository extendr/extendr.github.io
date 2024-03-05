# extendr.github.io

This repository contains a dummy R project which allows us to
build a website for Extendr using `pkgdown`.

To build the site locally:

```r
remotes::install_github("r-lib/pkgdown")
devtools::install()
pkgdown::build_site()
```

There is a github action that builds the site and deploys to
the `gh-pages` branch when pushing to `main`.

On linux, you will also need:

```shell
sudo apt install fontconfig libfreetype2-dev libfontconfig1-dev libharfbuzz-dev libfribidi-dev pandoc
```
