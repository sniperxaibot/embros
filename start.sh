#!/bin/bash
# FORGE — Start script for Railway
# Ensures Prisma client is generated before starting

cd /app

# Generate Prisma client if not already generated
if [ ! -d "node_modules/.prisma/client" ]; then
  echo "Generating Prisma client..."
  npx prisma generate
fi

# Start Next.js
echo "Starting Forge..."
npm start
