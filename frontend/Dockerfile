FROM node:12.2.0-alpine
WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 300
CMD [ "npm", "start" ]

