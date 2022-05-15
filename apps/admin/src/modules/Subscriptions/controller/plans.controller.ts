import {
  useGetPlansQuery,
  Plan,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from '@wellness/admin-ui';
import { usePlansFeature } from '../data';
import { useEffect } from 'react';
import { CreatePlan } from '../domain/schemas';
import { usePlanModal } from '../data';
import { useRouter } from 'next/router';
export const useInitPlansController = () => {
  const { data: plansData, loading } = useGetPlansQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [{ plans }, { setPlans }] = usePlansFeature();
  useEffect(() => {
    if (plansData?.getPlans) {
      setPlans(plansData?.getPlans as Plan[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plansData]);
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
  const { closeModal } = usePlanModal();
  const router = useRouter();
  const [{ plan }, { addPlan, patchPlansStore }] = usePlansFeature();

  /** Create a plan */
  const createPlan = async (input: CreatePlan) => {
    const result = await createPlanMutation({
      variables: {
        input: mapInputPlan(input),
      },
    });
    closeModal();
    addPlan(result.data.createPlan as Plan);
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
    closeModal();
    return result.data.updatePlan;
  };

  /** delete plan */
  const deletePlan = async () => {
    const result = await deleteMutation({
      variables: {
        id: plan.id,
      },
    });
    router.push('./');
    return result.data.deletePlan as Plan;
  };
  return {
    createPlan,
    editPlan,
    deletePlan,
  };
};
