import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import {
  ModeAction,
  UploadMultiple,
  useWellnessToast,
} from '@wellness/admin-ui';
import { ChackraForm, ModalCrud } from '@wellness/admin-ui/components';
import { Formik, useFormikContext } from 'formik';
import {
  NumberInputControl,
  SubmitButton,
  TextareaControl,
} from 'formik-chakra-ui';

import * as React from 'react';
import { useEffect } from 'react';
import { useFichaController } from '../../controller';
import { useClientsStore } from '../../data/client-store';
import { DetailFichaT, detailFichaSchema } from '../../domain/schemas';
import { useGetFicha } from '../../controller';
type CreateFichaProps = {
  mode: 'open' | 'close';
};

type Properties = {
  title: string;
};

type PropertiesMode = {
  buttonLeft: string;
  buttonRight: string;
  isEdit: boolean;
  mode: Record<CreateFichaProps['mode'], Properties>;
};

const mapPropertiesState: Partial<Record<ModeAction, PropertiesMode>> = {
  edit: {
    buttonLeft: 'Cancelar',
    buttonRight: 'Guardar cambios',
    isEdit: true,
    mode: {
      open: {
        title: 'Editando Ficha',
      },
      close: {
        title: 'Editando cierre de ficha',
      },
    },
  },
  create: {
    buttonLeft: 'Cancelar',
    buttonRight: 'Guardar',
    isEdit: false,
    mode: {
      close: {
        title: 'Cierre de ficha',
      },
      open: {
        title: 'Crear Ficha',
      },
    },
  },
};

const { toggleModalFicha } = useClientsStore.getState();

const FichaForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { ficha, modeModalFicha, stateModalFicha } = useClientsStore();
  const { currentDetail } = useGetFicha();
  const {
    handleSubmit,
    submitForm,
    setValues,
    resetForm,
    isSubmitting,
    isValid,
  } = useFormikContext();

  const detail = currentDetail();

  const propertiesState = mapPropertiesState[stateModalFicha];
  const properties = propertiesState.mode[modeModalFicha];

  useEffect(() => {
    if (detail && stateModalFicha == 'edit') {
      const assets = detail.asset.assets.map((asset) => asset.previewUrl);
      setValues({
        note: detail.objective,
        files: assets,
        weight: detail.weight,
      });
    }

    if (modeModalFicha == 'close' || (detail && modeModalFicha === 'open')) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ficha, stateModalFicha, modeModalFicha, detail]);

  const isButtonInvalid = isSubmitting || !isValid;

  return (
    <ModalCrud
      isOpen={isOpen}
      textHeader={properties.title}
      onClose={onClose}
      footer={
        <HStack>
          <Button variant="ghost" onClick={() => onClose()}>
            {propertiesState?.buttonLeft}
          </Button>
          <SubmitButton
            disabled={isButtonInvalid}
            type="submit"
            onClick={submitForm}
          >
            {propertiesState?.buttonRight}
          </SubmitButton>
        </HStack>
      }
    >
      <ChackraForm submit={handleSubmit}>
        <UploadMultiple name="files" />
        <NumberInputControl name="weight" placeholder="" label="Peso(kg):" />
        <TextareaControl name="note" label="Nota" />
      </ChackraForm>
    </ModalCrud>
  );
};

export const CreateFicha: React.FunctionComponent<CreateFichaProps> = () => {
  const { createFicha, closeFicha, editFicha } = useFichaController();
  const { modalCrudFicha, modeModalFicha, stateModalFicha } = useClientsStore();
  const toast = useWellnessToast();
  const { isOpen, onClose } = useDisclosure({
    isOpen: modalCrudFicha,
    onClose: () => toggleModalFicha(false),
    onOpen: () => toggleModalFicha(true),
  });

  return (
    <Formik<DetailFichaT>
      initialValues={{
        files: [],
        note: '',
        weight: 0,
      }}
      validationSchema={detailFichaSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          if (modeModalFicha === 'open') {
            if (stateModalFicha == 'edit') {
              await editFicha(values);
              toast({
                title: 'Ficha editada correctamente',
              });
            }
            if (stateModalFicha == 'create') {
              await createFicha(values);
              toast({
                title: 'Ficha creada correctamente',
              });
            }
          } else {
            await closeFicha(values);
            toast({
              title: 'La ficha se ha cerrado correctamente',
            });
          }
          onClose();
          setSubmitting(false);
        } catch (error) {
          console.log(error);

          onClose();
          setSubmitting(false);
        }
      }}
    >
      <FichaForm isOpen={isOpen} onClose={onClose} />
    </Formik>
  );
};
