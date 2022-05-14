import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SafeAny } from '@wellness/common';
import { EntityManager } from 'typeorm';
import { GrowthInput } from '../dto/growth.dto';
import { GrowthHelper } from '../helpers/growth.helper';

@Injectable()
export class DashboardService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private growthHelper: GrowthHelper
  ) {}
  //
  async growthReport(input: GrowthInput) {
    const { interval, typeData } = input;
    return this.growthHelper.growthReport(typeData as SafeAny, interval);
  }
}
