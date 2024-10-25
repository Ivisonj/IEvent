import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthUseCase } from './auth.useCase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api/v1/user/signin')
export class AuthController {
  constructor(private authService: AuthUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
