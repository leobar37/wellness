import _create from 'zustand';
import { pipe } from '@wellness/admin-ui/utils';
import { immer } from '@wellness/admin-ui/lib/zuztand';
import { TypeDataEnum , TypeDataAlertEnum } from "@wellness/admin-ui";
import { IntervalTimeEnum } from '@wellness/common';
import { combine } from 'zustand/middleware';
import { Updater } from 'use-immer';

const create = pipe(immer, _create) as typeof _create;

export const useDashboardStore = create(
  combine(
    {
      growthFilters: {
        interval: IntervalTimeEnum.LAST_WEEK as IntervalTimeEnum,
        typeData: TypeDataEnum.plans as TypeDataEnum,
      },
      alertsFilter : {
        typeData :  TypeDataAlertEnum.birthday as TypeDataAlertEnum
      }
    },
    (set, get) => ({
      patch: set as Updater<ReturnType<typeof get>>,
    })
  )
);
