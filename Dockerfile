# Development Stage
FROM node:18.18.0-alpine AS dev
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]

# Production Stage
FROM node:18.18.0-alpine AS prod
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
