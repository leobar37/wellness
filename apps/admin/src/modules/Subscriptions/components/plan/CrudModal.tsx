import { Button, HStack, Radio, useDisclosure } from '@chakra-ui/react';
import { callAll } from '@chakra-ui/utils';
import { ModeSuscription, Plan } from '@wellness/admin-ui';
import { isFunction as isFunc } from '@chakra-ui/utils';
import { ChackraForm, ModalCrud } from '@wellness/admin-ui/components';
import { DatePicker } from '@wellness/admin-ui/ui';
import { Formik, useFormikContext } from 'formik';
import {
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  SubmitButton,
  TextareaControl,
} from 'formik-chakra-ui';
import { useEffect } from 'react';
import { usePlansController } from '../../controller';
import { usePlanModal } from '../../data';
import { CreatePlan } from '../../domain/schemas';

const Form = () => {
  const { handleSubmit, setValues } = useFormikContext<CreatePlan>();
  const { plan, mode } = usePlanModal();
  useEffect(() => {
    if (mode == 'edit' && plan) {
      setValues({
        description: plan.detail.description,
        price: plan.detail.price,
        duration: plan.suscription.duration,
        name: plan.detail.name,
        visible: plan.visible,
        active: plan.suscription.active,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  return (
    <ChackraForm submit={handleSubmit}>
      <InputControl name="name" placeholder="Nombre" label="Nombre:" />
      <TextareaControl name="description" label="Descripción:" />
      <CheckboxSingleControl name="visible">Visible</CheckboxSingleControl>
      <NumberInputControl
        name="duration"
        maxWidth="150px"
        label="Duración(Días):"
      />
      <CheckboxSingleControl name="active">Activo</CheckboxSingleControl>
      <NumberInputControl name="price" maxWidth="90px" label="Precio:" />
    </ChackraForm>
  );
};

const mapper = {
  mode: {
    edit: {
      title: (plan?: Plan) => plan && `Editando: Plan ${plan.detail.name}`,
    },
    create: {
      title: 'Crear Plan',
    },
  },
};

export const CrudPlanModal = () => {
  const { createPlan, editPlan } = usePlansController();
  const { plan, mode, closeModal, openModal, isOpen: _isOpen } = usePlanModal();
  const { isOpen, onClose } = useDisclosure({
    isOpen: _isOpen,
    onClose: () => closeModal(),
    onOpen: () => openModal(),
  });

  const properties = mapper.mode[mode];

  const cancelOperation = () => {
    onClose();
  };

  return (
    <Formik<CreatePlan>
      initialValues={{
        description: '',
        duration: 0,
        name: '',
        price: 0,
        visible: true,
        active: true,
      }}
      onSubmit={async (values, { resetForm }) => {
        switch (mode) {
          case 'create': {
            await createPlan(values);
            resetForm();
            break;
          }
          case 'edit': {
            await editPlan(values);
            break;
          }
        }
      }}
    >
      {({ submitForm }) => (
        <ModalCrud
          textHeader={
            isFunc(properties?.title)
              ? properties.title(plan)
              : properties.title
          }
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
