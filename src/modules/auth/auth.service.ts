import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { JwtPayload } from './interface/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { AppConfig } from 'src/config/app.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private authSecret: string;

  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    this.authSecret = this.configService.get('auth_secret');
  }

  async signIn(loginAttempt: LoginUserDto): Promise<{ token: string }> {
    const INCORRECT_EMAIL_OR_PASSWORD = 'incorrect email or password';

    // This will be used for the initial login
    const userToAttempt = await this.userService.findUserByEmail(loginAttempt.email.toLocaleLowerCase());

    if (!userToAttempt) {
      throw new NotFoundException(INCORRECT_EMAIL_OR_PASSWORD);
    }

    let isMatch = false;
    try {
      isMatch = await this.checkPassword(loginAttempt.password, userToAttempt.password);
    } catch (error) {
      throw new UnauthorizedException(INCORRECT_EMAIL_OR_PASSWORD);
    }

    if (isMatch) {
      return this.createJwtPayload(userToAttempt);
    } else {
      throw new UnauthorizedException(INCORRECT_EMAIL_OR_PASSWORD);
    }
  }

  private checkPassword(attempt: string, userPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(attempt, userPassword, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  }

  private async createJwtPayload(user: UserEntity) {
    const data: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwtExpiresIn = '1h';
    const jwt = this.jwtService.sign(data, { expiresIn: jwtExpiresIn });

    return {
      token: jwt,
      data,
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: this.authSecret });
    } catch (error) {
      throw new UnauthorizedException('blacklisted token');
    }
  }
}
