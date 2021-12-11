import * as React from 'react';
import { DetailFichaT } from '../../data/schemas';
import { Formik } from 'formik';
import { useDisclosure, HStack, Button } from '@chakra-ui/react';
import { ModalCrud, ChackraForm } from '@wellness/admin-ui/components';
import { UploadMultiple } from '@wellness/admin-ui';
import { useClientsStore } from '../../data/client-store';
import { useFichaController } from '../../controller';
import {
  SubmitButton,
  TextareaControl,
  NumberInputControl,
} from 'formik-chakra-ui';
type CreateFichaProps = {
  mode: 'open' | 'close';
};

type Properties = {
  title: string;
};

const mapProperties: Record<CreateFichaProps['mode'], Properties> = {
  open: {
    title: 'Crear Ficha',
  },
  close: {
    title: 'Cierre de ficha',
  },
};

const { toggleModalFicha } = useClientsStore.getState();

export const CreateFicha: React.FunctionComponent<CreateFichaProps> = ({
  mode,
}) => {
  const { modalCrudFicha, modeModalFicha, selectClient } = useClientsStore();
  const { createFicha, closeFicha } = useFichaController();
  const { isOpen, onClose } = useDisclosure({
    isOpen: modalCrudFicha,
    onClose: () => toggleModalFicha(false),
    onOpen: () => toggleModalFicha(true),
  });

  const properties = mapProperties[modeModalFicha];

  return (
    <Formik<DetailFichaT>
      initialValues={{
        note: '',
        weight: 0,
        files: [],
      }}
      onSubmit={async (values) => {
        if (modeModalFicha === 'open') {
          await createFicha(values);
        } else {
          console.log('close ficha');

          await closeFicha(values);
        }
        onClose();
      }}
    >
      {({ submitForm, handleSubmit }) => {
        return (
          <ModalCrud
            isOpen={isOpen}
            textHeader={properties.title}
            onClose={onClose}
            footer={
              <HStack>
                <Button variant="ghost" onClick={() => onClose()}>
                  Cancelar
                </Button>
                <SubmitButton type="submit" onClick={submitForm}>
                  Guardar
                </SubmitButton>
              </HStack>
            }
          >
            <ChackraForm submit={handleSubmit}>
              <UploadMultiple name="files" />
              <NumberInputControl name="weight" placeholder="" label="Peso" />
              <TextareaControl name="note" label="Objetivo" />
            </ChackraForm>
          </ModalCrud>
        );
      }}
    </Formik>
  );
};
