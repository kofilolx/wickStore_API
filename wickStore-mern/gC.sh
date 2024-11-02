#!/bin/bash

read -p "Enter your commit message here: " commit_msg

git add .
git commit -m "$commit_msg"
git push
