#!/bin/bash
echo "NODE_ENV: $NODE_ENV"
echo "NOW_GITHUB_COMMIT_REF : $NOW_GITHUB_COMMIT_REF"
echo "NOW_GITHUB_DEPLOYMENT: $NOW_GITHUB_DEPLOYMENT"
echo "NOW_GITHUB_COMMIT_REPO: $NOW_GITHUB_COMMIT_REPO"
echo "NOW_GITHUB_COMMIT_ORG: $NOW_GITHUB_COMMIT_ORG"
echo "NOW_GITHUB_REPO: $NOW_GITHUB_REPO"
echo "NOW_GITHUB_COMMIT_SHA: $NOW_GITHUB_COMMIT_SHA"

# Create the build according to the branch name
case "$NOW_GITHUB_COMMIT_REF" in
develop)  echo "Building $NOW_GITHUB_COMMIT_REF"
    yarn build:staging
    ;;
master)  echo "Building $NOW_GITHUB_COMMIT_REF"
    yarn build:production
    ;;
preview)  echo "Building $NOW_GITHUB_COMMIT_REF"
    yarn build:production
    ;;
*) echo "No build configured for this branch. Assuming staging"
    yarn build:staging
    ;;
esac