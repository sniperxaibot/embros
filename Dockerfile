FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

# Generate Prisma client BEFORE build
RUN npx prisma generate

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
