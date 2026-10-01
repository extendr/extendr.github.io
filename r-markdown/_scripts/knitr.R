path <- commandArgs(trailingOnly = TRUE)[1]

files <- if (path == ".") {
  out <- list.files("r-markdown", pattern = "\\.qmd$", recursive = TRUE)
  # do not re-render blog posts unless they are passed explicitly in path
  out[!grepl("^blog/.+/", out)]
} else {
  path
}

library(rextendr)

knitr::render_markdown()
knitr::knit_hooks$set(document = function(x) {
  x <- strsplit(paste(x, collapse = "\n"), "\n")[[1]]

  # wrap code blocks with filenames in '<div class="code-with-filename"> ... </div>'
  rx <- '^```\\s*\\{?\\.?([\\w-]+)\\s*\\{?filename="([^"]+)"\\}?\\s*$'
  dx <- '<div class="code-with-filename">\n\n**\\2**\n\n``` \\1'
  for (i in rev(grep(rx, x, perl = TRUE))) {
    end <- i + grep("^```\\s*$", x[-seq_len(i)])[1]
    x[end] <- "```\n\n</div>"
    x[i] <- sub(rx, dx, x[i], perl = TRUE)
  }

  # collapse runs of blank lines
  gsub("\n{3,}", "\n\n", paste(x, collapse = "\n"))
})

knitr::opts_chunk$set(
  comment = "",
  "class-output" = "output",
  "class-error" = "output",
  "class-warning" = "output",
  "class-message" = "output"
)

options(knitr.progress.simple = TRUE)

for (file in files) {
  output <- xfun::with_ext(file.path("content", file), "md")
  dir.create(dirname(output), recursive = TRUE, showWarnings = FALSE)
  knitr::knit(file.path("r-markdown", file), output, envir = new.env())
}
