FROM node:22-alpine

WORKDIR /app

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
