import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as AbstractStrategy } from 'passport-strategy';
import { JwtHeader, SigningKeyCallback, VerifyErrors } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

class Strategy extends AbstractStrategy {
  private client: JwksClient;
  constructor() {
    super();
    this.client = jwksClient({
      jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
    });
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

    this.validateToken(token);
  }

  private validateToken(token: string) {
    const getKey = (header: JwtHeader, callback: SigningKeyCallback) =>
      this.client.getSigningKey(header.kid, (error, key) =>
        error
          ? new InternalServerErrorException()
          : callback(null, key.getPublicKey()),
      );

    const callback = (error: VerifyErrors, payload: any) =>
      error
        ? this.error(new UnauthorizedException(error.message))
        : this.success({ name: payload.name, email: payload.email });

    jwt.verify(
      token,
      getKey,
      { issuer: 'https://accounts.google.com' },
      callback,
    );
  }
}

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {}
