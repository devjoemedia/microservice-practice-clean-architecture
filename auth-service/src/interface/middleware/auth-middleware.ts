import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";
import { JwtTokenService } from "../../domain/services/ijwt-token-service";

@injectable()
export class AuthMiddleware {
  constructor(
    @inject("ITokenService") private tokenService: JwtTokenService
  ) { }

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    try {
      const decoded = this.tokenService.verifyToken(token);
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
