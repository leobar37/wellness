import {
  useJoinPlanMutation,
  useJoinActivityMutation,
  useGetPlansQuery,
  Plan,
  useGetActivitiesQuery,
  Activity,
  useGetViewContractsQuery,
  ContractView,
} from '@wellness/admin-ui/common';
import { useSomeTruthy } from '@wellness/admin-ui';
import { CreateContract } from '../domain';
import { useClientsStore, useContractsFeature } from '../data';
import { useEffect } from 'react';

type InitOptions = {
  clientId: string;
};
export const useInitSubContracts = ({ clientId }: InitOptions) => {
  const { data, loading, refetch } = useGetViewContractsQuery({
    variables: {
      filters: {
        clientId: clientId,
      },
    },
  });
  const [, { patchContractsStore }] = useContractsFeature();
  useEffect(() => {
    patchContractsStore((state) => {
      state.refetch = refetch;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);
  return {
    isloading: loading,
    contracts: data?.getViewContracts as ContractView[],
    refetchContracts: refetch,
  };
};

export const useSubContracts = () => {
  const [joinPlanMutation] = useJoinPlanMutation();
  const [joinActivityMutation] = useJoinActivityMutation();
  const { selectClient } = useClientsStore();
  const [{ refetch }] = useContractsFeature();

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
    refetch();
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
    refetch();
  };

  return {
    plans: dataPlans?.getPlans as Plan[],
    activities: dataActivities?.getActivities as Activity[],
    joinPlan,
    isLoading,
    joinActivity,
  };
};
