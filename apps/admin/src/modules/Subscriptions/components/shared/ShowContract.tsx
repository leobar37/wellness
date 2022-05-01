import { HStack, VStack, Button } from '@chakra-ui/react';
import { isFunction } from '@chakra-ui/utils';
import { EyeIcon } from '@wellness/admin-ui/icons';
import { ButtonIcon, ContractView, Price, Printer } from '@wellness/admin-ui';
import { ModalCrud, Time } from '@wellness/admin-ui/components';
import { DetailInfo } from '@wellness/admin-ui/ui';
import { isValid, SafeAny } from '@wellness/common';
import { get } from 'lodash';
import { ReactNode } from 'react';
import { useShowContractModal } from '../../data';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
const mapper: {
  [key in keyof ContractView]?: {
    name: string;
    format?: (val: SafeAny, prop?: (key: string) => SafeAny) => ReactNode;
  };
} = {
  clientName: {
    name: 'Cliente',
    format: (field, prop) => {
      return `${field} ${prop('clientLastName')}`;
    },
  },
  dni: {
    name: 'DNI',
  },
  name: {
    name: 'Servicio',
  },
  createdAt: {
    name: 'Fecha de Inicio',
    format: (val) => <Time>{val}</Time>,
  },
  finishedAt: {
    name: 'Fecha de Finalización',
    format: (val) => <Time>{val}</Time>,
  },
  realPrice: {
    name: 'Monto',
    format: (val) => <Price>{val}</Price>,
  },
  description: {
    name: 'Descripción del servicio',
  },
};
/**
 *   TODO:
 *   - Move this component to componenes folder with a reusable logic
 *
 */
export const ShowContractModal = () => {
  const { isOpen, closeModal, contract } = useShowContractModal();
  const router = useRouter();
  if (!contract) {
    return null;
  }
  return (
    <ModalCrud
      textHeader={
        isOpen && (
          <>
            <Time>{contract?.createdAt}</Time>
            {'-'}
            <Time>{contract?.finishedAt}</Time>
          </>
        )
      }
      footer={
        <>
          <ButtonIcon bg={'brown.300'}>
            <Printer />
          </ButtonIcon>
        </>
      }
      isOpen={isOpen}
      onClose={closeModal}
    >
      <VStack align={'start'} spacing={5}>
        <HStack justify={'end'} w="full">
          <Button
            rightIcon={<EyeIcon />}
            onClick={() => {
              closeModal();
              router.push({
                pathname: `../../clients/[clientId]`,
                query: {
                  clientId: contract.clientId,
                  tab: 2,
                },
              });
            }}
          >
            Ver cliente
          </Button>
        </HStack>
        {Object.keys(mapper).map((key) => {
          const value = get(contract, key);
          const prop = (key: string) => get(contract, key);
          const properties = get(mapper, key);
          if (!isValid(value)) {
            return null;
          }
          const _value = isFunction(properties.format)
            ? properties.format(value, prop)
            : value;

          return (
            <DetailInfo key={key} title={properties.name} value={_value} />
          );
        })}
      </VStack>
    </ModalCrud>
  );
};
