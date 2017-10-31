FROM node:alpine

RUN mkdir -p /app

ADD . /app
WORKDIR /app

RUN npm install --quiet && \
    NODE_ENV=production npm run build && \
    # Remove devDependencies \
    npm prune --production

CMD node build/index.js
