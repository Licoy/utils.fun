FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV SITE_TITLE=""
ENV SITE_TITLE_SEPARATOR=""
ENV SITE_DESCRIPTION=""
ENV SITE_URL=""
ENV SITE_LOGO_SRC=""
ENV SITE_LOGO_ALT=""
ENV SITE_LOGO_WIDTH=""
ENV SITE_LOGO_HEIGHT=""
ENV SITE_LOGO_HIDDEN="false"
ENV SITE_FOOTER_HTML=""
ENV SITE_GITHUB_URL=""

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
