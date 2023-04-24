FROM node:18.3.0-alpine3.14

# Path: /app
WORKDIR /app

# Path: /app/package.json
COPY package.json .

# Path: /app
RUN yarn install

# Path: /app

COPY . .

# Path: /app

CMD ["yarn", "start"]
