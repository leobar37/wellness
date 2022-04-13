import { Flex, FormControl, FormLabel, Input, Link } from '@chakra-ui/react';
import { ChackraForm, NextPageWithLayout, useAuth } from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { Authlayout } from '../components';
import { LoginInputType } from '../domain';
import { useRouter } from 'next/router';
const Form = () => {
  const { handleSubmit } = useFormikContext();

  return (
    <ChackraForm submit={handleSubmit}>
      <InputControl label="Correo" name="email" />
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <Input type={'password'} name="password" />
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
  const { login, user, isLoggedIn } = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/app');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <Formik<LoginInputType>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        await login(values.email, values.password);
      }}
    >
      <Form />
    </Formik>
  );
};

LoginPage.getLayout = (page) => {
  return <Authlayout>{page}</Authlayout>;
};
