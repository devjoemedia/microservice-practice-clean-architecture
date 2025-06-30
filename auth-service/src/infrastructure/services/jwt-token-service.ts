import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { ITokenService } from "../../domain/services/itoken-service";

@injectable()
export class JwtTokenService implements ITokenService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "default_secret";
  }

  generateToken(payload: object, expiresIn: string = "1h"): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
