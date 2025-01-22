FROM node:18-alpine as base

WORKDIR /frontend

# 開発環境
FROM base as development
RUN npm install -g firebase-tools

# COPY . .
# CMD ["npm", "run", "dev"]

# # 本番環境
# FROM base as production
# COPY package*.json ./
# RUN npm ci --only=production
# COPY . .
# RUN npm run build
# CMD ["npm", "run", "preview"] 