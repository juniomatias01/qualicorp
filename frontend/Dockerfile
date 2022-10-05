FROM node:16.14.0

WORKDIR /usr/src/app/ui

COPY package*.json ./
COPY . ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]