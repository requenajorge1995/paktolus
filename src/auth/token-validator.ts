import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { JwtHeader, SigningKeyCallback, VerifyErrors } from 'jsonwebtoken';
import { GOOGLE_ISSUER, GOOGLE_JWKS_URI } from './config';

export class TokenValidator {
  private client: JwksClient;

  constructor() {
    this.client = jwksClient({ jwksUri: GOOGLE_JWKS_URI });
  }

  validateToken(token: string) {
    return new Promise((resolve, reject) => {
      const getKey = (header: JwtHeader, callback: SigningKeyCallback) =>
        this.client.getSigningKey(header.kid, (error, key) =>
          error
            ? reject(new InternalServerErrorException())
            : callback(null, key.getPublicKey()),
        );

      const callback = (error: VerifyErrors, payload: any) =>
        error
          ? reject(new UnauthorizedException(error.message))
          : resolve(payload);

      jwt.verify(token, getKey, { issuer: GOOGLE_ISSUER }, callback);
    });
  }
}
