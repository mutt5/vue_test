FROM node:18-alpine as base

WORKDIR /app

# 開発環境
FROM base as development
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# 本番環境
FROM base as production
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"] 