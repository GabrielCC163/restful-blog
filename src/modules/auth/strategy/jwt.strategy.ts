import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(@Request() request, payload: any) {
    const token = request.headers.authorization.split(' ')[1];
    this.authService.verifyToken(token);
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}
