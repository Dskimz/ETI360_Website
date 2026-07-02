#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This command must run inside a git repository."
  exit 1
fi

branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$branch" == "HEAD" ]]; then
  echo "Detached HEAD is not supported. Check out a branch first."
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean."
  echo "Run: npm run checkpoint -- \"your message\""
  exit 1
fi

echo "Running pre-push checks..."
npm run lint -w @eti360/web
npm run build -w @eti360/web

echo "Pushing branch '$branch' to origin..."
git push -u origin "$branch"

echo "Ship complete."
