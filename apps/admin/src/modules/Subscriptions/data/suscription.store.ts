import { immer } from '@wellness/admin-ui/lib/zuztand';
import { makeToggle, pipe } from '@wellness/admin-ui/utils';
import { Activity } from '@wellness/admin-ui/common';
import _create from 'zustand';
import { useCallback } from 'react';
import { combine } from 'zustand/middleware';
import { ModeAction } from '@wellness/admin-ui';
const create = pipe(immer, _create) as typeof _create;

const initialState = {
  activitiesCrudModal: {
    isOpen: false,
    mode: 'edit' as ModeAction,
  },
  activity: null as Activity | null,
  activities: [] as Activity[],
  selectDeleteActivities: [] as Activity[],
};

export type SubscriptionsState = typeof initialState;
export const useSubscriptionsStore = create(
  combine(initialState, (set) => ({
    toggleActivitiesCrudModal: makeToggle('activitiesCrudModal', set),
    addActivity: (activity: Activity) => {
      console.log('add ', activity);

      set((state) => {
        state.activities.push(activity);
      });
    },
    patch: set,
  }))
);

export const useActivityModal = () => {
  const { patch, activitiesCrudModal, activity } = useSubscriptionsStore();

  const openModal = useCallback(
    (activity?: Activity) => {
      patch((state) => {
        state.activity = activity;
        state.activitiesCrudModal = {
          isOpen: true,
          mode: activity ? 'edit' : 'create',
        };
      });
    },
    [patch]
  );

  const closeModal = useCallback(() => {
    patch((state) => {
      state.activitiesCrudModal.isOpen = false;
      state.activity = null;
    });
  }, [patch]);

  return { closeModal, openModal, ...activitiesCrudModal, activity };
};
