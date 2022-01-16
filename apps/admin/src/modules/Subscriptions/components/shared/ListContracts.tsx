import { Badge, Box, HStack, SystemStyleObject, Text } from '@chakra-ui/react';
import {
  ButtonIcon,
  ColTable,
  ContractView,
  EyeIcon,
  prepareCellProps,
  Table,
  Time,
} from '@wellness/admin-ui';
import { SafeAny } from '@wellness/common';
import { useSubscriptionsStore } from '../../data';
import { useShowContractModal } from '../../data';
export const ListContracts = () => {
  const { contracts } = useSubscriptionsStore();
  const { openModal } = useShowContractModal();
  return (
    <Box width={'750px'}>
      <HStack justify={'space-between'}></HStack>
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
          <ColTable Header={'Nombre'} accessor="clientName" />
          <ColTable Header={'Apellido'} accessor="clientLastName" />
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
                      bg={'green.300'}
                      onClick={() => {
                        openModal(original);
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
