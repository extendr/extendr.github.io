library(colorspace)

tint <- function(hex, pct) {
  hex(mixcolor(1 - pct, hex2RGB(hex), hex2RGB("#FFFFFF")))
}

rust_colors <- c(
  dark_blue = "#1E2650",
  orange = "#D34516",
  blue = "#28607F",
  silver = "#67737A",
  green = "#61784D"
)

pcts <- c(`100%` = 1.00, `75%` = 0.75, `50%` = 0.50, `25%` = 0.25)

rust_colors_m <- outer(rust_colors, pcts, tint)

cat(c(t(rust_colors_m)))
