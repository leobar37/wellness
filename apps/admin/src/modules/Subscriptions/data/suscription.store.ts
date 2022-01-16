import { immer } from '@wellness/admin-ui/lib/zuztand';
import { makeToggle, pipe } from '@wellness/admin-ui/utils';
import { Activity } from '@wellness/admin-ui/common';
import _create from 'zustand';
import { combine } from 'zustand/middleware';
import { ModeAction, Plan, ContractView } from '@wellness/admin-ui';
const create = pipe(immer, _create) as typeof _create;

const initialState = {
  activitiesCrudModal: {
    isOpen: false,
    mode: 'edit' as ModeAction,
  },
  showContract: {
    isOpen: false,
    contract: null as ContractView | null,
  },
  contracts: [] as ContractView[],
  activity: null as Activity | null,
  activities: [] as Activity[],
  selectDeleteActivities: [] as Activity[],
  plansStore: {
    plans: [] as Plan[],
    crudModal: {
      isOpen: false,
      mode: 'edit' as ModeAction,
      plan: null as Plan | null,
    },
    // selected plan
    plan: null as Plan | null,
    selectPlansForDelete: [] as Plan[],
  },
};

export type SubscriptionsState = typeof initialState;

export const useSubscriptionsStore = create(
  combine(initialState, (set) => ({
    toggleActivitiesCrudModal: makeToggle('activitiesCrudModal', set),
    addActivity: (activity: Activity) => {
      set((state) => {
        state.activities.push(activity);
      });
    },
    patch: set,
  }))
);
