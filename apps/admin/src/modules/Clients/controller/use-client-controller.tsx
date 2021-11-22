import { useGetClientQuery } from '@wellness/admin-ui/common';
import { ID } from '@wellness/common';
export type useClientControllerProps = {
  clientId?: ID;
};
export const useClientController = ({ clientId }: useClientControllerProps) => {
  const { data: dataGetClient } = useGetClientQuery({
    variables: {
      id: clientId as string,
    },
  });
  return {
    client: dataGetClient?.client,
  };
};
