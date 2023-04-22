FROM node:18-alpine

WORKDIR ./server

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y curl

COPY . .

ENV MONGODB_URL="mongodb.net"

HEALTHCHECK --interval=5s --timeout=300ms CMD curl -f "http://localhost:3000/status" || exit 1

EXPOSE 3000
CMD [ "node", "./server/index.js"]