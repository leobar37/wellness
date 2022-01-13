/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  HStack,
  Radio,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Button,
} from '@chakra-ui/react';
import { DatePicker, UploadOne, useWellnessToast } from '@wellness/admin-ui';
import { Client, Sex } from '@wellness/admin-ui/common';
import { ModalCrud } from '@wellness/admin-ui/components';
import { ChackraForm } from '@wellness/admin-ui/components/crud';
import { User } from '@wellness/admin-ui/icons';
import { Formik, useFormikContext } from 'formik';
import {
  InputControl,
  RadioGroupControl,
  SubmitButton,
} from 'formik-chakra-ui';
import { useEffect } from 'react';
import { useClientsController } from '../controller';
import { useClientCrudModal } from '../data';
import { SaveClientSchena } from '../domain/schemas';

const ImagePlaceHolder = () => {
  return (
    <VStack spacing={'0'} textAlign="center">
      <User color="gray.400" fontSize="lg" mt={2} />
      <Text color="gray.400" fontSize="sm">
        Foto de perfil
      </Text>
      <Text color="gray.400" fontSize="sm">
        400 x 400
      </Text>
    </VStack>
  );
};

const Form = () => {
  const { handleSubmit, setValues } = useFormikContext<SaveClientSchena>();
  const { mode, client } = useClientCrudModal();

  useEffect(() => {
    if (mode == 'edit' && client) {
      setValues({
        birth: new Date(client.birth),
        direction: client.direction,
        dni: client.dni,
        email: client.email,
        imageProfile: client.photo.previewUrl,
        name: client.name,
        lastName: client.lastName,
        phone: client.phone,
        sex: client.sex,
      });
    }
  }, [mode, client]);

  return (
    <ChackraForm submit={handleSubmit}>
      <Flex justifyContent="center" py="3">
        <UploadOne placeHolderElment={ImagePlaceHolder} name="imageProfile" />
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
    </ChackraForm>
  );
};

const mapper = {
  edit: {
    title: (client?: Client) => client && `Editando: ${client.name}`,
    button: 'Guardar Cambios',
  },
  create: {
    title: (client?: Client) => `Registrar cliente`,
    button: 'Guardar',
  },
};

export const RegisterClientModal = () => {
  const { registerClient, updateClient } = useClientsController();
  const {
    isOpen: isOpenModal,
    openModal,
    closeModal,
    mode,
    client,
  } = useClientCrudModal();
  const toast = useWellnessToast();

  const { isOpen, onClose } = useDisclosure({
    isOpen: isOpenModal,
    onClose: () => closeModal(),
    onOpen: () => openModal(),
  });

  console.log('in mode', mode);

  const properties = mapper[mode];
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
        birth: null,
        imageProfile: null,
      }}
      onSubmit={async (values, { setSubmitting, setValues }) => {
        switch (mode) {
          case 'edit': {
            await updateClient(values);
            toast({
              title: 'Cliente Actualizado',
            });
            onClose();
            break;
          }
          case 'create': {
            await registerClient(values);
            toast({
              title: 'Cliente Registrado',
            });
            onClose();
            break;
          }
        }
      }}
    >
      {({ submitForm }) => (
        <ModalCrud
          isOpen={isOpen}
          onClose={onClose}
          textHeader={properties.title(client)}
          footer={
            <HStack>
              <Button variant="ghost">Cancelar</Button>
              <SubmitButton onClick={submitForm}>
                {properties.button}
              </SubmitButton>
            </HStack>
          }
        >
          <Form />
        </ModalCrud>
      )}
    </Formik>
  );
};
