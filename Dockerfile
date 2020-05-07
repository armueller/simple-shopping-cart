FROM node:10-alpine

RUN apk add --no-cache bash

RUN mkdir -p /usr/src/client
RUN mkdir -p /usr/src/server

COPY client/package*.json /usr/src/client/
COPY server/package*.json /usr/src/server/

RUN cd /usr/src/server && npm install
RUN cd /usr/src/client && npm install

COPY ./client/ /usr/src/client/
COPY ./server/ /usr/src/server/

ENV NODE_ENV=dev PORT=3000

EXPOSE 3000 4200

COPY start.sh start.sh

CMD ["bash", "/start.sh"]