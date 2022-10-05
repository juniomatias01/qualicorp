import express from 'express';
import cors from 'cors';

import routes from './routes';

const server = () => {

  const server = express;
  
  // set middlewares
  server.use(cors());
  server.use(express.json());
  
  server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    return next();
  });
  
  // routes 
  server.use('/users',routes.user);

  return server;
};

export default server;
