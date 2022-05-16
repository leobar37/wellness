import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SafeAny } from '@wellness/common';
import { EntityManager } from 'typeorm';
import { GrowthInput } from '../dto/growth.dto';
import { GrowthHelper } from '../helpers/growth.helper';
import { AlertInput, TypeDataAlert } from "../dto/alert.dto";
import {  Between } from "typeorm";
import {  AlertResult } from "../types/Alert.type";
import { Client } from '@wellness/core';
import addDays from "date-fns/addDays";
import differenceInDays from "date-fns/differenceInDays";
import { AlertsHelper } from "../helpers/alerts.helper";
@Injectable()
export class DashboardService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private growthHelper: GrowthHelper,
    private alertsHelper: AlertsHelper,
  ) {}
  //
  async growthReport(input: GrowthInput) {
    const { interval, typeData } = input;
    return this.growthHelper.growthReport(typeData as SafeAny, interval);
  }

  async alertsReport(input : AlertInput)  : Promise<AlertResult[]> {  
      return  this.alertsHelper.alertsReport(input.typeData);
  }
  

}
