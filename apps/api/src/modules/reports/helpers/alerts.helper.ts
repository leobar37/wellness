import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Client, Contract } from '@wellness/core';
import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInCalendarDays';
import { EntityManager, Raw } from 'typeorm';
import { TypeDataAlert } from '../dto/alert.dto';
import setYear from 'date-fns/setYear';
import { AlertResult } from '../types/Alert.type';
import pluralize from 'pluralize';
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

  async plansToOvercomeAlert(): Promise<AlertResult[]> {
    const now = new Date();
    const [start, end] = [now, addDays(now, 10)];
    const contracts = await this.manager
      .createQueryBuilder()
      .from(Contract, 'contract')
      .leftJoin('contract.client', 'client')
      .addSelect('client.name', 'name')
      .addSelect('client.phone', 'phone')
      .addSelect('contract.finishedAt', 'finishedAt')
      .where('contract.finishedAt BETWEEN :start AND :end', {
        start: start,
        end: end,
      })
      .getRawMany();

    return contracts.map((contract) => {
      const days = differenceInDays(contract.finishedAt, now);
      let message = `Su plan termina en ${days} ${pluralize('dia', days)}`;
      if (days == 1) {
        message = `Su plan termina mañana`;
      }
      if (days == 0) {
        message = `Su plan termina hoy`;
      }
      return {
        typeData: TypeDataAlert.plans_to_overcome,
        label: contract.name,
        sublabel: contract.phone,
        date: contract.finishedAt,
        dateLabel: message,
      };
    });
  }

  async birthdayAlert() {
    const now = new Date();

    const clients = await this.manager.find(Client, {
      where: {
        birth: Raw(
          (alias) =>
            `EXTRACT (MONTH FROM ${alias}) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT (DAY FROM ${alias}) >= EXTRACT(DAY FROM CURRENT_DATE)`
        ),
      },
    });

    const getDaysToFinish = (date: Date) => {
      return differenceInDays(setYear(date, now.getFullYear()), now);
    };

    return clients.map((client) => {
      const days = getDaysToFinish(new Date(client.birth)) + 1;
      let message = `Su cumpleaños es en ${days} ${pluralize('dia', days)}`;
      if (days == 1) {
        message = `Su cumpleaños es mañana`;
      }
      if (days == 0) {
        message = `Su cumpleaños es hoy`;
      }
      return {
        typeData: TypeDataAlert.birthday,
        label: client.name.split(' ')[0] + ' ' + client.lastName.split(' ')[0],
        sublabel: client.phone,
        date: new Date(client.birth),
        dateLabel: message,
      };
    });
  }
}
