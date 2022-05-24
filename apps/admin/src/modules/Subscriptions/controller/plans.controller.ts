import {
  Plan,
  useCreatePlanMutation,
  useDeletePlanMutation,
  useGetPlansQuery,
  useUpdatePlanMutation,
} from '@wellness/admin-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePlansFeature } from '../data';
import { CreatePlan } from '../domain/schemas';

export const useInitPlansController = () => {
  const {
    data: plansData,
    loading,
    refetch,
  } = useGetPlansQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [{ plans }, { setPlans, patchPlansStore }] = usePlansFeature();
  useEffect(() => {
    if (plansData?.getPlans) {
      setPlans(plansData?.getPlans as Plan[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plansData]);

  useEffect(() => {
    patchPlansStore((state) => {
      state.refetchPlans = refetch;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return {
    plans: plans,
    isloading: loading,
  };
};

const mapInputPlan = (input: CreatePlan) => {
  return {
    active: input.active,
    detail: {
      description: input.description,
      name: input.name,
      price: Number(input.price),
    },
    duration: Number(input.duration),
    visible: input.visible,
  };
};

export const usePlansController = () => {
  const [createPlanMutation] = useCreatePlanMutation();
  const [updateMutation] = useUpdatePlanMutation();
  const [deleteMutation] = useDeletePlanMutation();
  const router = useRouter();
  const [{ plan, refetchPlans }, { patchPlansStore }] = usePlansFeature();

  /** Create a plan */
  const createPlan = async (input: CreatePlan) => {
    const result = await createPlanMutation({
      variables: {
        input: mapInputPlan(input),
      },
    });
    refetchPlans();
    return result.data.createPlan;
  };

  /** edit a plan */
  const editPlan = async (input: CreatePlan) => {
    const result = await updateMutation({
      variables: {
        id: plan.id,
        input: mapInputPlan(input),
      },
    });
    patchPlansStore((state) => {
      state.plan = result.data.updatePlan as Plan;
    });
    refetchPlans();
    return result.data.updatePlan;
  };

  /** delete plan */
  const deletePlan = async () => {
    const result = await deleteMutation({
      variables: {
        id: plan.id,
      },
    });
    refetchPlans();
    router.push('./');
    return result.data.deletePlan as Plan;
  };
  return {
    createPlan,
    editPlan,
    deletePlan,
  };
};
