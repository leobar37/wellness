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
} from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect, useState } from 'react';
import { UpdateAdminT } from '../domain';
import { useChangePasswordModal } from '../data';
import { ChangePasswordModal } from '../components';
import { useAdministratorController } from '../controllers';
import { FC } from 'react';

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
  } = useFormikContext<UpdateAdminT>();

  const buttonIsValid =
    Object.entries(touched).some(([, value]) => value) && isValid && dirty;

  useEffect(() => {
    setValues({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    });
    setTouched({
      name: false,
      lastName: false,
      email: false,
    });
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
        <Button onClick={submitForm} disabled={!buttonIsValid}>
          Guardar cambios
        </Button>
      </Stack>
    </ChackraForm>
  );
};

export const AdminProfile: NextPageWithLayout = () => {
  const { user } = useAuth();
  const { editAdminstratorSelf } = useAdministratorController();
  const toast = useWellnessToast();

  if (!user) {
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
        <Form user={user} />
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
