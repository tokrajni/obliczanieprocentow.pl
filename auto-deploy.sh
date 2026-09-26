#!/bin/bash

echo "🚀 Deploying ..."

# Step 1: Pull changes from the repository
echo "+----------------------+"
echo "| Pulling changes ... |"
echo "+----------------------+"
git reset --hard
git pull

# Step 2: Minify files
echo "+------------------------+"
echo "| Minifying HTML/CSS/JS |"
echo "+------------------------+"

# Minify HTML files
find . -name "*.html" -exec sh -c '
  for file do
    html-minifier --collapse-whitespace --remove-comments --minify-css true --minify-js true -o "$file" "$file"
    echo "Minified $file"
  done
' sh {} +

# Minify CSS files
find . -name "*.css" ! -name "*.min.css" -exec sh -c '
  for file do
    cleancss -o "$file" "$file"
    echo "Minified $file"
  done
' sh {} +

# Minify JS files
find . -name "*.js" ! -name "*.min.js" -exec sh -c '
  for file do
    terser "$file" -c -m -o "$file"
    echo "Minified $file"
  done
' sh {} +

# Optional: Restart your server or service
# echo "+----------------------+"
# echo "| Restarting service...|"
# echo "+----------------------+"
# systemctl restart your-service-name

echo "+----------------------+"
echo "| Deployment complete! ✅ |"
echo "+----------------------+"