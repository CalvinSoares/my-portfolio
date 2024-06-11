FROM node:18-alpine

WORKDIR /app

LABEL authors="calvin"

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]