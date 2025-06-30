import { injectable, inject } from 'tsyringe';
import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
export class GetUsersUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) { }

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
