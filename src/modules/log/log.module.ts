import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
