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
  ContractView,
  ModalCrud,
  Plan,
  ServiceType,
  Time,
  useWellnessToast,
} from '@wellness/admin-ui';
import { ID, isValid, SafeAny } from '@wellness/common';
import { Formik, useField, useFormikContext } from 'formik';
import {
  NumberInputControl,
  SelectControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from 'formik-chakra-ui';
import { FC, useEffect, useState } from 'react';
import { useSubContracts } from '../../controller';
import { useContractModal } from '../../data';
import { CreateContract, createContractSchema } from '../../domain';
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
  mode: {
    edit: {
      heading: (contract: ContractView) => (
        <>
          Editando: <Time>{contract.createdAt}</Time>
          {'-'}
          <Time>{contract.finishedAt}</Time>
        </>
      ),
      button: 'Guardar cambios',
    },
    create: {
      heading: (contract?: ContractView) => `Crear Contrato`,
      button: 'Guardar cambios',
    },
  },
};
const Form: FC<FormProps> = ({ plans, activities }) => {
  const [typeService, setTypeService] = useState<EnumService>(EnumService.PLAN);
  const { isOpen: modalIsOpen, contract, state } = useContractModal();

  const [, , { setValue }] = useField<EnumService>('typeService');

  const { handleSubmit, setValues, resetForm, values, setFieldValue } =
    useFormikContext<CreateContract>();

  useEffect(() => {
    if (isValid(contract) && state == 'edit') {
      const isActity = contract.type === ServiceType.activity;
      setValues({
        note: contract.note,
        paid: contract.paid,
        price: contract.price,
        serviceId: Number(contract.serviceId),
        typeService: isActity ? EnumService.ACTIVITY : EnumService.PLAN,
      });
      setTypeService(isActity ? EnumService.ACTIVITY : EnumService.PLAN);
    } else {
      resetForm();
    }
  }, [contract, state, setValues, resetForm]);

  useEffect(() => {
    if (values.serviceId) {
      const findByid = (id: ID) => (data: SafeAny) =>
        Number(data.id) === Number(id);
      const serviceId = values.serviceId;
      const isActivity = typeService === EnumService.ACTIVITY;
      const validArr = (arr: SafeAny) => arr || [];
      const price = (isActivity ? validArr(activities) : validArr(plans)).find(
        findByid(serviceId)
      )?.detail?.price;
      if (price) {
        setFieldValue('price', price);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.serviceId]);
  const isEdit = state === 'edit';

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
      <SwitchControl name="paid" label="Pagado" />
      <FormControl>
        <FormLabel>Servicio:</FormLabel>
        <Select
          value={typeService}
          isDisabled={isEdit}
          onChange={(val) => {
            const value = Number(val.target.value) as unknown as EnumService;
            setTypeService(value);
            setValue(value);
          }}
        >
          <option value={EnumService.ACTIVITY}>Actividad</option>
          <option value={EnumService.PLAN}>Plan</option>
        </Select>
        <SelectControl
          name="serviceId"
          isDisabled={isEdit}
          defaultValue={isEdit && contract?.serviceId}
          label={selectServiceProperties.name}
        >
          <option value={-1}>{selectServiceProperties.display}</option>
          {optionsService}
        </SelectControl>
        <NumberInputControl name="price" label="Precio" />
        <TextareaControl name="note" label="Nota:" />
      </FormControl>
    </ChackraForm>
  );
};

export const CreateContractForm = () => {
  const {
    isOpen: modalIsOpen,
    closeModal,
    state,
    contract,
    refetch,
  } = useContractModal();
  const { isLoading, joinPlan, plans, activities, joinActivity, editContract } =
    useSubContracts();
  const toast = useWellnessToast();

  const { isOpen, onClose } = useDisclosure({
    isOpen: modalIsOpen,
    onClose: closeModal,
  });
  const stateProperties = formMapper.mode[state];

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
      validationSchema={createContractSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (state == 'edit') {
            await editContract(contract.contractId, values);
            toast({
              title: 'Contrato editado correctamente',
            });
            resetForm();
            onClose();
            return;
          }
          switch (Number(values.typeService)) {
            case EnumService.PLAN: {
              await joinPlan(values);
              toast({
                title: 'Contrato correctamente creado',
              });
              break;
            }
            case EnumService.ACTIVITY: {
              await joinActivity(values);
              toast({
                title: 'Contrato correctamente creada',
              });
              break;
            }
          }
          resetForm();
          onClose();
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ submitForm, resetForm }) => (
        <ModalCrud
          isOpen={isOpen}
          onClose={async () => {
            refetch?.();
            resetForm();
            onClose();
          }}
          textHeader={stateProperties.heading(contract)}
          footer={
            <HStack>
              <Button variant="ghost">Cancelar</Button>
              <SubmitButton onClick={submitForm}>
                {stateProperties.button}
              </SubmitButton>
            </HStack>
          }
        >
          <Form plans={plans} activities={activities} />
        </ModalCrud>
      )}
    </Formik>
  );
};
