import { Flex, HStack, Radio, useDisclosure } from '@chakra-ui/react';
import { DatePicker, ImageUpload } from '@wellness/admin-ui';
import { Sex } from '@wellness/admin-ui/common';
import { ModalCrud } from '@wellness/admin-ui/components';
import { ChackraForm } from '@wellness/admin-ui/components/crud';
import { Formik } from 'formik';
import {
  InputControl,
  RadioGroupControl,
  SubmitButton,
  TextareaControl,
} from 'formik-chakra-ui';
import { useClientsController } from '../controller';
import { useClientsStore } from '../data/client-store';
import { SaveClientSchena } from '../data/schemas';
import { useToast, useTheme } from '@chakra-ui/react';

const { toggleClientModal } = useClientsStore.getState();

export const RegisterClientModal = () => {
  const { clientModal } = useClientsStore();
  const { registerClient } = useClientsController();

  const { isOpen, onClose } = useDisclosure({
    isOpen: clientModal,
    onClose: () => toggleClientModal(false),
    onOpen: () => toggleClientModal(true),
  });

  const toast = useToast();
  const theme = useTheme();

  // console.log(theme.components);

  return (
    <Formik<SaveClientSchena>
      initialValues={{
        name: '',
        lastName: '',
        direction: '',
        phone: '',
        dni: '',
        email: '',
        sex: '',
        note: '',
        birth: null,
        imageProfile: null,
      }}
      onSubmit={async (values, { setSubmitting, setValues }) => {
        const client = await registerClient(values);
        toast({
          status: 'success',
          description: 'Cliente correctamente creado',
        });
        console.log(client);
        onClose();
      }}
    >
      {({ handleSubmit, submitForm }) => (
        <ModalCrud
          isOpen={isOpen}
          onClose={onClose}
          textHeader="Registrar cliente"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          footer={
            <HStack>
              <SubmitButton onClick={submitForm}>Guardar</SubmitButton>
            </HStack>
          }
        >
          <ChackraForm submit={handleSubmit}>
            <Flex justifyContent="center" py="3">
              <ImageUpload name="imageProfile" />
            </Flex>
            <InputControl name="name" label="Nombre" />
            <InputControl name="lastName" label="Apellido" />
            <InputControl name="direction" label="Dirección" />
            <InputControl name="phone" label="Teléfono" />
            <InputControl name="dni" label="Dni" />
            <InputControl name="email" label="Email" />
            <DatePicker name="birth" label="Fecha de nacimiento" />
            <RadioGroupControl name="sex" label="Sexo">
              <Radio value={Sex.MEN}>Hombre</Radio>
              <Radio value={Sex.WOMEN}>Mujer</Radio>
              <Radio value={Sex.OTHER}>Otro</Radio>
            </RadioGroupControl>
            <TextareaControl name="note" label="Nota" />
          </ChackraForm>
        </ModalCrud>
      )}
    </Formik>
  );
};
