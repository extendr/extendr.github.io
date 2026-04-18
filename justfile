# Create a new blog post
new-blog title:
    #!/bin/zsh
    set -e

    # Get today's date in YYYY-MM-DD format
    date=$(date +%Y-%m-%d)

    # Convert title to kebab-case (lowercase, replace spaces with hyphens)
    name=$(printf '%s' "{{ title }}" | \
        tr '[:upper:]' '[:lower:]' | \
        sed 's/[^a-z0-9 ]//g' | \
        tr ' ' '-' | \
        sed 's/-\+/-/g' | \
        sed 's/^-\|-$//' \
    )

    # Create directory
    dir="blog/posts/${date}-${name}"
    mkdir -p "$dir"

    # Copy template and update frontmatter
    cp blog/_post-template.qmd "$dir/index.qmd"
    sed -i '' "s/title: \"\"/title: \"{{ title }}\"/" "$dir/index.qmd"
    sed -i '' "s/date: \"\"/date: \"$date\"/" "$dir/index.qmd"

    echo "Created blog post: $dir"
