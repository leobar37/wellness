import { FC } from 'react';
import { BaseLayout, Layout } from '@wellness/admin-ui';
import { NextPageWithLayout, ChackraForm } from '@wellness/admin-ui';
import { VStack, Badge, Button } from '@chakra-ui/react';
import { useAuth, rolMapper } from '@wellness/admin-ui';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
export const AdminProfile: NextPageWithLayout = () => {
  const { user } = useAuth();

  return (
    <Layout backText="Perfil de usuario">
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <ChackraForm justifyContent={'start'} maxWidth={'650px'}>
            <Badge>{rolMapper[user.rol]}</Badge>
            <InputControl name="as" label="Nombres" />
            <InputControl name="as" label="Apellidos" />
            <InputControl name="as" itemType="email" label="Email" />
            <Button colorScheme={'teal'}>Cambiar contraseña</Button>
          </ChackraForm>
        )}
      </Formik>
    </Layout>
  );
};

AdminProfile.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
