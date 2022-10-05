FROM node:10

WORKDIR /usr/src/app/api

COPY package*.json ./
COPY . ./

RUN npm install

EXPOSE 8181

CMD ["npm", "run", "start"]