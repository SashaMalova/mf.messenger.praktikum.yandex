FROM nodejscn/node:lts
WORKDIR /var/www
COPY ./dist dist
COPY ./server.js server.js
CMD npm install express && node ./server.js