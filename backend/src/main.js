import 'dotenv/config';
import { server } from './server/index';

const { PORT = 8181 } = process.env;

server().listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
});