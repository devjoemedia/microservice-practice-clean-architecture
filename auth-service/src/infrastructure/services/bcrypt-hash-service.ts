import bcrypt from "bcrypt";
import { injectable } from "tsyringe";
import { IHashService } from "../../domain/services/ihash-service";

@injectable()
export class BcryptHashService implements IHashService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
