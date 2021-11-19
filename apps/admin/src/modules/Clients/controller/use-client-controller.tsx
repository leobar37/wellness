import {
  useRegisterClientMutation,
  RegisterClientVariables,
} from '@wellness/admin-ui/common/generated-types';
import { useEffect } from 'react';
export const useClientsController = () => {
  const [mutRegisterClient, { loading, data }] = useRegisterClientMutation();

  useEffect(() => {
    console.log(data);
  }, [data]);
  const registerClient = (client: RegisterClientVariables['client']) => {
    mutRegisterClient({
      variables: {
        client,
      },
    });
  };

  return {
    registerClient,
  };
};
