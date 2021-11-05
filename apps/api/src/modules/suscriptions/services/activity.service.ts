import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '@wellness/core/entity';
import { Repository } from 'typeorm';
@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private repository: Repository<Activity>
  ) {}
}
