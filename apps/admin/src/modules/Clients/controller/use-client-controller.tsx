import { useGetClientQuery, Client } from '@wellness/admin-ui/common';
import { ID, isValid } from '@wellness/common';
import { useClientsStore } from '../data/client-store';

import { useEffect } from 'react';
export type useClientControllerProps = {
  clientId?: ID;
};
const { patch } = useClientsStore.getState();

export const useClientController = ({ clientId }: useClientControllerProps) => {
  const { data: dataGetClient } = useGetClientQuery({
    variables: {
      id: clientId as string,
    },
  });
  useEffect(() => {
    if (isValid(dataGetClient?.client)) {
      console.log('added client');
      patch({
        selectClient: dataGetClient.client as Client,
      });
    }
  }, [dataGetClient]);

  return {
    client: dataGetClient?.client,
  };
};
