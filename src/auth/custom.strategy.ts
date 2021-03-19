import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as AbstractStrategy } from 'passport-strategy';
import { TokenValidator } from './token-validator';

class Strategy extends AbstractStrategy {
  private tokenValidator: TokenValidator;
  constructor() {
    super();
    this.tokenValidator = new TokenValidator();
  }
  authenticate(req: Request) {
    const { authorization } = req.headers;
    if (!authorization)
      return this.error(
        new UnauthorizedException('Authorization header not found'),
      );

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token)
      return this.error(
        new UnauthorizedException('Authorization type Bearer expexted'),
      );

    this.tokenValidator
      .validateToken(token)
      .then((payload: any) =>
        this.success({ name: payload.name, email: payload.email }),
      )
      .catch(this.error);
  }
}

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {}
