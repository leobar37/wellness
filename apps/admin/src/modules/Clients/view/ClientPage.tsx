import { TabList, TabPanels, Tabs, useToken } from '@chakra-ui/react';
import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import {
  BaseLayout,
  Layout,
  TabContent,
  TabWellness,
} from '@wellness/admin-ui/components';
import { DeleteIcon, EditIcon } from '@wellness/admin-ui/icons';
import { ButtonIcon } from '@wellness/admin-ui/ui';
import { SafeAny } from '@wellness/common';
import { useRouter } from 'next/router';
import { DashboardClient } from '../components/DashboarClient';
import { AsistenceTab } from '../components/asistence/AsistenceTab';
import { useClientController } from '../controller';

export const ClientPage: NextPageWithLayout<SafeAny> = () => {
  const { query } = useRouter();

  const { client } = useClientController({
    clientId: query.clientId as string,
  });
  if (!client) {
    return <div>Loading...</div>;
  }
  return (
    <Layout
      backText={client.name}
      actions={
        <>
          <ButtonIcon variant="red">
            <DeleteIcon />
          </ButtonIcon>
          <ButtonIcon bg="brown.300" variant="link">
            <EditIcon color="white" />
          </ButtonIcon>
        </>
      }
    >
      <Tabs variant="unstyled">
        <TabList>
          <TabWellness>Dashboard</TabWellness>
          <TabWellness>Asistencias</TabWellness>
          <TabWellness>Servicios</TabWellness>
          <TabWellness>fichas</TabWellness>
        </TabList>
        <TabPanels>
          <TabContent>
            <DashboardClient />
          </TabContent>
          <TabContent>
            <AsistenceTab />
          </TabContent>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

ClientPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
