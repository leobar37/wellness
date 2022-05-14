import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IntervalTimeEnum } from '@wellness/common';
import { EntityManager, Between } from 'typeorm';
import getDay from 'date-fns/getDay';
import getMonth from 'date-fns/getMonth';
import startOfTheWeek from 'date-fns/startOfWeek';
import startOfTheYear from 'date-fns/startOfYear';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInMonths from 'date-fns/differenceInMonths';
import addDays from 'date-fns/addDays';
import addMoth from 'date-fns/addMonths';

import { Contract } from '@wellness/core';
import { range } from '@wellness/common';
import { DaysMapper, MonthMapper } from '@wellness/common';

type GrowthStrategies = 'plans';

@Injectable()
export class GrowthHelper {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async growthReport(strategy: GrowthStrategies, interval: IntervalTimeEnum) {
    switch (strategy) {
      case 'plans': {
        return this.plansReport(interval);
      }
    }
  }
  async plansReport(interval: IntervalTimeEnum) {
    const [start, end] = this.getInterval(interval);

    const contracts = await this.manager.find(Contract, {
      where: {
        createdAt: Between(start, end),
      },
    });
    // func(interva, prop)(results)

    const makeCounter = (arr: number[]) => {
      return arr.reduce((prev, curr) => {
        return {
          ...prev,
          [curr]: 0,
        };
      }, {});
    };
    // whe the report is for the last week
    if (interval === IntervalTimeEnum.LAST_WEEK) {
      const days = differenceInDays(start, end);
      const daysRange = range(1, -days);
      const daysCounter = makeCounter(daysRange);

      const growths = contracts.reduce((prev, curr) => {
        const day = getDay(curr.createdAt);
        if (day in prev) {
          prev[day] += 1;
          return prev;
        }
        return prev;
      }, daysCounter);

      const result = Object.keys(growths).map((key) => {
        const label = DaysMapper[key] || '';
        return {
          label,
          value: growths[key],
        };
      });

      return result;
    }

    // whe the report is for the last year
    if (interval === IntervalTimeEnum.LAST_YEAR) {
      const moths = differenceInMonths(start, end);
      const mothsRange = range(1, -moths);
      const mothsCounter = makeCounter(mothsRange);

      const growths = contracts.reduce((prev, curr) => {
        const moth = getMonth(curr.createdAt) + 1;
        if (moth in prev) {
          prev[moth] += 1;
          return prev;
        }
        return prev;
      }, mothsCounter);

      const result = Object.keys(growths).map((key) => {
        const newKey = Number(key);
        const label = MonthMapper[newKey] || '';
        return {
          label,
          value: growths[newKey],
        };
      });
      return result;
    }
  }

  private getInterval(interval: IntervalTimeEnum) {
    switch (interval) {
      case IntervalTimeEnum.LAST_WEEK: {
        const now = new Date();
        return [
          startOfTheWeek(now, {
            weekStartsOn: 1,
          }),
          addDays(now, 1),
        ];
      }
      case IntervalTimeEnum.LAST_YEAR: {
        const now = new Date();
        return [startOfTheYear(now), addMoth(now, 1)];
      }
    }
    return [null, null];
  }
}
