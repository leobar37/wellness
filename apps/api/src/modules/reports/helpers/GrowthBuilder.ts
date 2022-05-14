import { IntervalTimeEnum } from '@wellness/common';
import { range, SafeAny } from '@wellness/common';
import differenceInDays from 'date-fns/differenceInDays';
import getDay from 'date-fns/getDay';
import { get } from 'lodash';
type Options = {
  property: string;
};

export class ReportGrowthBuilder {
  private edges: [Date, Date];
  private options: Options;
  private data: SafeAny[];
  build(
    interval: IntervalTimeEnum,
    edges: [Date, Date],
    data: SafeAny[],
    options: Options
  ) {
    this.options = Object.assign({ property: 'createdAt' }, options);
    this.edges = edges;
    this.data = data;
    // switch (interval) {
    //   case IntervalTimeEnum.LAST_WEEK: {
    //   }
    // }
  }

  lastWeek() {
    const [start, end] = this.edges;
    const days = differenceInDays(start, end);
    const daysRange = range(1, -days);
    const daysCounter = this.makeCounter(daysRange);
    const growth = this.data.reduce((prev, curr) => {
      const day = getDay(curr[this.options.property]);
      if (day in prev) {
        prev[day] += 1;
        return prev;
      }
      return prev;
    }, daysCounter);
    return this.makeResults(growth, {});
  }
  makeResults(obj: Record<string, SafeAny>, mapper: SafeAny) {
    return Object.keys(obj).map((key) => {
      const label = get(mapper, key) || '';
      return {
        label,
        value: obj[key],
      };
    });
  }
  makeCounter(arr: number[]) {
    return arr.reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: 0,
      };
    }, {});
  }
}
