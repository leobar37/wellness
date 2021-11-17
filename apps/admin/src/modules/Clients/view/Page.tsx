import React from 'react';
import { Layout, ModalCrud } from '@wellness/admin-ui/components';
import {
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { SaveActions, ChackraForm } from '@wellness/admin-ui/components/crud';
import { useClientsController } from '../controller';
import * as yup from 'yup';
import { Asserts } from 'yup';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { ModeRegiser, Sex } from '@wellness/admin-ui/common';
import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout } from '@wellness/admin-ui/components';
import { SafeAny } from '@wellness/common';

const clientSchema = yup.object({
  name: yup.string().required(),
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

export const Page: NextPageWithLayout<SafeAny> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { registerClient } = useClientsController();

  return (
    <Layout
      backText="Clientes"
      actions={<Button onClick={onOpen}>Crear</Button>}
    >
      <Formik<ClientSchena>
        initialValues={{
          birth: null,
          direction: '',
          email: '',
          name: '',
          note: '',
          lastName: '',
          dni: '',
          phone: '',
          sex: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
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
        {({ handleSubmit }) => (
          <ModalCrud
            isOpen={isOpen}
            onClose={onClose}
            textHeader="Registrar cliente"
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            footer={<SaveActions onCancel={() => {}} onSave={() => {}} />}
          >
            <ChackraForm submit={handleSubmit}>
              <InputControl name="name" label="Nombre" />
              <InputControl name="email" label="Email" />
              <InputControl name="direction" label="Dirección" />
              <InputControl name="phone" label="Teléfono" />
            </ChackraForm>
          </ModalCrud>
        )}
      </Formik>
    </Layout>
  );
};

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
