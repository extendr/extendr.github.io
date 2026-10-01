path <- commandArgs(trailingOnly = TRUE)[1]
path <- file.path("r-markdown", paste0(path, ".qmd"))

if (file.exists(path)) {
  stop(path, " already exists.")
}

dir.create(dirname(path), recursive = TRUE, showWarnings = FALSE)

template <- c(
  "---",
  "title:",
  'description: ""',
  "weight: 0",
  "extra:",
  "  short_title:",
  "---"
)
writeLines(template, path)

message("Created ", path)
