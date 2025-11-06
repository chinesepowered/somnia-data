# Quick Start Guide

## Run Locally (1 minute)

```bash
# You're already here, just run:
pnpm dev
```

Open http://localhost:3000

That's it! The app connects to live Somnia testnet automatically.

**No wallet needed** - It's read-only, so it works instantly!

## Deploy to Vercel (2 minutes)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Follow prompts. Done!

## Project Files Guide

### Must Read First
- **README.md** - Your hackathon pitch (show this to judges)
- **HACKATHON.md** - Submission checklist and details

### Technical Docs
- **SETUP.md** - Detailed setup instructions
- **INTEGRATION.md** - How blockchain integration works
- **DEPLOYMENT.md** - Deploy to various platforms

### Code Structure
- `app/` - Next.js pages (layout, home page)
- `components/` - React components (Hero, StatsBar, ActivityFeed, etc.)
- `hooks/` - Custom hooks (useTransactions, useStats)
- `lib/` - Config and utilities
- `types/` - TypeScript definitions

## Quick Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm start    # Run production build
pnpm lint     # Lint code
```

## Key Customization Points

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  somnia: {
    purple: "#7B3FF2",  // Change these
    blue: "#2D9CDB",
  },
}
```

### Add Transaction Types
Edit `types/index.ts`:
```typescript
type: 'transfer' | 'contract' | 'nft' | 'your-new-type';
```

### Adjust Update Frequency
Edit `hooks/useStats.ts`:
```typescript
const interval = setInterval(updateStats, 3000); // Change interval
```

## Network Switching

The app supports both Somnia testnet and mainnet:

**Testnet (Default)**
- Active and producing blocks
- Free to use, no tokens needed
- Perfect for demos and development

**Mainnet**
- Switch using the network toggle in the UI
- Also read-only, no wallet needed
- Update RPC URL in config when mainnet launches

## Troubleshooting

**Port in use?**
```bash
pnpm dev -- -p 3001
```

**Build errors?**
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

**TypeScript errors?**
Check that all imports are correct and files exist.

## What to Show Judges

1. **Live Demo** - Open deployed URL, show transactions flowing
2. **README.md** - Your pitch explaining the vision
3. **Code Quality** - Show clean component structure
4. **Documentation** - Highlight comprehensive docs
5. **Animations** - Point out smooth, professional UX

## Next Steps

1. ✅ Run locally - `pnpm dev`
2. ✅ Verify it works - Check http://localhost:3000
3. ✅ Deploy to Vercel - `vercel`
4. ✅ Add deployment URL to README.md
5. ✅ Test deployed version
6. ✅ Submit to hackathon

## Tips for Demo

- Let it run for 30 seconds to show activity
- Point out different transaction types (colors)
- Highlight instant updates (no refresh needed)
- Explain how SDS makes this possible
- Show the smooth animations
- Mention it's production-ready

## Getting Help

- Check the docs files first
- Look at code comments in components
- Review the type definitions
- Search Somnia docs: https://docs.somnia.network

## Demo Script

> "Somnia Pulse shows blockchain activity in real-time. Watch as transactions appear instantly—no polling, no delays. Each type gets unique visual treatment. The stats update continuously. This is possible because Somnia Data Streams provides zero-latency access to blockchain data. The patterns we've built here work for DeFi, gaming, analytics, any app that needs instant blockchain updates."

---

**Ready to demo? Run `pnpm dev` and you're live!**
