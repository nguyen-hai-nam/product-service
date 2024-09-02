FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn build

FROM node:22

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

COPY package.json .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/app.js"]
