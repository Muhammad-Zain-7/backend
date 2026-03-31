# ── Production backend image ──────────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Install production deps only (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src/ ./src/

EXPOSE 5000

# Use node directly (not nodemon) in production
CMD ["node", "src/index.js"]