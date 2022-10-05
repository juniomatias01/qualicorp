import UserRepository from '../repositories/userRepository';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async getAll() {
    const result = await this.userRepository.findAll();
    return result
  }
  async getById(param) {
    const result = await this.userRepository.findById(param);;
    return result
  }
  async post(param) {
    const result = await this.userRepository.createUser(param);
    return result
  }
  async put(id, body) {
    const result = await this.userRepository.update(id, body);
    return result
  }
  async delete(id) {
    const result = await this.userRepository.remove(id);
    return result
  }
}
