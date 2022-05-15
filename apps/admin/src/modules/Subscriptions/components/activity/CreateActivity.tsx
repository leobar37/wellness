import { Button, HStack, Radio, useDisclosure } from '@chakra-ui/react';
import { ModeSuscription } from '@wellness/admin-ui';
import { ChackraForm, ModalCrud } from '@wellness/admin-ui/components';
import { DatePicker } from '@wellness/admin-ui/ui';
import { Formik, useFormikContext } from 'formik';
import {
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  RadioGroupControl,
  SubmitButton,
  TextareaControl,
} from 'formik-chakra-ui';
import { useEffect } from 'react';
import { useActivityController } from '../../controller/activities.controller';
import { useActivityModal } from '../../data';
import { CreateActivity, createActivitySchema } from '../../domain/schemas';
import { useChangues, useWellnessToast } from '@wellness/admin-ui';

const Form = () => {
  const { handleSubmit, setValues, submitForm, values, isValid, isSubmitting } =
    useFormikContext<CreateActivity>();
  const { activity, mode, isOpen, closeModal } = useActivityModal();
  const changesApi = useChangues(values);

  useEffect(() => {
    if (mode == 'edit' && activity) {
      const newValues = {
        description: activity.detail.description,
        price: activity.detail.price,
        duration: activity.suscription.duration,
        mode: activity.suscription.mode,
        startAt: activity.suscription.startAt,
        name: activity.detail.name,
        visible: activity.suscription.active,
      };
      setValues(newValues);
      changesApi.toCompare(newValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, mode, setValues]);

  const onCloseModal = () => {
    closeModal();
  };
  const buttonIsDisabled = !changesApi.hasChanges || !isValid || isSubmitting;
  return (
    <ModalCrud
      textHeader={'Crear Actividad'}
      isOpen={isOpen}
      onClose={onCloseModal}
      footer={
        <HStack>
          <Button variant={'ghost'} onClick={() => onCloseModal()}>
            Cancelar
          </Button>
          <SubmitButton
            colorScheme={'brown2'}
            disabled={buttonIsDisabled}
            onClick={submitForm}
          >
            Guardar
          </SubmitButton>
        </HStack>
      }
    >
      <ChackraForm submit={handleSubmit}>
        <NumberInputControl
          name="duration"
          maxWidth="250px"
          label="Duración(Días):"
        />
        <InputControl name="name" placeholder="Nombre" label="Nombre:" />
        <NumberInputControl
          name="price"
          maxWidth="250px"
          label="Precio(Soles):"
        />
        <TextareaControl name="description" label="Descripción:" />
        <CheckboxSingleControl name="visible">Visible</CheckboxSingleControl>
        <RadioGroupControl name="mode" label="Modo:">
          <Radio value={ModeSuscription.FIXED}>Fijo</Radio>
          <Radio value={ModeSuscription.DINAMIC}>Dinámico</Radio>
        </RadioGroupControl>
        <DatePicker name="startAt" label="Fecha de inicio" />
      </ChackraForm>
    </ModalCrud>
  );
};

export const CreateActivityModal = () => {
  const { createActivity, updateActivity } = useActivityController();
  const { mode, closeModal } = useActivityModal();
  const toast = useWellnessToast();
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
      validationSchema={createActivitySchema}
      onSubmit={async (values, { resetForm }) => {
        switch (mode) {
          case 'create': {
            await createActivity(values);
            toast({
              title: 'Actividad creada con éxito',
            });
            break;
          }
          case 'edit': {
            await updateActivity(values);
            toast({
              title: 'Actividad editada con éxito',
            });
            break;
          }
        }
        resetForm();
        closeModal();
      }}
    >
      <Form />
    </Formik>
  );
};
