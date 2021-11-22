import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { ChackraForm, ModalCrud } from '@wellness/admin-ui/components';
import { Formik } from 'formik';
import { SubmitButton, TextareaControl } from 'formik-chakra-ui';
import * as React from 'react';
import {} from '../../controller';
import { useClientsStore } from '../../data/client-store';
import { CreateAsistenceT } from '../../data/schemas';
import { useAsistenceController } from '../../controller/use-asistence-controller';
// eslint-disable-next-line @typescript-eslint/ban-types
type CreateAsistenceProps = {};

const { toggleClientAsistenceModal } = useClientsStore.getState();

export const CreateAsistence: React.FunctionComponent<CreateAsistenceProps> =
  () => {
    const { createAsistencesModal, selectClient } = useClientsStore();

    const { createAsistence } = useAsistenceController({
      clientId: selectClient.id,
    });

    const { isOpen, onClose } = useDisclosure({
      isOpen: createAsistencesModal,
      onClose: toggleClientAsistenceModal,
      onOpen: toggleClientAsistenceModal,
    });

    return (
      <Formik<CreateAsistenceT>
        initialValues={{
          note: '',
        }}
        onSubmit={async (values, {}) => {
          await createAsistence(values);
        }}
      >
        {({ handleSubmit, submitForm }) => {
          return (
            <ModalCrud
              isOpen={isOpen}
              onClose={onClose}
              textHeader="Registrar asistencia"
              footer={
                <HStack>
                  <Button variant="ghost">Cancelar</Button>
                  <SubmitButton type="submit" onClick={submitForm}>
                    Guardar
                  </SubmitButton>
                </HStack>
              }
            >
              <ChackraForm submit={handleSubmit}>
                <TextareaControl label="Nota" name="note" />
              </ChackraForm>
            </ModalCrud>
          );
        }}
      </Formik>
    );
  };
