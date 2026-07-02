#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This command must run inside a git repository."
  exit 1
fi

message="${1:-chore: local checkpoint}"

if [[ -z "$(git status --porcelain)" ]]; then
  echo "No local changes to checkpoint."
  exit 0
fi

git add -A
git commit -m "$message"

echo "Local checkpoint created."
echo "Nothing was pushed."
