import { FC } from 'react';
import { ModalCrud } from '@wellness/admin-ui';
import { HStack, Button, useToast } from '@chakra-ui/react';
import { useChangePasswordModal } from '../data';
import { Formik, FormikErrors } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { ChangePasswordSchema, changePasswordSchema } from '../domain';
import { useAdministratorController } from '../controllers';

export const ChangePasswordModal: FC = () => {
  const { isOpen, closeModal, idUser } = useChangePasswordModal();
  const { resetPassword } = useAdministratorController();

  const toast = useToast();

  return (
    <Formik<ChangePasswordSchema>
      initialValues={{
        password: '',
        repeatPassword: '',
      }}
      onSubmit={async (values) => {
        /**
         * TODO:
         * - hAPPY PATH
         */
        await resetPassword({
          ...values,
          userId: idUser,
        });
        toast({
          status: 'success',
          description: 'Contraseña cambiada con éxito',
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
            <>
              <HStack>
                <Button variant={'ghost'}>Cancelar</Button>
                <Button
                  onClick={submitForm}
                  disabled={isSubmitting || !isValid}
                >
                  Cambiar contraseña
                </Button>
              </HStack>
            </>
          }
        >
          <InputControl
            inputProps={{
              type: 'password',
            }}
            name="password"
            label="Contraseña"
          />
          <InputControl
            inputProps={{
              type: 'password',
            }}
            name="repeatPassword"
            label="Repetir Contraseña"
          />
        </ModalCrud>
      )}
    </Formik>
  );
};
