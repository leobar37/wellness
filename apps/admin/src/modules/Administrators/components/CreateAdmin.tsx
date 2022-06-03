import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import {
  ChackraForm,
  ModalCrud,
  Role,
  useChangues,
  useWellnessToast,
  PasswordInput,
} from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { FC, useEffect } from 'react';
import { useAdministratorController } from '../controllers';
import {
  useAdministratorCrud,
  useAdministratorStore,
  useChangePasswordModalFromAdmin,
} from '../data';
import { CreateAdminT, createAdminSchem } from '../domain/schema';

const modeMapper = {
  edit: {
    label: 'Editar Administrador',
    button: 'Editar',
  },
  create: {
    label: 'Crear Administrador',
    button: 'Crear',
  },
};

export type AdminFormProps = {
  isOpen: boolean;
  onClose: () => void;
  textHeader: string;
  textButton: string;
};

const AdminForm: FC<AdminFormProps> = (props) => {
  const {
    handleSubmit,
    setValues,
    values,
    resetForm,
    isValid,
    submitForm,
    isSubmitting,
  } = useFormikContext<CreateAdminT>();
  const adminCrudStore = useAdministratorCrud();
  const adminStore = useAdministratorStore((state) => state.administratorModal);
  const passwordModal = useChangePasswordModalFromAdmin();
  const changesApi = useChangues(values);

  useEffect(() => {
    if (adminStore?.mode === 'edit' && adminStore?.temporal) {
      const temporal = adminStore.temporal;
      const values = {
        dni: temporal.dni || '',
        email: temporal.email,
        lastName: temporal.lastName,
        name: temporal.name,
        password: null,
        role: temporal.rol,
      };
      setValues(values);
      changesApi.toCompare(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminStore]);

  const passwordElement =
    adminCrudStore.mode === 'create' ? (
      <PasswordInput name="password" label="Contraseña" />
    ) : (
      <Button
        colorScheme={'teal'}
        onClick={() => passwordModal.openModal(adminCrudStore.temporal?.id)}
      >
        Cambiar contraseña
      </Button>
    );

  return (
    <ModalCrud
      isOpen={props.isOpen}
      onClose={() => {
        if (adminCrudStore.mode == 'edit') {
          resetForm();
        }
        props.onClose();
      }}
      textHeader={props.textHeader}
      footer={
        <HStack>
          <Button
            isLoading={isSubmitting}
            disabled={!isValid || !changesApi.hasChanges || isSubmitting}
            onClick={submitForm}
          >
            {props.textButton}
          </Button>
        </HStack>
      }
    >
      <ChackraForm submit={handleSubmit}>
        <InputControl name="email" label="Email" />
        <InputControl name="name" label="Nombre" />
        <InputControl name="lastName" label="Apellido" />
        <InputControl name="dni" label="DNI" />
        <SelectControl name="role" label="Rol">
          <option value={Role.STAFF}>Empleado</option>
          <option value={Role.ADMIN}>Admin</option>
        </SelectControl>

        {passwordElement}
      </ChackraForm>
    </ModalCrud>
  );
};

export const CreateAdminModal = () => {
  const adminCrudStore = useAdministratorCrud();

  const { isOpen, onClose } = useDisclosure({
    isOpen: adminCrudStore.isOpen,
    onOpen: adminCrudStore.openModal,
    onClose: adminCrudStore.closeModal,
  });

  const { registerAdmin, editAdministrator } = useAdministratorController();

  const properties = modeMapper[adminCrudStore.mode];

  const toast = useWellnessToast();

  return (
    <Formik<CreateAdminT>
      initialValues={{
        name: '',
        email: '',
        lastName: '',
        password: '',
        dni: '',
        role: Role.STAFF,
      }}
      isInitialValid={false}
      validationSchema={createAdminSchem}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          switch (adminCrudStore.mode) {
            case 'create': {
              await registerAdmin(values);
              toast({
                status: 'success',
                description: 'Administrador creado correctamente',
              });
              break;
            }
            case 'edit': {
              await editAdministrator(values);
              toast({
                status: 'success',
                description: 'Administrador editado correctamente',
              });
              break;
            }
          }
          adminCrudStore.closeModal();
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
        }
      }}
    >
      <AdminForm
        isOpen={isOpen}
        onClose={onClose}
        textButton={properties.button}
        textHeader={properties.label}
      />
    </Formik>
  );
};
