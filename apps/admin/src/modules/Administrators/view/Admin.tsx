import { Badge, Button, Stack } from '@chakra-ui/react';
import {
  BaseLayout,
  ChackraForm,
  Layout,
  NextPageWithLayout,
  rolMapper,
  useAuth,
} from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect, useState } from 'react';
import { UpdateAdminT } from '../domain';
import { useChangePasswordModal } from '../data';
import { ChangePasswordModal } from '../components';

const Form = () => {
  const { user } = useAuth();
  const changePasswordModal = useChangePasswordModal();
  const [reset, setReset] = useState(false);
  const { handleSubmit, setValues, isValid, touched, setTouched } =
    useFormikContext<UpdateAdminT>();

  const buttonIsValid =
    Object.entries(touched).some(([, value]) => value) && isValid;

  useEffect(() => {
    setValues({
      name: user.name,
      email: user.email,
      lastName: user.lastName,
    });
    setTouched({
      email: false,
      lastName: false,
      name: false,
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
        <Button disabled={!buttonIsValid}>Guardar cambios</Button>
      </Stack>
    </ChackraForm>
  );
};

export const AdminProfile: NextPageWithLayout = () => {
  return (
    <Layout backText="Perfil de usuario">
      <Formik<UpdateAdminT>
        initialValues={{
          email: '',
          lastName: '',
          name: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form />
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
