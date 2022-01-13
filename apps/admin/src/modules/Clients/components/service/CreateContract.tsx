import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Activity,
  ChackraForm,
  ModalCrud,
  Plan,
  useWellnessToast,
} from '@wellness/admin-ui';
import { SafeAny } from '@wellness/common';
import { Formik, useField, useFormikContext } from 'formik';
import {
  NumberInputControl,
  SelectControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from 'formik-chakra-ui';
import { FC, useState } from 'react';
import { useSubContracts } from '../../controller';
import { useContractModal } from '../../data';
import { CreateContract } from '../../domain';
enum EnumService {
  ACTIVITY,
  PLAN,
}
type FormProps = {
  plans: Plan[];
  activities: Activity[];
};
const formMapper = {
  selectService: {
    0: {
      name: 'Actividades:',
      display: 'Seleccione una actividad',
    },
    1: {
      name: 'Planes:',
      display: 'Seleccione un plan',
    },
  },
};
const Form: FC<FormProps> = ({ plans, activities }) => {
  const [typeService, setTypeService] = useState<EnumService>(EnumService.PLAN);
  const [, , { setValue }] = useField<EnumService>('typeService');
  const { handleSubmit } = useFormikContext();

  const optionsService = (
    typeService == EnumService.ACTIVITY ? activities : plans
  ).map((plan: SafeAny) => (
    <option key={plan.id} value={plan.id}>
      {plan.detail.name}
    </option>
  ));

  const selectServiceProperties = formMapper.selectService[typeService];
  return (
    <ChackraForm submit={handleSubmit}>
      <NumberInputControl name="price" label="Precio" />
      <SwitchControl name="paid" label="Pagado" />
      <FormControl>
        <FormLabel>Servicio:</FormLabel>
        <Select
          value={typeService}
          onChange={(val) => {
            const value = Number(val.target.value) as unknown as EnumService;
            setTypeService(value);
            setValue(value);
          }}
        >
          <option value={EnumService.ACTIVITY}>Actividad</option>
          <option value={EnumService.PLAN}>Plan</option>
        </Select>
        <SelectControl name="serviceId" label={selectServiceProperties.name}>
          <option value={-1}>{selectServiceProperties.display}</option>
          {optionsService}
        </SelectControl>
        <TextareaControl name="note" label="Nota:" />
      </FormControl>
    </ChackraForm>
  );
};

export const CreateContractForm = () => {
  const { isOpen: modalIsOpen, closeModal } = useContractModal();
  const { isLoading, joinPlan, plans, activities, joinActivity } =
    useSubContracts();
  const toast = useWellnessToast();
  const { isOpen, onClose } = useDisclosure({
    isOpen: modalIsOpen,
    onClose: closeModal,
  });

  if (isLoading) {
    return null;
  }

  return (
    <Formik<CreateContract>
      initialValues={{
        note: '',
        paid: true,
        price: 50,
        serviceId: -1,
        typeService: EnumService.PLAN,
      }}
      onSubmit={async (values, { resetForm }) => {
        onClose();
        resetForm();
        switch (Number(values.typeService)) {
          case EnumService.PLAN: {
            await joinPlan(values);
            toast({
              title: 'Plan correctamente creado',
            });
            break;
          }
          case EnumService.ACTIVITY: {
            await joinActivity(values);
            toast({
              title: 'Actividad correctamente creada',
            });
            break;
          }
        }
      }}
    >
      {({ submitForm }) => (
        <ModalCrud
          isOpen={isOpen}
          onClose={onClose}
          textHeader="Crear Contrato"
          footer={
            <HStack>
              <Button variant="ghost">Cancelar</Button>
              <SubmitButton onClick={submitForm}>Guardar</SubmitButton>
            </HStack>
          }
        >
          <Form plans={plans} activities={activities} />
        </ModalCrud>
      )}
    </Formik>
  );
};
