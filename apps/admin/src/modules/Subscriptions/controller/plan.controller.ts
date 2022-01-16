import {
  useGetPlanQuery,
  Plan,
  useGetViewContractsQuery,
  ServiceType,
  ContractView,
} from '@wellness/admin-ui';
import { usePlansFeature } from '../data';
import { useCallback, useEffect } from 'react';
import { useSomeTruthy } from '@wellness/admin-ui';
import { useSubscriptionsStore } from '../data';
type Options = {
  planId: string;
};
export const useInitPlanController = ({ planId }: Options) => {
  const { data: dataPlan, loading } = useGetPlanQuery({
    variables: {
      id: planId,
    },
  });
  const { data: dataContracts } = useGetViewContractsQuery({
    variables: {
      filters: {
        serviceId: planId,
        type: ServiceType.plan,
      },
    },
    fetchPolicy: 'network-only',
  });
  const { patch } = useSubscriptionsStore();
  const contracts = useSubscriptionsStore(
    useCallback((state) => state.contracts, [])
  );
  const isLoading = useSomeTruthy(loading, !dataPlan?.getPlan);
  const [{ plan }, { patchPlansStore }] = usePlansFeature();

  useEffect(() => {
    if (dataPlan?.getPlan)
      patchPlansStore((state) => {
        state.plan = dataPlan.getPlan as Plan;
      });

    if (dataContracts?.getViewContracts) {
      patch((state) => {
        state.contracts = dataContracts?.getViewContracts as ContractView[];
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlan, dataContracts?.getViewContracts]);

  return { plan, isLoading, contracts: contracts };
};
