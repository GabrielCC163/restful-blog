import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '@modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        UserModule,
        JwtModule.register({ secret: process.env.AUTH_SECRET }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }