changelog_url <- file.path(
  "https://raw.githubusercontent.com",
  "extendr",
  "extendr",
  "master",
  "CHANGELOG.md"
)

download.file(
  changelog_url,
  "content/CHANGELOG.md",
  mode = "wb"
)
