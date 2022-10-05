const UserRepository = require('../repositories/userRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    const result = await this.userRepository.findAll();
    return result;
  }

  async getById(id) {
    const result = await this.userRepository.findById(id);
    return result;
  }

  async createUser(user) {
    const result = await this.userRepository.createUser(user);
    return result;
  }

  async updateUser(id, body) {
    const result = await this.userRepository.update(id, body);
    return result;
  }

  async deleteUser(id) {
    const result = await this.userRepository.remove(id);
    return result;
  }
}

module.exports = UserService;
