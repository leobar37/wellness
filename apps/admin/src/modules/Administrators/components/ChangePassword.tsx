import { FC } from 'react';
import { ModalCrud, useWellnessToast } from '@wellness/admin-ui';
import { HStack, Button } from '@chakra-ui/react';
import { useChangePasswordModal } from '../data';
import { Formik, FormikErrors } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { ChangePasswordSchema, changePasswordSchema } from '../domain';
import { useAdministratorController } from '../controllers';
import { PasswordInput } from '@wellness/admin-ui';

export const ChangePasswordModal: FC = () => {
  const { isOpen, closeModal, idUser } = useChangePasswordModal();
  const { resetPassword } = useAdministratorController();

  const toast = useWellnessToast();

  return (
    <Formik<ChangePasswordSchema>
      initialValues={{
        prevPassword: '',
        password: '',
        repeatPassword: '',
      }}
      onSubmit={async (values) => {
        await resetPassword({
          ...values,
          userId: idUser,
        });
        toast({
          status: 'success',
          description: 'Contraseña actualizada con éxito',
        });
        closeModal();
      }}
      validationSchema={changePasswordSchema}
      validate={(values) => {
        const errors = {} as FormikErrors<ChangePasswordSchema>;
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
          <PasswordInput name="prevPassword" label="Contraseña actual" />
          <PasswordInput name="password" label="Nueva contraseña" />
          <PasswordInput name="repeatPassword" label="Repetir contraseña" />
        </ModalCrud>
      )}
    </Formik>
  );
};
