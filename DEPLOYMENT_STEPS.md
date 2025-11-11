# Deployment Steps

## Changes Made

### 1. CORS Support Added to Modal API
- Added FastAPI middleware with CORS configuration
- Allowed origins: `preserve-ml.github.io` and `localhost:3000/3001`
- Restructured endpoints to use Modal's ASGI app approach

### 2. UI Updates
- Changed default example to better machine learning sentences
- Set `only_valid: false` by default to show all permutations
- Updated API endpoint URLs to use new ASGI structure

### 3. Backend Validation Relaxed
- `min_similarity`: 0.90 → 0.85
- `max_perplexity_ratio`: 1.15 → 1.5
- `filter_invalid` default: true → false

## Deployment Instructions

### Step 1: Deploy Modal API (Required First!)

```bash
cd /Users/achinth/Desktop/Code/preserve/services
modal deploy synthetic_api/modal_app.py
```

**Important:** Note the deployment URL that Modal gives you. It will be something like:
```
https://achinth-b--synthetic-api-fastapi-app.modal.run
```

### Step 2: Update Environment Variable (Optional)

If your Modal deployment URL is different from the default, update it:

Create `.env.local` in the Next.js project:
```bash
cd /Users/achinth/Desktop/code/preserve/preserve-ml.github.io
echo "NEXT_PUBLIC_PRESERVE_API_BASE_URL=https://YOUR-MODAL-URL.modal.run" > .env.local
```

### Step 3: Test Locally

```bash
cd /Users/achinth/Desktop/code/preserve/preserve-ml.github.io
npm run dev
```

Visit http://localhost:3000 and test the "Try the API" section.

### Step 4: Deploy to GitHub Pages

```bash
cd /Users/achinth/Desktop/code/preserve/preserve-ml.github.io
git add .
git commit -m "Add CORS support and improve demo defaults"
git push origin main
```

GitHub Actions will automatically:
1. Build the Next.js site
2. Export static files to `/out`
3. Deploy to GitHub Pages

### Step 5: Verify Deployment

1. Wait for GitHub Actions to complete (~2-3 minutes)
2. Visit https://preserve-ml.github.io
3. Navigate to the "Try the API" section
4. Click "Generate" to test the API

## Troubleshooting

### CORS Errors Still Appearing?

If you see CORS errors in the browser console:

1. Check that the Modal API is deployed with the latest code
2. Verify the URL in the browser matches the CORS allowed origins
3. Check browser console for the exact error message

### Modal URL Changed?

If your Modal deployment URL changed, update the frontend:

**Option A: Environment Variable**
Add to GitHub repository secrets:
- Go to GitHub repo → Settings → Secrets → Actions
- Add: `NEXT_PUBLIC_PRESERVE_API_BASE_URL` with your Modal URL

**Option B: Hard-code (quick fix)**
Edit `app/components/TryAPIClient.tsx` line 7 with your new URL.

### No Permutations Generated?

1. Check Modal logs: `modal app logs synthetic-api`
2. Verify validation settings in the UI
3. Try unchecking "Only valid" checkbox

## Expected Behavior

With the new settings:
- **Machine learning example** should generate 3-5 permutations
- **Similarity scores** should be 0.85-0.99
- **Perplexity ratios** should be 1.0-1.5
- All permutations shown by default (not just valid ones)

## API Endpoints

After deployment:
- Health check: `https://YOUR-URL.modal.run/health`
- Generate: `https://YOUR-URL.modal.run/generate` (POST)

## Notes

- Modal cold starts may take 5-10 seconds on first request
- GPU (T4) will spin up automatically for generate requests
- Health check runs without GPU (faster response)
