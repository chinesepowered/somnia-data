# Deployment Guide

Quick guide to deploy Somnia Pulse to production.

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps.

### Deploy with CLI

1. Install Vercel CLI:
   ```bash
   pnpm add -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Link to existing project or create new
   - Set environment variables if needed
   - Deploy!

### Deploy with GitHub

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js and deploys

### Environment Variables

No environment variables needed! The app works out of the box.

If you want to add analytics or custom features later, you can add them in Vercel dashboard.

## Netlify

1. Build command: `pnpm build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

## Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t somnia-pulse .
docker run -p 3000:3000 somnia-pulse
```

## Static Export (Optional)

For pure static hosting:

1. Update `next.config.mjs`:
   ```javascript
   const nextConfig = {
     output: 'export',
   };
   ```

2. Build:
   ```bash
   pnpm build
   ```

3. Deploy the `out/` directory to any static host

**Note**: Static export won't support API routes if you add them later.

## Performance Checklist

Before deploying:
- [ ] Build completes without errors
- [ ] No console warnings in production
- [ ] Images are optimized
- [ ] Environment variables are set
- [ ] Mock mode is disabled (if using real SDS)
- [ ] Analytics added (optional)

## Post-Deployment

1. Test the live site thoroughly
2. Monitor for errors (Vercel Analytics, Sentry, etc.)
3. Share the URL in hackathon submission
4. Add live demo link to README

## Custom Domain

### Vercel
1. Go to project settings
2. Add your domain
3. Configure DNS as instructed

### Netlify
1. Domain settings
2. Add custom domain
3. Update nameservers

## Monitoring

Consider adding:
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **LogRocket** - Session replay

## Hackathon Submission

Include these in your submission:
- ✅ Live demo URL
- ✅ GitHub repository
- ✅ README with pitch
- ✅ Video demo (if required)
- ✅ Screenshots/GIFs

Example submission text:
```
# Somnia Pulse

Live Demo: https://somnia-pulse.vercel.app
GitHub: https://github.com/yourusername/somnia-pulse
Video: https://youtube.com/...

A real-time blockchain visualizer showcasing the power of Somnia Data Streams.
```
