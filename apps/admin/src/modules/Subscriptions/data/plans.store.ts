import { useSubscriptionsStore } from './suscription.store';
import { useCallback, useState } from 'react';
import { isFunction } from '@chakra-ui/utils';
import { Plan } from '@wellness/admin-ui';
import produce from 'immer';

import { SubscriptionsState } from './suscription.store';
const { patch } = useSubscriptionsStore.getState();

export const usePlansFeature = () => {
  const plansStore = useSubscriptionsStore(
    useCallback((state) => state.plansStore, [])
  );
  const patchPlansStore = (
    partialState: (partial: SubscriptionsState['plansStore']) => void
  ) => {
    if (isFunction(partialState)) {
      const planStore = produce(plansStore, partialState);
      patch({
        plansStore: planStore,
      });
    } else {
      patch({
        plansStore: partialState,
      });
    }
  };

  const setPlans = (plans: Plan[]) => {
    patchPlansStore((state) => {
      state.plans = plans;
    });
  };

  return [plansStore, { patchPlansStore, setPlans }] as const;
};

export const usePlanModal = () => {
  const [{ crudModal, plan }] = usePlansFeature();
  const [pl, setPl] = useState(crudModal.plan);
  const openModal = (edit = false) => {
    patch((state) => {
      const _crudModal = state.plansStore.crudModal;
      state.plansStore.crudModal.isOpen = true;
      if (!edit) {
        _crudModal.plan = null;
        setPl(null);
        _crudModal.mode = 'create';
      } else {
        _crudModal.mode = 'edit';

        _crudModal.plan = plan;
      }
    });
  };
  const closeModal = () => {
    patch((state) => {
      state.plansStore.crudModal = {
        isOpen: false,
        mode: 'edit',
        plan: null,
      };
    });
  };

  return { openModal, closeModal, plan: pl, ...crudModal };
};
