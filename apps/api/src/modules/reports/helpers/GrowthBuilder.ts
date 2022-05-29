import { IntervalTimeEnum } from '@wellness/common';
import {
  range,
  SafeAny,
  DaysMapper,
  AnyFunction,
  MonthMapper,
} from '@wellness/common';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import getDay from 'date-fns/getDay';
import getMonth from 'date-fns/getMonth';
import getWeek from 'date-fns/getWeek';
import { get, isFunction } from 'lodash';
import { Injectable } from '@nestjs/common';

type Options = {
  property: string;
};

@Injectable()
export class ReportGrowthBuilder {
  private edges: [Date, Date];
  private options: Options;
  private data: SafeAny[];
  build(
    interval: IntervalTimeEnum,
    edges: [Date, Date],
    data: SafeAny[],
    options?: Options
  ) {
    this.options = Object.assign({ property: 'createdAt' }, options ?? {});
    this.edges = edges;
    this.data = data;
    switch (interval) {
      case IntervalTimeEnum.LAST_WEEK: {
        return this.lastWeek();
      }
      case IntervalTimeEnum.LAST_YEAR: {
        return this.lastYear();
      }
      case IntervalTimeEnum.LAST_MONTH: {
        return this.lastMonth();
      }
    }
  }

  lastMonth() {
    const [start, end] = this.edges;
    const weeks = differenceInWeeks(start, end);
    const weeksRange = range(1, -weeks);
    const weeksCounter = this.makeCounter(weeksRange);
    const b = getWeek(start);
    const growth = this.makeGrowths(weeksCounter, (date) => {
      const a = getWeek(date);
      return a - b + 1;
    });
    return this.makeResults(growth, (key: string) => `Semana ${key}`);
  }

  lastWeek() {
    const [start, end] = this.edges;
    const days = differenceInDays(start, end);
    const daysRange = range(1, -days);
    const daysCounter = this.makeCounter(daysRange);
    const growth = this.makeGrowths(daysCounter, getDay);
    return this.makeResults(growth, DaysMapper);
  }
  lastYear() {
    const [start, end] = this.edges;
    const months = differenceInMonths(start, end);
    const monthsRange = range(1, -months);
    const monthsCounter = this.makeCounter(monthsRange);
    const growth = this.makeGrowths(monthsCounter, getMonth);
    return this.makeResults(growth, MonthMapper);
  }

  private makeGrowths(counter: Record<string, SafeAny>, fn: AnyFunction) {
    const growth = this.data.reduce((prev, curr) => {
      const result = fn(curr[this.options.property]);
      if (result in prev) {
        prev[result] += 1;
        return prev;
      }
      return prev;
    }, counter);
    return growth;
  }
  private makeResults(
    obj: Record<string, SafeAny>,
    mapper: SafeAny | AnyFunction
  ) {
    return Object.keys(obj).map((key) => {
      const label = isFunction(mapper) ? mapper(key) : get(mapper, key) || '';
      return {
        label,
        value: obj[key],
      };
    });
  }
  private makeCounter(arr: number[]) {
    return arr.reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: 0,
      };
    }, {});
  }
}
