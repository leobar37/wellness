import { NextPageWithLayout } from '@wellness/admin-ui';
import { BaseLayout, Layout } from '@wellness/admin-ui';
import { Button } from '@chakra-ui/react';
import { CreateAdminModal } from '../components';
export const ListAdmins: NextPageWithLayout = () => {
  return (
    <Layout
      backText="Administradores"
      actions={
        <>
          <Button>Agregar</Button>
        </>
      }
    ></Layout>
  );
};

ListAdmins.getLayout = (page) => {
  return (
    <BaseLayout>
      {page}
      <CreateAdminModal />
    </BaseLayout>
  );
};
