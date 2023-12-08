FROM node:16.14.0

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]