import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { SafeAny } from '@wellness/common';
import { useClientsStore } from '../data/client-store';
import { Button } from '@chakra-ui/react';
import { RegisterClientModal } from '../components';

const { toggleClientModal } = useClientsStore.getState();
export const Page: NextPageWithLayout<SafeAny> = () => {
  return (
    <Layout
      backText="Clientes"
      actions={<Button onClick={() => toggleClientModal(true)}>Crear</Button>}
    >
      <RegisterClientModal />
    </Layout>
  );
};

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
