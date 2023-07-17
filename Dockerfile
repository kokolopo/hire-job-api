FROM node:current-alpine3.18

WORKDIR /app

COPY package* .

RUN npm i

COPY . .

CMD [ "node", "index"]