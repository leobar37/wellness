/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Flex,
  HStack,
  Radio,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  DatePicker,
  UploadOne,
  useChangues,
  useGetClientsQuery,
  useWellnessToast,
} from '@wellness/admin-ui';
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
import { saveClientSchema, SaveClientSchena } from '../domain/schemas';

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
  const { handleSubmit, setValues, isValid, values, isSubmitting, submitForm } =
    useFormikContext<SaveClientSchena>();

  const changesApi = useChangues(values);
  const {
    isOpen: isOpenModal,
    openModal,
    closeModal,
    mode,
    client,
  } = useClientCrudModal();

  const { isOpen, onClose } = useDisclosure({
    isOpen: isOpenModal,
    onClose: () => closeModal(),
    onOpen: () => openModal(),
  });

  const properties = mapper[mode];

  useEffect(() => {
    if (mode == 'edit' && client) {
      const newValues = {
        birth: new Date(client.birth),
        direction: client.direction,
        dni: client.dni,
        email: client.email,
        imageProfile: client?.photo?.previewUrl,
        name: client.name,
        lastName: client.lastName,
        phone: client.phone,
        sex: client.sex,
      };
      changesApi.toCompare(newValues);
      setValues(newValues);
    }
  }, [mode, client]);

  return (
    <ModalCrud
      isOpen={isOpen}
      onClose={onClose}
      textHeader={properties.title(client)}
      footer={
        <HStack>
          <Button variant="ghost">Cancelar</Button>
          <SubmitButton
            disabled={!isValid || isSubmitting || !changesApi.hasChanges}
            onClick={submitForm}
          >
            {properties.button}
          </SubmitButton>
        </HStack>
      }
    >
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
    </ModalCrud>
  );
};

export const RegisterClientModal = () => {
  const { registerClient, updateClient } = useClientsController();
  const { refetch } = useGetClientsQuery();
  const {
    isOpen: isOpenModal,
    openModal,
    closeModal,
    mode,
    client,
  } = useClientCrudModal();

  const toast = useWellnessToast();

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
      isInitialValid={false}
      validateOnChange
      validationSchema={saveClientSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setSubmitting(true);
          switch (mode) {
            case 'edit': {
              await updateClient(values);
              toast({
                title: 'Cliente Actualizado',
              });
              break;
            }
            case 'create': {
              await registerClient(values);
              toast({
                title: 'Cliente Registrado',
              });
              // ref
              break;
            }
          }
          closeModal();
          refetch();
          resetForm();
          setSubmitting(false);
        } catch (error) {
          console.log(error);
          setSubmitting(false);
        }
      }}
    >
      <Form />
    </Formik>
  );
};
