import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@common/decorators/ispublic.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  async signIn(@Body() loginAttempt: LoginUserDto) {
    return await this.authService.signIn(loginAttempt);
  }
}
