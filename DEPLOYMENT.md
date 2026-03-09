# Vercel Deployment Guide

This guide explains how to deploy the Angular Todo-List app to Vercel (https://www.vercel.com).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step-by-Step Deployment](#step-by-step-deployment)
3. [Configuration Files](#configuration-files)
4. [Verify Deployment](#verify-deployment)
5. [Troubleshooting](#troubleshooting)
6. [Environment Variables](#environment-variables)
7. [Custom Domain](#custom-domain)

---

## Prerequisites

Before deploying to Vercel, ensure you have:

- ✅ A Vercel account (free at https://vercel.com/signup)
- ✅ Git repository (GitHub, GitLab, or Bitbucket)
- ✅ Project pushed to your git repository
- ✅ Node.js 24.14.0+ installed locally
- ✅ npm 11.10.0+ installed locally

### Quick Vercel Account Setup

1. Go to https://vercel.com/signup
2. Sign up with GitHub, GitLab, Bitbucket, or email
3. Verify your email address
4. You're ready to deploy!

---

## Step-by-Step Deployment

### **Option 1: Deploy via Vercel Dashboard (Recommended for Beginners)**

#### 1. Push Project to Git Repository

```bash
# Initialize git repo (if not already done)
cd todo-list
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial Angular todo-list app"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/todo-list-app.git

# Push to main branch
git branch -M main
git push -u origin main
```

#### 2. Connect Repository to Vercel

1. Log in to Vercel Dashboard: https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Select your git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Vercel to access your repositories
5. Find and select the `todo-list-app` repository
6. Click **"Import"**

#### 3. Configure Project Settings

Vercel should auto-detect Angular:
- **Framework Preset**: Angular
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `dist/todo-list` (should be auto-filled)
- **Install Command**: `npm install` (default)

If auto-detection doesn't work, manually set these values.

#### 4. Deploy

1. Click **"Deploy"** button
2. Wait for deployment to complete (usually 1-2 minutes)
3. You'll see a "Congratulations! Deployed Successfully" message
4. Click on the deployment URL to visit your live app

---

### **Option 2: Deploy via Vercel CLI (For Power Users)**

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

This opens a browser to authenticate you with Vercel.

#### 3. Deploy from Project Directory

```bash
cd todo-list
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope do you want to deploy to?** → Select your account
- **Link to existing project?** → No (first time)
- **What's your project's name?** → `todo-list` or preferred name
- **In which directory is your code located?** → `.` (current directory)
- **Want to override the settings?** → No (uses vercel.json)

#### 4. View Your Deployment

```bash
vercel --prod
```

This ensures deployment to production (not preview).

---

## Configuration Files

The project includes two key deployment files:

### **vercel.json**
```json
{
  "version": 2,
  "builds": [{ ... }],
  "routes": [ ... ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist/todo-list",
  "framework": "angular"
}
```

**What it does**:
- Tells Vercel how to build the Angular app
- Specifies the output directory (dist/todo-list)
- Configures routing for Single Page Application (SPA)
- **Important**: The `routes` section handles client-side routing:
  - Redirects all requests to `index.html` (angular router handles client-side routing)
  - Ensures page refreshes work correctly

### **.vercelignore**
Excludes unnecessary files from deployment:
- `node_modules/` - Reinstalled on Vercel
- `src/**/*.spec.ts` - Test files not needed in production
- `.git/`, `.vscode/`, `.idea/` - Development tools
- Documentation files that aren't part of the app

This reduces deployment size and speeds up uploads.

---

## Verify Deployment

After deployment, verify everything works:

### ✅ Check Deployment Status
1. Go to Vercel Dashboard
2. Select your project
3. View deployment status and logs
4. Click the deployment URL to test

### ✅ Test App Functionality
- Open the live URL from Vercel
- Add a todo item
- Complete a todo (checkbox)
- Delete a todo (✕ button)
- Test filter buttons (All, Active, Completed)
- Refresh the page - todos should persist (localStorage)

### ✅ Check Performance
- Open browser DevTools (F12)
- Go to **Network** tab
- Reload page
- Check bundle sizes and load times

### ✅ View Deployment Logs
In Vercel Dashboard:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. View build logs and any errors

---

## Troubleshooting

### **Deployment Failed**

**Check Build Logs**:
1. Go to Vercel Dashboard → Deployments
2. Click the failed deployment
3. Expand "Build Logs" to see the error
4. Common errors:
   - Missing dependencies → Run `npm install` before pushing
   - Wrong output directory → Verify `dist/todo-list` exists
   - TypeScript errors → Run `npm run build` locally to test

**Try Local Build**:
```bash
npm run build
```
If it fails locally, it will fail on Vercel too.

---

### **App Crashes After Deployment**

**Issues**:
1. **Routing Not Working** - Make sure `vercel.json` has correct routes
2. **localStorage Not Working** - Verify browser allows localStorage (not private mode)
3. **Console Errors** - Open DevTools (F12) and check Console tab

**Fix**:
1. Check Vercel logs for errors
2. Test locally with `npm start`
3. Rebuild and redeploy: `git push` (if using automatic deployments)

---

### **Page Refreshes Show 404**

**Cause**: Missing SPA routing configuration

**Fix**: Ensure `vercel.json` includes these routes:
```json
"routes": [
  {
    "src": "^/(?!.*\\.\\w+$).*$",
    "destination": "/index.html"
  }
]
```

This tells Vercel to redirect all requests to `index.html` for client-side routing.

---

### **Build Takes Too Long**

**Causes**:
- `node_modules` too large
- Too many files being uploaded

**Solutions**:
1. Ensure `.vercelignore` excludes unnecessary files
2. Delete local `node_modules`: `rm -r node_modules`
3. Run `npm install` to clean install
4. Push to git and redeploy

---

## Environment Variables

If you need environment variables (API keys, backend URLs, etc.):

### **Adding Environment Variables**

#### **Via Vercel Dashboard**:
1. Go to Project → Settings → Environment Variables
2. Add key-value pair
3. Rebuild to apply changes

#### **Via Vercel CLI**:
```bash
vercel env add MY_VARIABLE
# Enter the value when prompted
```

### **Using Environment Variables in Angular**

Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: process.env['API_URL'] || 'http://localhost:3000'
};
```

Then import and use:
```typescript
import { environment } from '../environments/environment';

// Use environment.apiUrl in your service
```

---

## Custom Domain

To use your own domain instead of `vercel.app`:

### **Step 1: Add Domain in Vercel**
1. Go to Project → Settings → Domains
2. Click **"Add"**
3. Enter your custom domain (e.g., `mytodos.com`)

### **Step 2: Update DNS Settings**

**For Vercel Nameservers** (Recommended):
1. Copy nameservers from Vercel
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Update nameservers to Vercel's
4. Wait 24-48 hours for DNS to propagate

**For CNAME Record** (Alternative):
1. Go to your domain's DNS settings
2. Add CNAME record:
   - **Name**: `www` (or subdomain)
   - **Value**: `cname.vercel.com`
3. Wait for propagation

### **Step 3: Verify Domain**
- After DNS propagates, your domain should work
- Visit `https://yourdomain.com`
- SSL certificate auto-generates (free)

---

## Automatic Deployments

Once connected to Vercel, deployments are automatic:

### **How It Works**
1. Push code to main branch: `git push origin main`
2. Vercel automatically detects the push
3. Builds the project
4. Deploys to production
5. You get a notification when complete

### **Disable Auto-Deploy**
1. Go to Project → Settings → Git
2. Toggle off "Automatic Deployments"
3. Now deploments only happen via `vercel` CLI or dashboard

### **Preview Deployments**
Each pull request gets a preview URL:
- Create a PR on GitHub
- Vercel automatically builds and deploys
- View preview URL in the PR
- Share preview with team members
- Merge PR to deploy to production

---

## Monitoring and Analytics

Vercel provides built-in monitoring:

### **View Analytics**
1. Go to Project → Analytics
2. See real-time data:
   - Page views
   - User sessions
   - Performance metrics
   - Error rates

### **View Logs**
1. Go to Project → Logs
2. See:
   - Runtime logs
   - Edge network logs
   - Build logs

---

## Production Checklist

Before deploying to production:

- [ ] All tests pass locally: `npm test`
- [ ] App builds successfully: `npm run build`
- [ ] No console errors: Check `npm start` locally
- [ ] localStorage works (test add/delete todos)
- [ ] Responsive design works on mobile
- [ ] All features tested (add, complete, delete, filter)
- [ ] Git repository is up to date
- [ ] `.gitignore` includes unnecessary files
- [ ] `vercel.json` is configured correctly
- [ ] No sensitive data in code (API keys, passwords)

---

## Summary

**Vercel Deployment in 3 Steps**:

1. **Push to Git**: `git push origin main`
2. **Connect to Vercel**: Import repository from dashboard
3. **Deploy**: Click deploy button (automatic after that)

**Your app is now live** at `https://your-project-name.vercel.app`

---

## Useful Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Angular on Vercel](https://vercel.com/docs/frameworks/angular)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Custom Domains Guide](https://vercel.com/docs/concepts/projects/custom-domains)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## Support

- **Vercel Support**: https://vercel.com/support
- **Angular Documentation**: https://angular.dev
- **GitHub Discussions**: https://github.com/vercel/vercel/discussions

Happy deploying! 🚀
