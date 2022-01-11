import { useSubscriptionsStore } from './suscription.store';
import { useCallback, useState } from 'react';
import { Activity } from '@wellness/admin-ui';

export const useActivityModal = () => {
  const { patch, activitiesCrudModal, activity } = useSubscriptionsStore();
  const [act, setAct] = useState<Activity | null>(activity);
  const openModal = useCallback(
    (clean = false) => {
      patch((state) => {
        if (clean) {
          state.activity = null;
          setAct(null);
        }
        state.activitiesCrudModal = {
          isOpen: true,
          mode: !clean ? 'edit' : 'create',
        };
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

  return { closeModal, openModal, ...activitiesCrudModal, activity: act };
};
