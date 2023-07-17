FROM node:current-alpine3.18

WORKDIR /app

COPY package* ./

RUN npm i

COPY . .

EXPOSE 5000
CMD [ "node", "index"]