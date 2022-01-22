import {
  Box,
  Center,
  Flex,
  Link,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ChackraForm, Logo, NextPageWithLayout } from '@wellness/admin-ui';
import { Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { Authlayout } from '../components';
const Form = () => {
  return (
    <ChackraForm>
      <InputControl label="Correo" name="email" />
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <Input type={'password'} />
      </FormControl>

      <Flex w={'full'} direction={'column'} alignItems={'center'} gridGap={'4'}>
        <Link as="a" color={'blackAlpha.700'}>
          ¿Olvidaste tu contraseña?
        </Link>
        <SubmitButton mx={'auto'}>Ingresar</SubmitButton>
      </Flex>
    </ChackraForm>
  );
};
export const LoginPage: NextPageWithLayout = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form />
    </Formik>
  );
};

LoginPage.getLayout = (page) => {
  return <Authlayout>{page}</Authlayout>;
};
