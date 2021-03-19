# Boilerplate dockerfile to start a node server

FROM node:14.9.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]