import {
  useJoinPlanMutation,
  useJoinActivityMutation,
  useGetPlansQuery,
  Plan,
  useGetActivitiesQuery,
  Activity,
} from '@wellness/admin-ui/common';
import { useSomeTruthy } from '@wellness/admin-ui';
import { CreateContract } from '../domain';
import { useClientsStore } from '../data';
export const useSubContracts = () => {
  const [joinPlanMutation] = useJoinPlanMutation();
  const [joinActivityMutation] = useJoinActivityMutation();
  const { selectClient } = useClientsStore();
  const { data: dataPlans, loading: loadingPlan } = useGetPlansQuery({
    variables: {
      filters: {
        active: true,
      },
    },
  });
  const { data: dataActivities, loading: loadingActivity } =
    useGetActivitiesQuery({
      variables: {
        filters: {
          active: true,
        },
      },
    });
  const isLoading = useSomeTruthy(loadingPlan, loadingActivity);
  const joinPlan = async (values: CreateContract) => {
    const result = await joinPlanMutation({
      variables: {
        contract: {
          clientId: Number(selectClient.id),
          paid: values.paid,
          price: Number(values.price),
          note: values.note,
          planId: String(values.serviceId),
        },
      },
    });
  };
  const joinActivity = async (values: CreateContract) => {
    const result = await joinActivityMutation({
      variables: {
        contract: {
          clientId: Number(selectClient.id),
          paid: values.paid,
          price: Number(values.price),
          note: values.note,
          activityId: String(values.serviceId),
        },
      },
    });
  };

  return {
    plans: dataPlans?.getPlans as Plan[],
    activities: dataActivities?.getActivities as Activity[],
    joinPlan,
    isLoading,
    joinActivity,
  };
};
