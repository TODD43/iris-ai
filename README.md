#!/usr/bin/env bash
set -e
REPO_URL=$1

if [ -z "$REPO_URL" ]; then
  echo "Error: Please provide a target GitHub repository URL."
  echo "Usage: ./scripts/push-to-github.sh <GITHUB_REPO_URL>"
  exit 1
fi

git init
git add .
git commit -m "feat: Initialize IRIS AI 3D beauty mirror and coaching platform"
git branch -M main
git remote add origin "$REPO_URL" || git remote set-url origin "$REPO_URL"
git push -u origin main --force

echo "Successfully pushed codebase to $REPO_URL"
