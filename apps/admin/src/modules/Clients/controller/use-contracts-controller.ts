import { useSomeTruthy } from '@wellness/admin-ui';
import {
  Activity,
  ContractView,
  Plan,
  useDeleteContractMutation,
  useEditContractMutation,
  useGetActivitiesQuery,
  useGetPlansQuery,
  useGetViewContractsQuery,
  useJoinActivityMutation,
  useJoinPlanMutation,
} from '@wellness/admin-ui/common';
import { useEffect } from 'react';
import { useClientsStore, useContractsFeature } from '../data';
import { CreateContract } from '../domain';

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
    fetchPolicy: 'network-only',
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
  const [editContractMutation] = useEditContractMutation();
  const [deleteContractMutation] = useDeleteContractMutation();
  const { selectClient, refetchClientReport } = useClientsStore();
  const [{ refetch }] = useContractsFeature();

  const { data: dataPlans, loading: loadingPlan } = useGetPlansQuery({
    variables: {
      filters: {
        active: true,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: dataActivities, loading: loadingActivity } =
    useGetActivitiesQuery({
      variables: {
        filters: {
          active: true,
        },
      },
      fetchPolicy: 'cache-and-network',
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
    refetch?.();
    refetchClientReport();
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
    refetch?.();
  };

  const editContract = async (id: string, values: CreateContract) => {
    const result = await editContractMutation({
      variables: {
        input: {
          contractId: id,
          paid: values.paid,
          price: Number(values.price),
          note: values.note,
        },
      },
    });
    refetchClientReport();
    refetch?.();
    return result.data.editContract as ContractView;
  };

  const deleteContract = async (id: string) => {
    const result = await deleteContractMutation({
      variables: {
        id: id,
      },
    });
    refetchClientReport();
    return result.data.deleteContract as ContractView;
  };

  return {
    plans: dataPlans?.getPlans as Plan[],
    activities: dataActivities?.getActivities as Activity[],
    joinPlan,
    isLoading,
    joinActivity,
    editContract,
    deleteContract,
  };
};
