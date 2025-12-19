# Stock SaaS - Frontend

A modern Next.js frontend for comparing stock performance with interactive charts and AI-powered insights.

## 🚀 Features

- **Interactive Dashboard** - Compare stocks with real-time data
- **Beautiful Charts** - Visualize stock performance (Area & Line charts)
- **Date Presets** - Quick access to seasonal periods (Christmas, Black Friday, etc.)
- **AI Analysis** - Get insights powered by Groq LLaMA 3.3
- **Live Ticker** - Real-time price updates on homepage
- **Export Data** - Download comparisons as CSV
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **UI Components:** shadcn/ui
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/chuma-beep/stock-saas-frontend.git
cd stock-saas-frontend
```

### 2. Install dependencies
```bash
pnpm install
# or
npm install
```

### 3. Set up environment variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

For production, create `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

### 4. Run the development server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
stock-saas-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Dashboard.tsx     # Main comparison interface
│   │   ├── Hero.tsx          # Landing page hero
│   │   ├── Features.tsx      # Features section
│   │   └── StockChart.tsx    # Chart component
│   └── lib/
│       ├── api.ts            # API client functions
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── .env.local               # Local environment variables
└── README.md
```

## 🎨 Components

### Dashboard
Main comparison interface with:
- Stock symbol search
- Date range picker with presets
- Comparison results cards
- Interactive charts
- AI analysis section

### StockChart
Recharts-based visualization with:
- Toggle between Area and Line charts
- Crosshair tooltips
- Responsive design
- Export to CSV

### Hero
Landing section with:
- Animated stock ticker
- Live price updates
- Call-to-action

## 🚀 Deployment

### Vercel (Recommended)

1. **Import repository** on Vercel
2. **Configure environment variables**:
   - `NEXT_PUBLIC_API_URL` (your backend URL)
3. **Deploy**

Auto-deploys on git push!

### Build for Production
```bash
pnpm build
pnpm start
```

## 🎯 Usage

### Compare Stocks

1. **Fetch data** - Click "Fetch" buttons for stocks you want to compare
2. **Select dates** - Use presets or custom range
3. **Compare** - Click "Compare Stocks"
4. **View results** - See charts, stats, and AI analysis

### Date Presets

- **Last 30 Days** - Recent performance
- **Last Quarter** - Q4 2025
- **Christmas Season** - Nov 1 - Dec 31
- **Black Friday Week** - Nov 20 - Nov 30
- **Earnings Season** - Oct 1 - Nov 30

### Export Data

Click "Export" button on charts to download CSV with all data points.

## 🧪 Testing
```bash
# Run tests (if you add them)
pnpm test

# Lint
pnpm lint

# Type check
pnpm type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a Pull Request

## 📝 License

This project is private and proprietary.

## 👤 Author

**Chukwuma Wisdom Anwaegbu**
- GitHub: [@chuma-beep](https://github.com/chuma-beep)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [shadcn/ui](https://ui.shadcn.com/)
