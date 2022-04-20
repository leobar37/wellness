import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { ChackraForm, ModalCrud, Role } from '@wellness/admin-ui';
import { Formik, useFormikContext } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { useAdministratorController } from '../controllers';
import { useAdministratorCrud } from '../data';
import { CreateAdminT } from '../domain/schema';
import { useChangePasswordModal } from '../data';
const modeMapper = {
  edit: {
    button: 'Editar',
  },
  create: {
    button: 'Crear',
  },
};

const AdminForm = () => {
  const { handleSubmit, setValues } = useFormikContext<CreateAdminT>();
  const adminCrudStore = useAdministratorCrud();

  const passwordModal = useChangePasswordModal();
  useEffect(() => {
    if (adminCrudStore.mode === 'edit' && adminCrudStore.temporal) {
      const temporal = adminCrudStore.temporal;
      setValues({
        dni: temporal.dni || '',
        email: temporal.email,
        lastName: temporal.lastName,
        name: temporal.name,
        password: null,
        role: temporal.rol,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminCrudStore.mode, adminCrudStore.temporal]);

  const passwordElement =
    adminCrudStore.mode === 'create' ? (
      <InputControl
        inputProps={{
          type: 'password',
        }}
        name="password"
        label="Contraseña"
      />
    ) : (
      <Button
        colorScheme={'teal'}
        onClick={() => passwordModal.openModal(adminCrudStore.temporal?.id)}
      >
        Cambiar contraseña
      </Button>
    );

  return (
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
      onSubmit={async (values) => {
        switch (adminCrudStore.mode) {
          case 'create': {
            await registerAdmin(values);
            break;
          }
          case 'edit': {
            await editAdministrator(values);
            break;
          }
        }
        adminCrudStore.closeModal();
      }}
    >
      {({ submitForm, resetForm }) => {
        return (
          <ModalCrud
            isOpen={isOpen}
            onClose={() => {
              if (adminCrudStore.mode == 'edit') {
                resetForm();
              }
              onClose();
            }}
            textHeader="Crear Administrador"
            footer={
              <>
                <HStack>
                  <Button onClick={submitForm}>{properties.button}</Button>
                </HStack>
              </>
            }
          >
            <AdminForm />
          </ModalCrud>
        );
      }}
    </Formik>
  );
};
