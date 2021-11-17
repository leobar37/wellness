import {
  useRegisterClientMutation,
  RegisterClientVariables,
} from '@wellness/admin-ui/common/generated-types';
export const useClientsController = () => {
  const [mutRegisterClient, { loading, data }] = useRegisterClientMutation();

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
