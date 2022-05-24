import { Button, HStack } from '@chakra-ui/react';
import { isFunction as isFunc } from '@chakra-ui/utils';
import { Plan } from '@wellness/admin-ui';
import { ChackraForm, ModalCrud } from '@wellness/admin-ui/components';
import { useChangues } from '@wellness/admin-ui/hooks';
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
import { CreatePlan, createPlanSchema } from '../../domain/schemas';

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

const Form = () => {
  const { handleSubmit, setValues, submitForm, values, isValid, resetForm } =
    useFormikContext<CreatePlan>();
  const { plan, mode, closeModal, openModal, isOpen } = usePlanModal();
  const changesApi = useChangues(values);

  useEffect(() => {
    if (mode == 'edit' && plan) {
      const newValues = {
        description: plan.detail.description,
        price: plan.detail.price,
        duration: plan.suscription.duration,
        name: plan.detail.name,
        visible: plan.visible,
        active: plan.suscription.active,
      };

      setValues(newValues);
      changesApi.toCompare(newValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);
  const properties = mapper.mode[mode];

  const cancelOperation = () => {
    closeModal();
    resetForm();
  };

  const isDisabled = !changesApi.hasChanges || !isValid;

  return (
    <ModalCrud
      textHeader={
        isFunc(properties?.title) ? properties.title(plan) : properties.title
      }
      isOpen={isOpen}
      onClose={cancelOperation}
      footer={
        <HStack>
          <Button variant={'ghost'} onClick={() => cancelOperation()}>
            Cancelar
          </Button>
          <SubmitButton disabled={isDisabled} onClick={submitForm}>
            Guardar
          </SubmitButton>
        </HStack>
      }
    >
      <ChackraForm>
        <InputControl name="name" placeholder="Nombre" label="Nombre:" />
        <TextareaControl name="description" label="Descripción:" />
        <CheckboxSingleControl name="visible">Visible</CheckboxSingleControl>
        <NumberInputControl
          name="duration"
          maxWidth="180px"
          label="Duración(Días):"
        />
        <CheckboxSingleControl name="active">Activo</CheckboxSingleControl>
        <NumberInputControl
          name="price"
          minWidth={'80px'}
          maxWidth={'150px'}
          label="Precio(soles):"
        />
      </ChackraForm>
    </ModalCrud>
  );
};

export const CrudPlanModal = () => {
  const { createPlan, editPlan } = usePlansController();
  const { mode, isOpen: _isOpen, closeModal } = usePlanModal();

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
      validationSchema={createPlanSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          switch (mode) {
            case 'create': {
              console.log('create here');

              await createPlan(values);
              break;
            }
            case 'edit': {
              await editPlan(values);
              break;
            }
          }
          closeModal();
          resetForm();
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <Form />
    </Formik>
  );
};
