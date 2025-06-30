import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetUserUseCase } from '../../application/use-cases/GetUserUseCase';
import { GetUsersUseCase } from '../../application/use-cases/GetUsersUseCase';

@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: CreateUserUseCase,
    @inject('GetUserUseCase') private getUserUseCase: GetUserUseCase,
    @inject('GetUsersUseCase') private getUsersUseCase: GetUsersUseCase,
  ) { }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        res.status(400).json({ message: 'Name and email are required.' });
        return
      }
      const user = await this.createUserUseCase.execute(name, email);
      res.status(201).json(user);
      return
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        res.status(409).json({ message: error.message });
        return
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
      return
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID is required.' });
        return
      }
      const user = await this.getUserUseCase.execute(id);
      res.status(200).json(user);
      return
    } catch (error: any) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
      return
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getUsersUseCase.execute();
      res.status(200).json(users);
      return
    } catch (error: any) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
      return
    }
  }
}
