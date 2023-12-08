import { Module } from '@nestjs/common';
import { PostModule } from '@modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as TypeOrmConfig } from './ormconfig';
import { AuthModule } from '@modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...TypeOrmConfig, autoLoadEntities: true }),
    PostModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
