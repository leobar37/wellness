import { ModalCrud } from '@wellness/admin-ui/components';
import { useDisclosure, HStack, Button } from '@chakra-ui/react';
import { ChackraForm } from '@wellness/admin-ui/components';
import { Formik, useFormikContext } from 'formik';
import {
  NumberInputControl,
  InputControl,
  CheckboxSingleControl,
  TextareaControl,
  SubmitButton,
} from 'formik-chakra-ui';
import { CreateActivity } from '../../domain/schemas';
import { ModeSuscription } from '@wellness/admin-ui';
const Form = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <ChackraForm submit={handleSubmit}>
      <CheckboxSingleControl name="visible">Visible</CheckboxSingleControl>
      <NumberInputControl
        name="duration"
        maxWidth="150px"
        label="Duración(Días):"
      />
      <InputControl name="name" placeholder="Nombre" label="Nombre:" />
      <NumberInputControl name="price" maxWidth="90px" label="Precio:" />
      <TextareaControl name="description" label="Descripción:" />
    </ChackraForm>
  );
};

export const CreateActivityModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({
    isOpen: true,
  });
  const cancelOperation = () => {
    onClose();
  };
  return (
    <Formik<CreateActivity>
      initialValues={{
        description: '',
        duration: 0,
        name: '',
        mode: ModeSuscription.DINAMIC,
        price: 0,
        startAt: null,
        visible: true,
      }}
      onSubmit={(values) => {}}
    >
      {({ submitForm }) => (
        <ModalCrud
          textHeader={'Crear Actividad'}
          isOpen={true}
          onClose={onClose}
          footer={
            <HStack>
              <Button variant={'ghost'} onClick={() => cancelOperation()}>
                Cancelar
              </Button>
              <SubmitButton onClick={submitForm}>Guardar</SubmitButton>
            </HStack>
          }
        >
          <Form />
        </ModalCrud>
      )}
    </Formik>
  );
};
