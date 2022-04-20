import { Flex, FormControl, FormLabel, Link, useToast } from '@chakra-ui/react';
import { ChackraForm, NextPageWithLayout, useAuth } from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import { Authlayout } from '../components';
import { LoginInputType } from '../domain';
const Form = () => {
  const { handleSubmit } = useFormikContext();

  return (
    <ChackraForm submit={handleSubmit}>
      <InputControl label="Correo" name="email" />
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <InputControl
          inputProps={{
            type: 'password',
          }}
          name="password"
        />
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
  const toast = useToast();
  const router = useRouter();

  return (
    <Formik<LoginInputType>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        try {
          console.log(values);

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
