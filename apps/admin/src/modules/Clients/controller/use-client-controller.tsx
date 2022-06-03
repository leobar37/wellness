import {
  useGetClientQuery,
  useClientReportQuery,
  Client,
} from '@wellness/admin-ui/common';
import { ID, isValid, SafeAny } from '@wellness/common';
import { useClientsStore } from '../data/client-store';
import { useSomeTruthy } from '@wellness/admin-ui';
import { useEffect } from 'react';

export type useClientControllerProps = {
  clientId?: ID;
};
const { patch } = useClientsStore.getState();

export const useInitClientController = ({
  clientId,
}: useClientControllerProps) => {
  const { data: dataGetClient, loading } = useGetClientQuery({
    variables: {
      id: clientId as string,
    },
    skip: !isValid(clientId),
    onCompleted: (data) => {
      console.log('data');
      console.log(data);

      patch({
        selectClient: data.client as Client,
      });
    },
  });

  const {
    data: dataReport,
    loading: loadingReport,
    refetch: refetchReports,
  } = useClientReportQuery({
    variables: {
      clientId: clientId as string,
    },
    skip: !isValid(clientId),
    onCompleted: (data) => {
      patch({
        clientReport: data.clientReport as SafeAny,
      });
    },
  });

  useEffect(() => {
    patch({
      refetchClientReport: refetchReports,
    });
  }, [refetchReports]);

  const isLoading = useSomeTruthy(
    loading,
    loadingReport,
    !dataGetClient?.client
  );

  return {
    client: dataGetClient?.client,
    isLoading,
  };
};

export const useClientController = ({ clientId }: useClientControllerProps) => {
  return {};
};
