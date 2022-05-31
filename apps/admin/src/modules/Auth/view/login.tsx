import { Flex, FormControl, FormLabel, Link, useToast } from '@chakra-ui/react';
import { ChackraForm, NextPageWithLayout, useAuth } from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Authlayout } from '../components';
import { LoginInputType } from '../domain';
import { PasswordInput } from '@wellness/admin-ui';
const Form = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <ChackraForm submit={handleSubmit}>
      <InputControl label="Correo" name="email" />
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <PasswordInput name="password" />
      </FormControl>
      <Flex w={'full'} direction={'column'} alignItems={'center'} gridGap={'4'}>
        <Link as="a" color={'blackAlpha.700'}>
          ¿Olvidaste tu contraseña?
        </Link>
        <SubmitButton type="submit" mx={'auto'}>
          Ingresar
        </SubmitButton>
      </Flex>
    </ChackraForm>
  );
};
export const LoginPage: NextPageWithLayout = () => {
  const { login, currentUser, isLoggedIn } = useAuth();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const user = currentUser();
    if (user) {
      router.push('/app');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Formik<LoginInputType>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        try {
          await login(values.email, values.password);
          router.push('/app');
        } catch (error) {
          toast({
            status: 'error',
            description: 'Usuario o contraseña incorrectos',
          });
        }
      }}
    >
      <Form />
    </Formik>
  );
};

LoginPage.getLayout = (page) => {
  return <Authlayout>{page}</Authlayout>;
};
