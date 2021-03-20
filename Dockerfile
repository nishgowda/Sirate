# Dockerfile to start the node server

FROM node:14.9.0

WORKDIR /app

COPY ./backend/package.json /app

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]