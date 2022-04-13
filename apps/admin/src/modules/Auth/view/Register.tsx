import { NextPageWithLayout, ChackraForm } from '@wellness/admin-ui';
import { Authlayout } from '../components';
import { Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';

const DetailUser = () => {
  return (
    <>
      <VStack>
        <Text fontWeight={'bold'}>Hola hola@gmail.com</Text>
        <Text textAlign={'center'} fontWeight={'normal'}>
          Se acaba de activar tu cuenta, vamos a pedir unos datos más antes de
          continuar.
        </Text>
      </VStack>
      <InputControl label="Usuario" name="name" />
      <InputControl label="Nombre" name="name" />
      <InputControl label="Apellidos" name="name" />
      <InputControl label="Dni" name="name" />
      <Flex w={'full'} direction={'column'} alignItems={'end'} gridGap={'4'}>
        <SubmitButton>Siguiente</SubmitButton>
      </Flex>
    </>
  );
};

const PasswordForm = () => {
  return (
    <>
      <Text textAlign={'center'} fontWeight={'bold'} fontSize={'xl'}>
        Ingrese su Contraseña{' '}
      </Text>
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <Input type={'password'} />
      </FormControl>
      <FormControl>
        <FormLabel>Repetir contraseña</FormLabel>
        <Input type={'password'} />
      </FormControl>
      <Flex w={'full'} direction={'column'} alignItems={'end'} gridGap={'4'}>
        <SubmitButton>Siguiente</SubmitButton>
      </Flex>
    </>
  );
};

const Form = () => {
  return (
    <ChackraForm>
      <PasswordForm />
    </ChackraForm>
  );
};

export const Register: NextPageWithLayout = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form />
    </Formik>
  );
};

Register.getLayout = (page) => {
  return <Authlayout>{page}</Authlayout>;
};
