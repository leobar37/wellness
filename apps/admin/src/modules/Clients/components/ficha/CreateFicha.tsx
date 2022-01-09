import * as React from 'react';
import { useEffect } from 'react';
import { DetailFichaT } from '../../data/schemas';
import { Formik } from 'formik';
import { useDisclosure, HStack, Button } from '@chakra-ui/react';
import { ModalCrud, ChackraForm } from '@wellness/admin-ui/components';
import { UploadMultiple, ModeAction } from '@wellness/admin-ui';
import { useClientsStore } from '../../data/client-store';
import { useFichaController } from '../../controller';
import {
  SubmitButton,
  TextareaControl,
  NumberInputControl,
} from 'formik-chakra-ui';
import { useFormikContext } from 'formik';
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
  const { ficha, modeModalFicha, stateModalFicha, currentDetail } =
    useClientsStore();
  const { handleSubmit, submitForm, setValues } = useFormikContext();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ficha, stateModalFicha]);
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
          <SubmitButton type="submit" onClick={submitForm}>
            {propertiesState?.buttonRight}
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
};

export const CreateFicha: React.FunctionComponent<CreateFichaProps> = () => {
  const { createFicha, closeFicha, editFicha } = useFichaController();
  const { modalCrudFicha, modeModalFicha, stateModalFicha } = useClientsStore();

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
      onSubmit={async (values) => {
        if (modeModalFicha === 'open') {
          if (stateModalFicha == 'edit') {
            await editFicha(values);
          }
          if (stateModalFicha == 'create') {
            await createFicha(values);
          }
        } else {
          await closeFicha(values);
        }
        onClose();
      }}
    >
      <FichaForm isOpen={isOpen} onClose={onClose} />
    </Formik>
  );
};
