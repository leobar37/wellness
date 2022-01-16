import {
  Activity,
  ContractView,
  ServiceType,
  useGetActivityQuery,
  useGetViewContractsQuery,
} from '@wellness/admin-ui/common';
import { useSomeTruthy } from '@wellness/admin-ui/hooks';
import { isValid } from '@wellness/common';
import { useEffect } from 'react';
import { useSubscriptionsStore } from '../data';
const { patch } = useSubscriptionsStore.getState();
type Options = {
  activityId: string;
};

export const useInitActivyController = ({ activityId }: Options) => {
  const {
    data: dataActivity,
    loading,
    error,
  } = useGetActivityQuery({
    variables: {
      id: activityId,
    },
    skip: !isValid(activityId),
  });

  const { data: dataViewContracts, refetch } = useGetViewContractsQuery({
    variables: {
      filters: {
        serviceId: String(activityId),
        type: ServiceType.activity,
      },
    },
    skip: !isValid(activityId),
  });

  const isLoading = useSomeTruthy(
    loading,
    !dataActivity?.getActivity,
    !dataViewContracts?.getViewContracts
  );
  const { contracts } = useSubscriptionsStore();
  useEffect(() => {
    if (dataActivity?.getActivity) {
      patch((state) => {
        state.activity = dataActivity?.getActivity as Activity;
      });
    }
    if (dataViewContracts?.getViewContracts) {
      patch((state) => {
        state.contracts = dataViewContracts?.getViewContracts as ContractView[];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataActivity?.getActivity, dataViewContracts?.getViewContracts]);

  return {
    activity: dataActivity?.getActivity as Activity,
    isLoading,
    contracts,
    error,
  };
};
