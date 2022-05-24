import { useSubscriptionsStore } from './suscription.store';
import { useCallback, useState } from 'react';
import { Activity } from '@wellness/admin-ui';

export const useActivityModal = () => {
  const { patch, activitiesCrudModal, activity } = useSubscriptionsStore();

  const openModal = useCallback(
    (activity?: Activity) => {
      patch((state) => {
        state.activitiesCrudModal = {
          isOpen: true,
          mode: activity ? 'edit' : 'create',
        };
        state.activity = activity;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
