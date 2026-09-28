#!/usr/bin/env bash
# Builds the site for GitHub Pages and publishes it to the gh-pages branch.
# Usage: npm run deploy:pages
set -euo pipefail
cd "$(dirname "$0")/.."

remote=$(git remote get-url origin)
repo=$(basename -s .git "$remote")
owner=$(basename "$(dirname "$remote")")

NEXT_PUBLIC_BASE_PATH="/$repo" \
NEXT_PUBLIC_SITE_URL="https://$owner.github.io" \
NEXT_TELEMETRY_DISABLED=1 \
  npx next build

cd out
touch .nojekyll
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
  commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
git push -f -q "$remote" gh-pages
rm -rf .git
echo "Published: https://$owner.github.io/$repo/"
