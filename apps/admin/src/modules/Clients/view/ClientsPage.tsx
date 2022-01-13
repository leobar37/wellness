import { Box, Button, HStack } from '@chakra-ui/react';
import type { Client, NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { DeleteIcon, DotsVertical, Filter } from '@wellness/admin-ui/icons';
import { Badgebg, ColTable, Table } from '@wellness/admin-ui/ui';
import { ButtonIcon } from '@wellness/admin-ui';
import { EyeIcon } from '@wellness/admin-ui';
import {
  GlobalFilter,
  prepareCellProps,
  TableInstanceProps,
} from '@wellness/admin-ui/ui/table';
import { SafeAny } from '@wellness/common';
import { useState } from 'react';
import { RegisterClientModal } from '../components';
import { useInitClientsController } from '../controller';
import { useClientsStore } from '../data/client-store';
import { useRouter } from 'next/router';
import { useClientCrudModal } from '../data';
export const Page: NextPageWithLayout<SafeAny> = () => {
  const { clients } = useInitClientsController();
  const [table, setTable] = useState<TableInstanceProps | null>();
  const { openModal } = useClientCrudModal();
  const router = useRouter();

  const onSelectClient = (client: Client) => {
    router.push(`./clients/${client.id}`);
  };

  return (
    <Layout
      backText="Clientes"
      actions={<Button onClick={() => openModal()}>Crear</Button>}
      py={4}
    >
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
        </HStack>
      </HStack>
      <Table
        isSelecteable={false}
        onTable={(table) => {
          setTable(table);
        }}
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
          Header="Aciones"
          id="menu"
          cellStyles={{
            textAlign: 'center',
          }}
          maxWidth={10}
          Cell={(props: SafeAny) => {
            const { original } = prepareCellProps<Client>(props);
            return (
              <HStack>
                <ButtonIcon
                  bg={'brown'}
                  onClick={() => {
                    onSelectClient(original as SafeAny);
                  }}
                >
                  <EyeIcon />
                </ButtonIcon>
              </HStack>
            );
          }}
        />
      </Table>
    </Layout>
  );
};

Page.getLayout = (page) => {
  return (
    <BaseLayout>
      {page}
      <RegisterClientModal />
    </BaseLayout>
  );
};
