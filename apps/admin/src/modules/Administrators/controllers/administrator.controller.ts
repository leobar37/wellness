import {
  useRegisterAdminMutation,
  Role,
  useGetAdministratorsQuery,
  useEditAdministratorMutation,
  useResetPasswordMutation,
  useResetPasswordFromAdminMutation,
  useDeleteAdministratorMutation,
} from '@wellness/admin-ui/common';
import { useSomeTruthy } from '@wellness/admin-ui/hooks';
import {
  CreateAdminT,
  ChangePasswordSchemaFromAdmin,
  ChangePasswordSchema,
} from '../domain';
import { useAdministratorCrud } from '../data';
import { ID } from '@wellness/common';
import { useAuth } from '@wellness/admin-ui';

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
  const [resetPasswordMutation] = useResetPasswordMutation();
  const [resetPasswordFromAdminMutation] = useResetPasswordFromAdminMutation();
  const [deleteAdministrator] = useDeleteAdministratorMutation();
  const { refetch } = useGetAdministratorsQuery();
  const { temporal } = useAdministratorCrud();
  const auth = useAuth();

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

  const deleteAdministrador = async (id: string) => {
    const user = auth.currentUser();
    if (user) {
      const isSelf = user.id === id;
      if (isSelf) {
        console.log('called conditional');

        throw new Error('No puedes eliminarte a ti mismo');
      }
    }
    const result = await deleteAdministrator({
      variables: {
        id: id,
      },
    });
    refetch({});
    return result;
  };

  const editAdministrator = async (input: Partial<CreateAdminT>) => {
    if (temporal) {
      const result = await editAdministratorMutation({
        variables: {
          id: temporal.id,
          input: {
            dni: input.dni,
            email: input.email,
            lastName: input.lastName,
            name: input.name,
            role: input.role as Role,
          },
        },
      });
      refetch();
      return result.data.editAdministrator;
    }
    return null;
  };

  const editAdminstratorSelf = async (
    input: Partial<CreateAdminT> & { userId: string }
  ) => {
    const result = await editAdministratorMutation({
      variables: {
        id: input.userId,
        input: {
          dni: input.dni,
          email: input.email,
          lastName: input.lastName,
          name: input.name,
          role: input.role as Role,
        },
      },
    });
    return result.data.editAdministrator;
  };
  const resetPassword = async (
    values: ChangePasswordSchema & { userId: ID }
  ) => {
    const result = await resetPasswordMutation({
      variables: {
        input: {
          id: String(values.userId),
          newPassword: values.password,
          prevPassword: values.prevPassword,
        },
      },
    });

    return result.data.resetPassword;
  };

  const resetPasswordFromAdmin = async (
    values: ChangePasswordSchemaFromAdmin & { userId: ID }
  ) => {
    const result = await resetPasswordFromAdminMutation({
      variables: {
        input: {
          adminPassword: values.adminPassword,
          newPassword: values.password,
          userId: String(values.userId),
        },
      },
    });
    return result?.data?.resetPasswordFromAdmin;
  };

  return {
    registerAdmin,
    editAdministrator,
    resetPassword,
    editAdminstratorSelf,
    resetPasswordFromAdmin,
    deleteAdministrador,
  };
};
