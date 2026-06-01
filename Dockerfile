FROM node:22-bookworm-slim

WORKDIR /app
ENV PATH="/app/node_modules/.bin:${PATH}"

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Generate Prisma client (works without DB connection - only needs schema)
RUN npx prisma generate

# Build Next.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
