import * as React from 'react';
import { Button, useDisclosure, HStack, Radio, Flex } from '@chakra-ui/react';
import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import { ModeRegiser, Sex } from '@wellness/admin-ui/common';
import { BaseLayout, Layout, ModalCrud } from '@wellness/admin-ui/components';
import { ChackraForm, SaveActions } from '@wellness/admin-ui/components/crud';
import { Formik } from 'formik';
import {
  InputControl,
  TextareaControl,
  SubmitButton,
  RadioGroupControl,
} from 'formik-chakra-ui';
import * as yup from 'yup';
import { Asserts } from 'yup';
import { useClientsController } from '../controller';
import { ImageUpload } from '@wellness/admin-ui';
import { DatePicker } from '@wellness/admin-ui';
import { useClientsStore } from '../data/client-store';
const clientSchema = yup.object({
  name: yup.string().required(),
  imageProfile: yup.mixed().required(),
  email: yup.string().required(),
  birth: yup.date().nullable(),
  phone: yup.string().nullable(),
  direction: yup.string().nullable(),
  note: yup.string().required(),
  dni: yup.string().required(),
  lastName: yup.string().required(),
  sex: yup.mixed().oneOf([Sex.MEN, Sex.OTHER, Sex.WOMEN]),
});

export type ClientSchena = Asserts<typeof clientSchema>;
const { toggleClientModal } = useClientsStore.getState();

export const RegisterClientModal = () => {
  const { clientModal } = useClientsStore();
  const { isOpen, onClose } = useDisclosure({
    isOpen: clientModal,
    onClose: () => toggleClientModal(false),
    onOpen: () => toggleClientModal(true),
  });

  const { registerClient } = useClientsController();

  return (
    <Formik<ClientSchena>
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
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
        registerClient({
          direction: values.direction,
          dni: values.dni,
          email: values.email,
          lastName: values.lastName,
          modeRegister: ModeRegiser.ADMIN,
          note: values.note,
          name: values.name,
          birthday: values.birth,
          sex: values.sex,
        });
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
