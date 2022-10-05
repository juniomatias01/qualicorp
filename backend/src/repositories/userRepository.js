const { v4: uuidv4 } = require('uuid');

const session = require('../providers/neo4j');

class UserRepository {
  async createUser(user) {
    try {
      const unique_id = uuidv4();

      await session.run(
        `CREATE (n:User {id: '${unique_id}', name: '${user.name}', 
          email: '${user.email}', cpf: '${user.cpf}', phone: '${user.phone}', 
          uf: '${user.uf}', createdAt: ${JSON.stringify(new Date())} } ) RETURN n`
      );

      return await this.findById(unique_id);
    } catch (err) {
      console.log(err);
    }
  }

  async findAll() {
    const result = await session.run(`MATCH (n) RETURN (n) ORDER BY n.createdAt ASC`);
    return result.records.map((i) => i.get('n').properties);
  }

  async findById(id) {
    const result = await session.run(`MATCH (n:User {id: '${id}'} ) RETURN n LIMIT 1`);
    return result.records[0].get('n').properties;
  }

  async update(id, user) {
    const result = await session.run(
      `MATCH (n:User {id: '${id}'}) SET n.name= '${user.name}', 
        n.email= '${user.email}', n.cpf= '${user.cpf}', n.phone= '${user.phone}', 
        n.uf= '${user.uf}',  RETURN n`
    );
    return result.records[0].get('n').properties;
  }

  async remove(id) {
    await session.run(`MATCH (n:User {id: '${id}'}) DELETE n`);
    return await this.findAll();
  }
}

module.exports = UserRepository;
