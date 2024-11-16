FROM node:20-alpine AS builder

WORKDIR /var/www/html/js

COPY ./package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

FROM node:20-alpine

WORKDIR /var/www/html/js

COPY --from=builder /var/www/html/js ./

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
