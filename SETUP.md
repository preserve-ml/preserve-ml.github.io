# Preserve Landing Page - Setup Guide

## 🎉 Your landing page is ready!

The code has been pushed to GitHub. Follow these steps to complete the deployment.

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/preserve-ml/preserve-ml.github.io
2. Click on **Settings** (top menu)
3. Click on **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
5. The site will automatically deploy when you push to main

## Step 2: Set Up Google Sheets Integration

### A. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### B. Create API Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. **Important**: Click "Edit API Key" and add restrictions:
   - **Application restrictions**:
     - Select "HTTP referrers (web sites)"
     - Add these referrers:
       ```
       https://preserve.ml/*
       https://preserve-ml.github.io/*
       ```
   - **API restrictions**:
     - Select "Restrict key"
     - Choose "Google Sheets API"
4. Save the API key

### C. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Preserve Waitlist" (or any name you prefer)
4. Set up columns in row 1:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Company`
5. Make the sheet editable:
   - Click "Share" (top right)
   - Change to "Anyone with the link can edit"
   - Copy the Spreadsheet ID from the URL:
     ```
     https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
     ```

### D. Add GitHub Secrets

1. Go to your repository: https://github.com/preserve-ml/preserve-ml.github.io
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these two secrets:
   
   **Secret 1:**
   - Name: `NEXT_PUBLIC_GOOGLE_API_KEY`
   - Value: Your Google API Key from step B
   
   **Secret 2:**
   - Name: `NEXT_PUBLIC_GOOGLE_SHEET_ID`
   - Value: Your Spreadsheet ID from step C

## Step 3: Configure Custom Domain (preserve.ml)

1. Go to your domain registrar (where you bought preserve.ml)
2. Add these DNS records:

   **For GitHub Pages:**
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   preserve-ml.github.io
   ```

3. Wait for DNS propagation (can take up to 48 hours, usually 1-2 hours)

4. In GitHub Settings → Pages:
   - Custom domain: Enter `preserve.ml`
   - Check "Enforce HTTPS" (after DNS propagates)

## Step 4: Trigger Deployment

The GitHub Actions workflow will automatically run when you push to main. You can also:

1. Go to **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

## Step 5: Verify Deployment

1. Check the Actions tab to see if the deployment succeeded
2. Visit your site:
   - https://preserve-ml.github.io
   - https://preserve.ml (after DNS propagates)

## Testing the Waitlist Form

Once deployed:
1. Fill out the waitlist form
2. Submit it
3. Check your Google Sheet - a new row should appear with the submission

## Troubleshooting

### Issue: Form submissions not working
- ✅ Verify Google Sheets API is enabled
- ✅ Check API key restrictions (referrers must match your domain)
- ✅ Confirm sheet is publicly editable
- ✅ Check GitHub Secrets are correctly named and set

### Issue: Site not deploying
- ✅ Check Actions tab for error messages
- ✅ Ensure GitHub Pages is set to "GitHub Actions" source
- ✅ Verify GitHub Secrets are set

### Issue: Custom domain not working
- ✅ Wait for DNS propagation (24-48 hours)
- ✅ Verify DNS records are correct
- ✅ Check CNAME file exists in public/ directory

## Local Development

To run the site locally:

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials
# Then run:
npm run dev
```

Visit http://localhost:3000

## Need Help?

- GitHub Pages Documentation: https://docs.github.com/en/pages
- Google Sheets API: https://developers.google.com/sheets/api
- Next.js Documentation: https://nextjs.org/docs

## Features Included

✅ Neumorphic design with light/dark mode toggle  
✅ Fully responsive (iPhone 14 Pro and all devices)  
✅ Waitlist form with Google Sheets integration  
✅ Static site generation for fast loading  
✅ SEO optimized  
✅ Custom domain support (preserve.ml)  
✅ Automated deployment via GitHub Actions  

Enjoy your new landing page! 🚀

