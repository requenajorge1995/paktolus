import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { CustomStrategy } from './custom.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [JwtStrategy, CustomStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
