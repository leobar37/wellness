import { useGetClientQuery, Client } from '@wellness/admin-ui/common';
import { ID, isValid } from '@wellness/common';
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
  });
  const isLoading = useSomeTruthy(loading, !dataGetClient?.client);

  useEffect(() => {
    if (isValid(dataGetClient?.client)) {
      patch({
        selectClient: dataGetClient.client as Client,
      });
    }
  }, [dataGetClient]);

  return {
    client: dataGetClient?.client,
    isLoading,
  };
};

export const useClientController = ({ clientId }: useClientControllerProps) => {
  return {};
};
