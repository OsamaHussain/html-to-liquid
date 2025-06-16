#!/bin/bash
set -e  # Stop script execution on any error

echo "🚀 Deployment started..."

# Ensure the repository is clean before pulling latest changes
echo "⚠️ Checking for unstaged changes..."
if [[ $(git status --porcelain) ]]; then
  echo "⚠️ Unstaged changes detected! Resetting repository..."
  git reset --hard HEAD
  git clean -fd
fi

# Fetch and reset to the latest master branch from GitHub
echo "📦 Fetching latest code..."
git fetch origin master || { echo "❌ ERROR: Git fetch failed!"; exit 1; }

echo "🔄 Resetting to latest master..."
git reset --hard origin/master || { echo "❌ ERROR: Git reset failed!"; exit 1; }

echo "📂 Pulling latest changes..."
git pull origin master || { echo "❌ ERROR: Git pull failed!"; exit 1; }
echo "✅ New changes copied to server!"

# Install dependencies (force to avoid conflicts)
echo "📦 Installing Dependencies..."
npm install --force --yes || { echo "❌ ERROR: npm install failed!"; exit 1; }

# Build the application
echo "⚙️ Creating master Build..."
npm run build || { echo "❌ ERROR: Build failed!"; exit 1; }

# Reload PM2 process
echo "♻️ Restarting PM2..."
pm2 restart html-to-liquid || { echo "❌ ERROR: PM2 reload failed!"; exit 1; }

echo "✅ Deployment Finished Successfully!"
