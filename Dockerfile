FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npx", "nodemon", "src/main.ts"]
