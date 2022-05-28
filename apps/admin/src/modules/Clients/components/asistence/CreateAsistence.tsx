import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { ChackraForm, ModalCrud } from '@wellness/admin-ui/components';
import { DatePicker, useWellnessToast } from '@wellness/admin-ui/ui';
import { Formik, useFormikContext } from 'formik';
import { SubmitButton, TextareaControl } from 'formik-chakra-ui';
import * as React from 'react';
import { useAsistenceController } from '../../controller/use-asistence-controller';
import { useAsistencesModal } from '../../data/client-store';
import { FormikErrors } from 'formik';
import { CreateAsistenceT, createAsistenceSchema } from '../../domain/schemas';

// eslint-disable-next-line @typescript-eslint/ban-types
type CreateAsistenceProps = {};

const Form = () => {
  const asistenceModalStore = useAsistencesModal();
  const { submitForm, handleSubmit, isValid, isSubmitting } =
    useFormikContext<CreateAsistenceT>();
  const { isOpen, onClose } = useDisclosure({
    isOpen: asistenceModalStore.isOpen,
    onClose: asistenceModalStore.closeModal,
  });

  const disabledButton = !isValid || isSubmitting;

  return (
    <ModalCrud
      isOpen={isOpen}
      onClose={onClose}
      textHeader="Registrar asistencia"
      footer={
        <HStack>
          <Button variant="ghost" onClick={() => onClose()}>
            Cancelar
          </Button>
          <SubmitButton
            disabled={disabledButton}
            type="submit"
            onClick={submitForm}
          >
            Guardar
          </SubmitButton>
        </HStack>
      }
    >
      <ChackraForm
        sx={{
          minHeight: '350px',
        }}
        submit={handleSubmit}
      >
        <DatePicker name="createdAt" label="Fecha" />
        <TextareaControl label="Nota" name="note" />
      </ChackraForm>
    </ModalCrud>
  );
};
export const CreateAsistence: React.FunctionComponent<
  CreateAsistenceProps
> = () => {
  const asistenceModalStore = useAsistencesModal();
  const toast = useWellnessToast();
  const { createAsistence } = useAsistenceController({
    clientId: asistenceModalStore?.client?.id,
  });

  const { onClose } = useDisclosure({
    isOpen: asistenceModalStore.isOpen,
    onClose: asistenceModalStore.closeModal,
  });

  return (
    <Formik<CreateAsistenceT>
      initialValues={{
        note: '',
        createdAt: new Date(),
      }}
      validate={(values) => {
        const errors: FormikErrors<CreateAsistenceT> = {};
        const now = new Date();
        if (values.createdAt > now) {
          errors.createdAt =
            'La fecha debe ser menor o igual a la fecha actual';
        }
        return errors;
      }}
      validationSchema={createAsistenceSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await createAsistence(values);
          resetForm();
          onClose();
          toast({
            title: 'Asistencia registrada',
            status: 'success',
          });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Form />
    </Formik>
  );
};
