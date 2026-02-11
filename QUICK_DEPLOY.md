# Quick AWS Amplify Deployment Guide

## ✅ Step 1: Code is Ready
Your code is committed to Git locally!

## 🔐 Step 2: Push to GitHub (Authentication Required)

The `git push` command is waiting for your GitHub credentials. You have two options:

### Option A: GitHub Personal Access Token (Recommended)
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Wizard Arcane Deploy"
4. Select scopes: Check **`repo`** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. In your terminal, when prompted:
   - Username: `OskarProp`
   - Password: Paste your token

### Option B: GitHub CLI (Easier)
```bash
# Install GitHub CLI if you don't have it
brew install gh

# Authenticate
gh auth login

# Then push
git push -u origin main
```

## 🚀 Step 3: Deploy with AWS Amplify

Once your code is on GitHub:

1. **Go to AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. Click **"New app"** → **"Host web app"**
3. Select **"GitHub"** and click **"Continue"**
4. Authorize AWS Amplify to access your GitHub
5. Select repository: **`OskarProp/wizard-score-keeper`**
6. Select branch: **`main`**
7. Click **"Next"**
8. Build settings (should auto-detect):
   - Build command: `npm run build`
   - Output directory: `dist`
9. Click **"Next"** then **"Save and deploy"**

**Your app will be live in 2-3 minutes!** 🎉

You'll get a URL like: `https://main.xxxxx.amplifyapp.com`

---

## Need Help?
- Check your terminal for the git push authentication prompt
- Or use GitHub CLI for easier authentication
