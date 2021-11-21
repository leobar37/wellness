import type { NextPageWithLayout, Client } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { SafeAny } from '@wellness/common';
import { useClientsStore } from '../data/client-store';
import { Button } from '@chakra-ui/react';
import { RegisterClientModal } from '../components';
import { useClientsController } from '../controller';
import { ColTable, Table } from '@wellness/admin-ui/ui';
import { DotsVertical } from '@wellness/admin-ui/icons';
import { prepareCellProps } from '@wellness/admin-ui/ui/table';
import { Box } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
const { toggleClientModal } = useClientsStore.getState();

export const Page: NextPageWithLayout<SafeAny> = () => {
  const { clients } = useClientsController();

  const onSelectClient = (client: Client) => {
    console.log('selected client', client);
  };

  return (
    <Layout
      backText="Clientes"
      actions={<Button onClick={() => toggleClientModal(true)}>Crear</Button>}
    >
      <RegisterClientModal />
      <Table data={clients}>
        <ColTable Header="Nombre" accessor="name" />
        <ColTable Header="Apellido" accessor="lastName" />
        <ColTable Header="Correo" accessor="email" />
        <ColTable Header="Dni" accessor="dni" />
        <ColTable
          Header="Selcción"
          id="selection"
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
