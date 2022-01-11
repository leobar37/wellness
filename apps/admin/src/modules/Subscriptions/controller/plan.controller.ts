import { useGetPlanQuery, Plan } from '@wellness/admin-ui';
import { usePlansFeature } from '../data';
import { useEffect } from 'react';
import { useSomeTruthy } from '@wellness/admin-ui';
type Options = {
  planId: string;
};
export const useInitPlanController = ({ planId }: Options) => {
  const { data: dataPlan, loading } = useGetPlanQuery({
    variables: {
      id: planId,
    },
  });
  const isLoading = useSomeTruthy(loading, !dataPlan?.getPlan);
  const [{ plan }, { patchPlansStore }] = usePlansFeature();

  useEffect(() => {
    if (dataPlan?.getPlan)
      patchPlansStore((state) => {
        state.plan = dataPlan.getPlan as Plan;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlan]);

  return { plan, isLoading };
};
