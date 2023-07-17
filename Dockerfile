FROM node:alpine

WORKDIR /app

COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

COPY .env ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 5000
CMD [ "node", "index"]