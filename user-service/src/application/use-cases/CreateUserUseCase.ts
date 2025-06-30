import { injectable, inject } from 'tsyringe';
import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository
  ) { }

  async execute(name: string, email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const newUser = new User(
      `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`, // Simple unique ID
      name,
      email,
      new Date()
    );

    return this.userRepository.create(newUser);
  }
}
