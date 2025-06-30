import { injectable, inject } from 'tsyringe';
import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
export class GetUserUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) { }

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
