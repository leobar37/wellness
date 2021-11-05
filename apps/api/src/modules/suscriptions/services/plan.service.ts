import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '@wellness/core/entity';
import { Repository } from 'typeorm';
@Injectable()
export class PlanService {
  constructor(@InjectRepository(Plan) private repository: Repository<Plan>) {}

  // create plan

  // create activitY
}
