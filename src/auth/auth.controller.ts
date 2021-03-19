import { UseGuards, Request } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('custom'))
  @Get('google')
  getProfileCustomStrategy(@Request() req) {
    return req.user;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/stockstrategy')
  getProfileJwtStrategy(@Request() req) {
    return req.user;
  }
}
