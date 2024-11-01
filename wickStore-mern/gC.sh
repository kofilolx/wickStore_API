#!/bin/bash

read -p "Enter the filename to commit: " filename

# Check if the file exists
if [ ! -f "$filename" ]; then
    echo "File not found: $filename"
    exit 1
fi

read -p "Enter your commit message here: " commit_msg

git add "$filename"
git commit -m "$commit_msg"
git push
