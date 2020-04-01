#!/bin/bash
echo "NOW_GITHUB_COMMIT_REF : $NOW_GITHUB_COMMIT_REF"
echo "NODE_ENV: $NODE_ENV"
pwd
ls -Al


case "$NOW_GITHUB_COMMIT_REF" in
staging)  echo "Building $NOW_GITHUB_COMMIT_REF"
    yarn build:staging
    ;;
master)  echo "Building $NOW_GITHUB_COMMIT_REF"
    yarn build:ropsten
    ;;
*) echo "No build configured for this branch"
   ;;
esac