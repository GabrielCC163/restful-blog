import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { LogEntity } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private logRepository: Repository<LogEntity>,
  ) {}

  async createLog(logData: CreateLogDto): Promise<LogEntity> {
    return this.logRepository.save(logData);
  }
}
