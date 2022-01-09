import { ModalCrud } from '@wellness/admin-ui/components';
import { useDisclosure, HStack, Button, Radio } from '@chakra-ui/react';
import { ChackraForm } from '@wellness/admin-ui/components';
import { Formik, useFormikContext } from 'formik';
import { useActivityModal } from '../../data';
import {
  NumberInputControl,
  InputControl,
  CheckboxSingleControl,
  TextareaControl,
  SubmitButton,
  RadioGroupControl,
} from 'formik-chakra-ui';
import { CreateActivity } from '../../domain/schemas';
import { useActivityController } from '../../controller/activities.controller';
import { DatePicker } from '@wellness/admin-ui/ui';
import { ModeSuscription } from '@wellness/admin-ui';
import { useSubscriptionsStore } from '../../data';
import { useEffect } from 'react';

const Form = () => {
  const { handleSubmit, setValues } = useFormikContext<CreateActivity>();
  const { activity, mode } = useActivityModal();
  useEffect(() => {
    if (mode == 'edit' && activity) {
      setValues({
        description: activity.detail.description,
        price: activity.detail.price,
        duration: activity.suscription.duration,
        mode: activity.suscription.mode,
        startAt: activity.suscription.startAt,
        name: activity.detail.name,
        visible: activity.suscription.active,
      });
    }
  }, [activity, mode, setValues]);

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
      <RadioGroupControl name="mode" label="Modo:">
        <Radio value={ModeSuscription.FIXED}>Fijo</Radio>
        <Radio value={ModeSuscription.DINAMIC}>Dinámico</Radio>
      </RadioGroupControl>
      <DatePicker name="startAt" label="Fecha de inicio" />
    </ChackraForm>
  );
};

export const CreateActivityModal = () => {
  const { createActivity, updateActivity } = useActivityController();
  const { activity, mode, closeModal, openModal } = useActivityModal();
  const { activitiesCrudModal, toggleActivitiesCrudModal } =
    useSubscriptionsStore();
  const { isOpen, onClose } = useDisclosure({
    isOpen: activitiesCrudModal.isOpen,
    onClose: () => closeModal(),
    onOpen: () => openModal(),
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
      onSubmit={async (values) => {
        switch (mode) {
          case 'create': {
            await createActivity(values);
            break;
          }
          case 'edit': {
            await updateActivity(values);
            break;
          }
        }
      }}
    >
      {({ submitForm }) => (
        <ModalCrud
          textHeader={'Crear Actividad'}
          isOpen={isOpen}
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
