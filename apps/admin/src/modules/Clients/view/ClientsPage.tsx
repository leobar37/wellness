import { Box, Button, HStack } from '@chakra-ui/react';
import type { Client, NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { DeleteIcon, DotsVertical, Filter } from '@wellness/admin-ui/icons';
import { Badgebg, ColTable, Table } from '@wellness/admin-ui/ui';
import {
  GlobalFilter,
  prepareCellProps,
  TableInstanceProps,
} from '@wellness/admin-ui/ui/table';
import { SafeAny } from '@wellness/common';
import { useState } from 'react';
import { RegisterClientModal } from '../components';
import { useClientsController } from '../controller';
import { useClientsStore } from '../data/client-store';
import { useRouter } from 'next/router';
export const Page: NextPageWithLayout<SafeAny> = () => {
  const { clients } = useClientsController();
  const [table, setTable] = useState<TableInstanceProps | null>();

  const { toggleClientModal, setDeleteClients } = useClientsStore.getState();
  const { selectDeleteClients } = useClientsStore();
  const router = useRouter();
  const showDeleteIcon = selectDeleteClients && selectDeleteClients.length > 0;

  const onSelectClient = (client: Client) => {
    router.push(`./clients/${client.id}`);
    console.log(client);
  };
  return (
    <Layout
      backText="Clientes"
      actions={<Button onClick={() => toggleClientModal(true)}>Crear</Button>}
      py={4}
    >
      <RegisterClientModal />
      <HStack spacing={4} my={3}>
        <Badgebg name="Cantidad de clientes" value={clients.length} />
      </HStack>
      <HStack justify="space-between" mt={8}>
        {/* search componente */}
        {table && <GlobalFilter table={table} />}
        <HStack>
          <Button leftIcon={<Filter />} variant="ghost">
            Filtros
          </Button>
          {showDeleteIcon && (
            <Button variant="red" leftIcon={<DeleteIcon fontSize="large" />}>
              {selectDeleteClients.length}
            </Button>
          )}
        </HStack>
      </HStack>
      <Table
        onTable={(table) => {
          setTable(table);
        }}
        onChangueTable={(result) => {
          console.log('result', result);
          setDeleteClients(result.selection.nodes);
        }}
        rowProps={({ original }) => ({
          onClick: () => onSelectClient(original as SafeAny),
          sx: {
            _hover: {
              cursor: 'pointer',
              bg: 'gray.100',
            },
          },
        })}
        data={clients}
        variant="simple"
        size="sm"
        my={8}
      >
        <ColTable Header="Nombre" accessor="name" />
        <ColTable Header="Apellido" accessor="lastName" />
        <ColTable Header="Correo" accessor="email" />
        <ColTable Header="Dni" accessor="dni" />
        <ColTable
          Header="Selcción"
          id="menu"
          cellStyles={{
            textAlign: 'center',
          }}
          maxWidth={10}
          Cell={(props: SafeAny) => {
            const { original } = prepareCellProps<Client>(props);
            return (
              <Box as="button" onClick={() => onSelectClient(original)}>
                <DotsVertical />
              </Box>
            );
          }}
        />
      </Table>
    </Layout>
  );
};

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
