import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Plan } from '@wellness/core';
import { plainToClass } from "class-transformer";
import { differenceInDays } from "date-fns";
import { EntityManager } from 'typeorm';
import { PlanProgress } from "../types/client-report.type";
import { PlanService } from './plan.service';

@Injectable()
export class ClientReportService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private planService: PlanService
  ) {}

  /**
   * Generate the progress of the customer plan
   */  
  async planProgress(clientId: number) {
    
    const plan = await this.manager.createQueryBuilder()
    .from(Plan, 'plan')
    .innerJoin("plan.suscription" , "sub")
    .innerJoin("sub.contracts" , "contract")
    .addSelect("plan.detail.name" , "name")
    .addSelect("contract.finishedAt" , "finishedAt")
    .addSelect("contract.createdAt" , "createdAt")
    .addSelect("plan.price" , "price")
    .where("contract.clientId = :clientId", { clientId })
    .andWhere("contract.finished = :status", { status: false })
    .getRawOne();
    
    if(!plan){
      return null;
    }
    const allDays = differenceInDays(plan.finishedAt ,plan.createdAt);
    const days = differenceInDays(new Date(),plan.createdAt);
    const percent = Math.floor((days / allDays) * 100);

    const result : PlanProgress = {
      contractLabel : plan.name,
      price : plan.price,
      progress : percent,
      createdAt : plan.createdAt,
      finishedAt : plan.finishedAt,
      daysLeft : (allDays - days)
    }
    return plainToClass(PlanProgress, result);
  }
  
}
