import { Box, HStack, Text, Badge, SystemStyleObject } from '@chakra-ui/react';
import {
  ButtonIcon,
  Price,
  ProgressBadge,
  Time,
  ContractView,
} from '@wellness/admin-ui';
import { useInitSubContracts } from '../../controller';
import { ServiceType } from '@wellness/common';
import { useClientsStore, useContractModal } from '../../data';
import { Table, ColTable, prepareCellProps, matVa } from '@wellness/admin-ui';

import { SafeAny } from '@wellness/common';
export const ServicesSection = () => {
  const { openModal } = useContractModal();
  const { selectClient } = useClientsStore();
  const { contracts, isloading } = useInitSubContracts({
    clientId: selectClient.id,
  });

  if (isloading) {
    return null;
  }

  return (
    <Box width={'700px'}>
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
        >
          <ColTable
            Header={'Contrato'}
            id="Contract"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<ContractView>(props);

              return (
                <Text fontSize="sm" color={'gray.500'}>
                  <Time>{original?.createdAt}</Time>-
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
                    bg: 'brown.300',
                    color: 'white',
                  }
                : {
                    bg: 'primary',
                    color: 'brown.300',
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
                      bg: 'brown.300',
                      color: 'white',
                    }
                  : {
                      bg: 'primary',
                      color: 'brown.300',
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
        </Table>
      </Box>
    </Box>
  );
};
