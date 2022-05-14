import { Injectable } from '@nestjs/common';
import { Client, Contract } from '@wellness/core';
import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInDays';
import { Between } from 'typeorm';
import { TypeDataAlert  } from '../dto/alert.dto';
import { AlertResult } from "../types/Alert.type";
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
@Injectable()
export class AlertsHelper {
  constructor(@InjectEntityManager() private manager: EntityManager) {}
  async alertsReport(strategy: TypeDataAlert) {
    switch (strategy) {
      case TypeDataAlert.birthday:
        return this.birthdayAlert();
      case TypeDataAlert.plans_to_overcome:
        return this.plansToOvercomeAlert();
    }
  }

  async plansToOvercomeAlert() : Promise<AlertResult[]> {
    const now = new Date();
    const [start, end] = [now, addDays(now, 10)];
    const contracts = await this.manager
      .createQueryBuilder()
      .from(Contract, 'contract')
      .leftJoin('contract.client', 'client')
      .addSelect('client.name' , "name")
      .addSelect("client.phone" , "phone")
      .addSelect("contract.finishedAt" , "finishedAt")
      .where("contract.finishedAt BETWEEN :start AND :end" , {start : start , end : end})
      .getRawMany();

    return contracts.map(contract => {
        const days = differenceInDays( now,contract.finishedAt);
        return {
            typeData: TypeDataAlert.plans_to_overcome,
            label: contract.name,
            sublabel: contract.phone,
            date: contract.finishedAt,
            dateLabel: `Su plan termina en ${-days} días`,
        };
    });
  }

  async birthdayAlert() {
    const now = new Date();
    const [start, end] = [now, addDays(now, 10)];

    const clients = await this.manager.find(Client, {
      where: {
        birth: Between(start, end),
      },
    });

    const getDaysToFinish = (date: Date) => {
      return differenceInDays(date, now);
    };

    return clients.map((client) => {
      const days = getDaysToFinish(new Date(client.birth));
      return {
        typeData: TypeDataAlert.birthday,
        label: client.name.split(' ')[0] + ' ' + client.lastName.split(' ')[0],
        sublabel: client.phone,
        date: new Date(client.birth),
        dateLabel: `Su cumpleaños es en ${days} días`,
      };
    });
  }
}
