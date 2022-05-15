import { Badge, Button, Stack } from '@chakra-ui/react';
import {
  BaseLayout,
  ChackraForm,
  Layout,
  NextPageWithLayout,
  rolMapper,
  useAuth,
  TokenUser,
  useWellnessToast,
  useGetAdministratorQuery,
} from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect, useState } from 'react';
import { UpdateAdminT } from '../domain';
import { useChangePasswordModal } from '../data';
import { ChangePasswordModal } from '../components';
import { useAdministratorController } from '../controllers';
import { FC } from 'react';
import { useChangues } from '@wellness/admin-ui';
const Form: FC<{ user: TokenUser }> = ({ user }) => {
  const changePasswordModal = useChangePasswordModal();
  const [reset, setReset] = useState(false);
  const {
    handleSubmit,
    setValues,
    isValid,
    touched,
    setTouched,
    dirty,
    submitForm,
    values,
    isSubmitting,
  } = useFormikContext<UpdateAdminT>();
  const changesApi = useChangues(values);

  const buttonIsInValid = !isValid || isSubmitting || !changesApi.hasChanges;

  useEffect(() => {
    if (user) {
      const values = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      };
      setValues(values);
      changesApi.toCompare(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValues, user, setTouched, reset]);

  return (
    <ChackraForm
      submit={handleSubmit}
      justifyContent={'start'}
      maxWidth={'650px'}
    >
      <Badge>{rolMapper[user.rol]}</Badge>
      <InputControl name="name" label="Nombres" />
      <InputControl name="lastName" label="Apellidos" />
      <InputControl name="email" itemType="email" label="Email" />
      <Button
        colorScheme={'teal'}
        onClick={() => changePasswordModal.openModal(user.id)}
      >
        Cambiar contraseña
      </Button>
      <Stack direction={'row'} w="full" spacing={2} justifyContent={'flex-end'}>
        <Button
          variant={'ghost'}
          onClick={() => {
            setReset(!reset);
          }}
        >
          Descartar cambios
        </Button>
        <Button onClick={submitForm} disabled={buttonIsInValid}>
          Guardar cambios
        </Button>
      </Stack>
    </ChackraForm>
  );
};

export const AdminProfile: NextPageWithLayout = () => {
  const { currentUser } = useAuth();
  const { editAdminstratorSelf } = useAdministratorController();
  const toast = useWellnessToast();
  const user = currentUser();
  const { data: userData, loading } = useGetAdministratorQuery({
    skip: !user,
    variables: {
      id: user?.id,
    },
  });
  if (loading || !userData || !user) {
    return null;
  }
  return (
    <Layout backText="Perfil de usuario">
      <Formik<UpdateAdminT>
        initialValues={{
          email: '',
          lastName: '',
          name: '',
        }}
        onSubmit={async (values) => {
          await editAdminstratorSelf({
            dni: user.dni,
            lastName: values.lastName,
            email: values.email,
            name: values.name,
            role: user.rol,
            userId: user.id,
          });
          toast({
            description: 'Datos actualizados correctamente',
          });
        }}
      >
        <Form user={userData?.getAdministrator} />
      </Formik>
    </Layout>
  );
};

AdminProfile.getLayout = (page) => {
  return (
    <BaseLayout>
      {page}
      <ChangePasswordModal />
    </BaseLayout>
  );
};
