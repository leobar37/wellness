import { FC, useEffect } from 'react';
import {
  ModalCrud,
  useWellnessToast,
  ChackraForm,
  PasswordInput,
} from '@wellness/admin-ui';
import { HStack, Button } from '@chakra-ui/react';
import { useChangePasswordModalFromAdmin } from '../data';
import { Formik, FormikErrors, useFormikContext } from 'formik';
import {
  ChangePasswordSchemaFromAdmin,
  changePasswordSchemaFromAdmin,
} from '../domain';
import { useAdministratorController } from '../controllers';
import { InputControl } from 'formik-chakra-ui';
import { ID } from '@wellness/common';

const Form: FC<{ userId: ID }> = ({ userId }) => {
  const { submitForm, resetForm, errors } = useFormikContext();

  console.log(errors);

  useEffect(() => {
    if (userId) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <ChackraForm submit={submitForm}>
      <PasswordInput name="adminPassword" label="Compruebe su contraseña" />
      <PasswordInput name="password" label="Nueva contraseña" />
      <PasswordInput name="repeatPassword" label="Repetir contraseña" />
    </ChackraForm>
  );
};

export const ChangePasswordModalFromAdmin: FC = () => {
  const { isOpen, closeModal, idUser } = useChangePasswordModalFromAdmin();
  const { resetPasswordFromAdmin } = useAdministratorController();

  const toast = useWellnessToast();

  return (
    <Formik<ChangePasswordSchemaFromAdmin>
      initialValues={{
        adminPassword: '',
        password: '',
        repeatPassword: '',
      }}
      onSubmit={async (values) => {
        await resetPasswordFromAdmin({
          ...values,
          userId: idUser,
        });
        toast({
          status: 'success',
          description: 'Contraseña actualizada con éxito',
        });
        closeModal();
      }}
      validationSchema={changePasswordSchemaFromAdmin}
      isInitialValid={false}
      validateOnBlur
      validate={(values) => {
        const errors = {} as FormikErrors<ChangePasswordSchemaFromAdmin>;
        if (values.password !== values.repeatPassword) {
          errors.repeatPassword = 'Las contraseñas no coinciden';
        }
        return errors;
      }}
    >
      {({ submitForm, isSubmitting, isValid }) => (
        <ModalCrud
          onClose={() => {
            closeModal();
          }}
          isOpen={isOpen}
          textHeader="Cambiar contraseña"
          footer={
            <HStack>
              <Button variant={'ghost'}>Cancelar</Button>
              <Button onClick={submitForm} disabled={isSubmitting || !isValid}>
                Cambiar contraseña
              </Button>
            </HStack>
          }
        >
          <Form userId={idUser} />
        </ModalCrud>
      )}
    </Formik>
  );
};
