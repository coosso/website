# ---- build stage ----
FROM node:24-alpine AS builder
RUN corepack enable && corepack prepare pnpm@11 --activate
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN npx fumadocs-mdx
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true
RUN pnpm build

# ---- runtime stage ----
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
EXPOSE 3000
CMD ["node", "server.js"]