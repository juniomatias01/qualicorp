import 'dotenv/config';
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.BOLT_URL,
  neo4j.auth.basic(process.env.USERNAME, process.env.PASSWORD)
);

export const session = driver.session({ database: process.env.DATABASE });