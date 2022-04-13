import {
  useRegisterAdminMutation,
  Role,
  useGetAdministratorsQuery,
  useEditAdministratorMutation,
} from '@wellness/admin-ui/common';
import { useSomeTruthy } from '@wellness/admin-ui/hooks';
import { CreateAdminT } from '../domain';
import { useAdministratorCrud } from '../data';

export const useAdministratorInit = () => {
  const { data: administratorsData, loading } = useGetAdministratorsQuery();

  const isLoading = useSomeTruthy(loading);
  return {
    administrators: administratorsData?.getAdministrators,
    isLoading,
  };
};

export const useAdministratorController = () => {
  const [registerAdminMutation] = useRegisterAdminMutation();
  const [editAdministratorMutation] = useEditAdministratorMutation();
  const { refetch } = useGetAdministratorsQuery();
  const { temporal } = useAdministratorCrud();
  const registerAdmin = async (input: CreateAdminT) => {
    const result = await registerAdminMutation({
      variables: {
        input: {
          dni: input.dni,
          email: input.email,
          lastName: input.lastName,
          name: input.name,
          password: input.password,
          role: input.role as Role,
        },
      },
    });
    refetch({});
    return result.data.registerAdmin;
  };

  const editAdministrator = async (input: CreateAdminT) => {
    if (temporal) {
      const result = await editAdministratorMutation({
        variables: {
          id: temporal.id,
          input: {
            dni: input.dni,
            email: input.email,
            lastName: input.lastName,
            name: input.name,
            password: input.password,
            role: input.role as Role,
          },
        },
      });
      refetch();
      return result.data.editAdministrator;
    }
    return null;
  };

  return { registerAdmin, editAdministrator };
};
