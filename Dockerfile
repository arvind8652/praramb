FROM node:20-alpine

WORKDIR /app

copy package*.json .

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]