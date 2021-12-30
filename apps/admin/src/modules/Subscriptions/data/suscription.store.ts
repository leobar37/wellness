import { immer } from '@wellness/admin-ui/lib/zuztand';
import { makeToggle, pipe } from '@wellness/admin-ui/utils';
import { Activity } from '@wellness/admin-ui/common';
import _create from 'zustand';
import { combine } from 'zustand/middleware';

const create = pipe(immer, _create) as typeof _create;

export const useSubscriptionsStore = create(
  combine(
    {
      activitiesCrudModal: false,
      activities: [] as Activity[],
      selectDeleteActivities: [] as Activity[],
    },
    (set) => ({
      toggleActivitiesCrudModal: makeToggle('activitiesCrudModal', set),
      addActivity: (activity: Activity) => {
        set((state) => {
          state.activities.push(activity);
        });
      },
      patch: set,
    })
  )
);
