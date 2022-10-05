require('dotenv').config();

const express = require('express');
const cors = require('cors');

const routes = require('./src/routes');

const server = express();

// set middlewares
server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  next();
});

// routes
server.get('/', (req, res) => res.send({ name: 'qualicorp api rest' }));
server.use('/users', routes.user);

const { PORT = 8181 } = process.env;

server.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
