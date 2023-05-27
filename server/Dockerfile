FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 7777

CMD ["npm", "start"]