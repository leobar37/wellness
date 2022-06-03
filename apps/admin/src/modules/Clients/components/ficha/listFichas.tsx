import { Badge, Box, HStack } from '@chakra-ui/react';
import { Ficha } from '@wellness/admin-ui/common';
import { useConfigFormats } from '@wellness/admin-ui/config';
import { ColTable, prepareCellProps, Table } from '@wellness/admin-ui/ui/table';
import { SafeAny } from '@wellness/common';
import format from 'date-fns/format';
import * as React from 'react';
import { useClientsStore } from '../../data/client-store';
import { ViewFichaModal } from './ViewFicha';
import { ButtonIcon, useModalConfirm } from '@wellness/admin-ui';
import { DeleteIcon } from '@wellness/admin-ui/icons';
const { selectFicha } = useClientsStore.getState();
import { useFichaController } from '../../controller/use-ficha-controller';
import { useGetFichas } from '../../controller';

const _ListFichas = () => {
  const formats = useConfigFormats();
  const confirm = useModalConfirm();
  const { deleteFicha } = useFichaController();
  const { data: fichas } = useGetFichas();
  return (
    <Box>
      {fichas && (
        <Table
          isSelecteable={false}
          data={fichas}
          rowProps={({ original }) => {
            return {
              _hover: {
                bg: 'gray.100',
                cursor: 'pointer',
              },
              onClick: () => {
                const ficha = original as Ficha;
                if (ficha.closed) {
                  selectFicha(ficha);
                }
              },
            };
          }}
        >
          <ColTable
            Header={'Abierto'}
            accessor="createdAt"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return original?.createdAt
                ? format(new Date(original?.createdAt), formats.onlyDate)
                : formats.whenNotFoundInTable;
            }}
          />
          <ColTable
            Header={'Cerrado'}
            accessor="closedAt"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return original?.closedAt
                ? format(new Date(original?.closedAt), formats.onlyDate)
                : formats.whenNotFoundInTable;
            }}
          />
          <ColTable
            Header={'Estado'}
            accessor="closed"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return original.closed ? (
                <Badge>Cerrado</Badge>
              ) : (
                <Badge variant="solid" colorScheme={'yellow'}>
                  Activo
                </Badge>
              );
            }}
          />
          <ColTable
            Header={'Accciones'}
            id="actions"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return (
                <HStack>
                  <ButtonIcon
                    variant={'red'}
                    onClick={() => {
                      confirm({
                        title: '¿Está seguro de eliminar la ficha?',
                        onConfirm: async () => {
                          deleteFicha(original?.id);
                        },
                      });
                    }}
                  >
                    <DeleteIcon />
                  </ButtonIcon>
                </HStack>
              );
            }}
          />
        </Table>
      )}
      <ViewFichaModal />
    </Box>
  );
};
const ListFichas = React.memo(_ListFichas);

export default _ListFichas;
