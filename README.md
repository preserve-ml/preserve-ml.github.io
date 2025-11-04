# Preserve - Fast Synthetic Data Generation

A modern landing page for Preserve, showcasing attention-based permutation for synthetic data generation that's 20-30x faster than traditional LLM methods.

## Features

- 🎨 Neumorphic design with light/dark mode toggle
- 📱 Fully responsive (optimized for all devices including iPhone 14 Pro)
- ⚡ Built with Next.js 16 and Tailwind CSS v4
- 📊 Waitlist form with Google Sheets integration
- 🚀 Deployed to GitHub Pages with custom domain support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: GitHub Pages
- **Forms**: Google Sheets API v4

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Google Cloud Project with Sheets API enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/preserve-ml/preserve-ml.github.io.git
cd preserve-ml.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your Google Sheets credentials:
   - `GOOGLE_API_KEY`: Your Google Cloud API key
   - `GOOGLE_SHEET_ID`: Your Google Spreadsheet ID

### Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Create a Google Sheet with columns: `Timestamp`, `Name`, `Email`, `Company`
6. Copy the Spreadsheet ID from the URL
7. Make the sheet publicly editable OR set up proper authentication

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This will create a static export in the `out` directory.

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### Setting up GitHub Secrets

Add these secrets to your GitHub repository:
- `GOOGLE_API_KEY`: Your Google Cloud API key
- `GOOGLE_SHEET_ID`: Your Google Spreadsheet ID

Go to: Repository Settings → Secrets and variables → Actions → New repository secret

### Custom Domain

The site is configured to use the custom domain `preserve.ml`. The CNAME file is in the `public` directory.

## Project Structure

```
preserve-ml.github.io/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Waitlist API endpoint
│   ├── components/
│   │   ├── Comparison.tsx        # Old vs New comparison section
│   │   ├── Footer.tsx            # Footer component
│   │   ├── Header.tsx            # Header with theme toggle
│   │   ├── Hero.tsx              # Hero section
│   │   ├── TechnicalDeepDive.tsx # Technical details section
│   │   ├── ThemeToggle.tsx       # Theme toggle button
│   │   └── WaitlistForm.tsx      # Waitlist signup form
│   ├── context/
│   │   └── ThemeContext.tsx      # Theme provider
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/
│   └── CNAME                     # Custom domain configuration
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions workflow
├── next.config.ts                # Next.js configuration
└── package.json
```

## Design System

The site uses a neumorphic design paradigm with:
- Soft shadows for depth
- Light and dark mode support
- Smooth transitions
- Responsive breakpoints for all devices

## License

MIT

## Contact

For questions or support, contact: hello@preserve.ml
