import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { SafeAny } from '@wellness/common';
import { useClientsStore } from '../data/client-store';
import { Button } from '@chakra-ui/react';
import { RegisterClientModal } from '../components';
import { useClientsController } from '../controller';
import { ColTable, Table } from '@wellness/admin-ui/ui';
const { toggleClientModal } = useClientsStore.getState();

export const Page: NextPageWithLayout<SafeAny> = () => {
  const { clients } = useClientsController();

  console.log('clients', clients);
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
      </Table>
    </Layout>
  );
};

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
