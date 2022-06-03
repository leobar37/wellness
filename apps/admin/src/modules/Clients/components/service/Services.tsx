import {
  Badge,
  Box,
  HStack,
  SystemStyleObject,
  Text,
  Button,
} from '@chakra-ui/react';
import {
  ColTable,
  ContractView,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  prepareCellProps,
  Price,
  ProgressBadge,
  Table,
  Time,
  useModalConfirm,
  useWellnessToast,
  Role,
  ButtonIcon,
} from '@wellness/admin-ui';
import { SafeAny, ServiceType } from '@wellness/common';
import { useInitSubContracts, useSubContracts } from '../../controller';
import {
  useClientsStore,
  useContractModal,
  useShowContractModal,
} from '../../data';
import { useConfigFormats } from '@wellness/admin-ui';
import format from 'date-fns/format';
import { ShowByRol } from '@wellness/admin-ui';

export const ServicesSection = () => {
  const { openModal } = useContractModal();
  const { openModal: openShowModal } = useShowContractModal();

  const { selectClient, clientReport } = useClientsStore();
  const { contracts, isloading, refetchContracts } = useInitSubContracts({
    clientId: selectClient.id,
  });
  const toast = useWellnessToast();
  const { deleteContract } = useSubContracts();
  const confirm = useModalConfirm();
  const configFormats = useConfigFormats();

  const onConfirm = (contract: ContractView) => {
    confirm({
      title: 'Desea eliminar este contrato',
      onConfirm: async () => {
        await deleteContract(contract.contractId);
        refetchContracts();
        toast({
          title: 'Contrato eliminado correctamente',
          status: 'success',
        });
      },
    });
  };

  const planProgress = clientReport?.planProgress;

  return (
    <Box width={'750px'}>
      <HStack justify={'space-between'}>
        {planProgress && (
          <ProgressBadge
            title={planProgress.contractLabel}
            progress={planProgress.progress}
            subtitle={`${format(
              new Date(planProgress.finishedAt),
              configFormats.onlyDate
            )}  ${planProgress.progress}%`}
            value={
              <Text color={'white'}>
                <Price>{planProgress.price}</Price>
              </Text>
            }
          />
        )}
        <Button onClick={() => openModal()}>Agregar contrato</Button>
      </HStack>
      <Box mt={8}>
        <Table
          data={contracts}
          variant={'simple'}
          size={'md'}
          isSelecteable={false}
          isLoading={!!isloading}
        >
          <ColTable
            Header={'Contrato'}
            id="Contract"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<ContractView>(props);
              return (
                <Text fontSize="sm" color={'gray.500'}>
                  <Time>{original?.createdAt}</Time> {' - '}
                  <Time>{original?.finishedAt}</Time>
                </Text>
              );
            }}
          />
          <ColTable Header={'Nombre'} accessor="name" />
          <ColTable
            Header={'Estado'}
            accessor="paid"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<ContractView>(props);
              const styles: SystemStyleObject = original.paid
                ? {
                    bg: 'brown',
                    color: 'white',
                  }
                : {
                    bg: 'primary',
                    color: 'brown',
                  };
              const text = original.paid ? 'Pagado' : 'Deuda';
              return (
                <Badge sx={styles} py={1} px={2} rounded={'md'}>
                  {text}
                </Badge>
              );
            }}
          />
          <ColTable
            Header={'Tipo'}
            accessor="type"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<ContractView>(props);
              const styles: SystemStyleObject =
                original.type == ServiceType.activity
                  ? {
                      bg: 'brown',
                      color: 'white',
                    }
                  : {
                      bg: 'primary',
                      color: 'brown',
                    };
              const text =
                original.type == ServiceType.activity ? 'Actividad' : 'Plan';
              return (
                <Badge sx={styles} py={1} px={2} rounded={'md'}>
                  {text}
                </Badge>
              );
            }}
          />

          <ColTable
            id="selection"
            Header="Acción"
            Cell={(props) => {
              const { original } = prepareCellProps<ContractView>(
                props as SafeAny
              );

              return (
                <>
                  <HStack>
                    <ButtonIcon
                      onClick={() => {
                        openModal(original);
                      }}
                    >
                      <EditIcon />
                    </ButtonIcon>

                    <ShowByRol roles={[Role.ADMIN]}>
                      <ButtonIcon
                        bg={'blue.600'}
                        onClick={() => {
                          onConfirm(original);
                        }}
                      >
                        <DeleteIcon />
                      </ButtonIcon>
                    </ShowByRol>

                    <ButtonIcon
                      bg={'green.700'}
                      onClick={() => {
                        openShowModal(original);
                      }}
                    >
                      <EyeIcon />
                    </ButtonIcon>
                  </HStack>
                </>
              );
            }}
          />
        </Table>
      </Box>
    </Box>
  );
};
