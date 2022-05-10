import { Badge, Box, HStack, SystemStyleObject, Text } from '@chakra-ui/react';
import {
  ButtonIcon,
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
} from '@wellness/admin-ui';
import { SafeAny, ServiceType } from '@wellness/common';
import { useInitSubContracts, useSubContracts } from '../../controller';
import {
  useClientsStore,
  useContractModal,
  useShowContractModal,
} from '../../data';

export const ServicesSection = () => {
  const { openModal } = useContractModal();
  const { openModal: openShowModal } = useShowContractModal();
  const { selectClient } = useClientsStore();
  const { contracts, isloading, refetchContracts } = useInitSubContracts({
    clientId: selectClient.id,
  });
  const toast = useWellnessToast();
  const { deleteContract } = useSubContracts();
  const confirm = useModalConfirm();

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

  return (
    <Box width={'750px'}>
      <HStack justify={'space-between'}>
        <ProgressBadge
          title="Plan"
          progress={50}
          subtitle={'10/50/50'}
          value={
            <Text color={'white'}>
              <Price>{10}</Price>
            </Text>
          }
        />
        <ButtonIcon onClick={() => openModal()}>+</ButtonIcon>
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
                    <ButtonIcon
                      bg={'red'}
                      onClick={() => {
                        onConfirm(original);
                      }}
                    >
                      <DeleteIcon />
                    </ButtonIcon>
                    <ButtonIcon
                      bg={'green.300'}
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
