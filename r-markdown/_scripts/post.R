title <- commandArgs(trailingOnly = TRUE)[1]
date <- format(Sys.Date())

dir <- file.path("r-markdown", "blog", paste0(date, "-", title))
dir.create(dir, recursive = TRUE, showWarnings = FALSE)

path <- file.path(dir, "index.qmd")
template <- paste0(
  c(
    "---",
    "title: %s",
    'date: "%s"',
    "authors: []",
    "taxonomies:",
    "  tags: []",
    "---"
  ),
  collapse = "\n"
)
writeLines(sprintf(template, title, date), path)

message("Created ", path)
