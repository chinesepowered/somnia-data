# Setup Guide

This guide covers how to run Somnia Pulse locally.

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

## Quick Start

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Run development server**
   ```bash
   pnpm dev
   ```

3. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

## Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

By default, the app runs in **mock mode** with simulated data. This lets you see the UI and animations without connecting to the actual blockchain.

To use real Somnia Data Streams:
1. Set `NEXT_PUBLIC_MOCK_MODE=false` in `.env.local`
2. Follow the integration guide in `INTEGRATION.md`

## Project Structure

```
somnia-data/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx           # Hero section
│   ├── StatsBar.tsx       # Live statistics bar
│   ├── ActivityFeed.tsx   # Transaction feed
│   ├── TransactionCard.tsx # Individual transaction cards
│   ├── Background.tsx     # Animated background
│   └── Footer.tsx         # Footer component
├── hooks/                 # Custom React hooks
│   ├── useTransactions.ts # Transaction stream hook
│   └── useStats.ts        # Statistics hook
├── lib/                   # Utilities and config
│   └── somnia-config.ts   # Somnia network configuration
├── types/                 # TypeScript type definitions
│   └── index.ts           # Core types
└── public/                # Static assets
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Somnia Data Streams** - Real-time blockchain data

## Troubleshooting

### Port already in use
If port 3000 is busy, specify a different port:
```bash
pnpm dev -- -p 3001
```

### Dependencies won't install
Try clearing the cache:
```bash
pnpm store prune
pnpm install
```

### Build fails
Ensure you're using Node.js 18+:
```bash
node --version
```

## Next Steps

- Check `INTEGRATION.md` to connect real SDS
- Customize colors in `tailwind.config.ts`
- Add more transaction types in `types/index.ts`
- Extend stats in `hooks/useStats.ts`
