import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
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
import { AsistenceTab } from '../components/asistence/AsistenceTab';
import { DashboardClient } from '../components/DashboarClient';
import { DashboardFicha } from '../components/ficha';
import { useClientController } from '../controller';
import { ServicesSection } from '../components/service';
import { CreateContractForm } from '../components/service';
import { useModalConfirm } from '@wellness/admin-ui';
export const ClientPage: NextPageWithLayout<SafeAny> = () => {
  const { query } = useRouter();
  const confirm = useModalConfirm();
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
          <ButtonIcon
            variant="red"
            onClick={() => {
              confirm({
                title: '¿Esta seguro de eliminar este cliente?',
              });
            }}
          >
            <DeleteIcon />
          </ButtonIcon>
          <ButtonIcon bg="brown.300" variant="link">
            <EditIcon color="white" />
          </ButtonIcon>
        </>
      }
    >
      <Tabs defaultIndex={2} variant="unstyled">
        <TabList>
          <TabWellness>Dashboard</TabWellness>
          <TabWellness>Asistencias</TabWellness>
          <TabWellness>Servicios</TabWellness>
          <TabWellness>fichas</TabWellness>
        </TabList>
        <TabPanels overflowY="scroll" maxHeight="500px">
          <TabContent>{/* <DashboardClient /> */}</TabContent>
          <TabContent>
            <AsistenceTab />
          </TabContent>
          <TabContent>
            <ServicesSection />
          </TabContent>
          <TabContent>
            <DashboardFicha />
          </TabContent>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

ClientPage.getLayout = (page) => {
  return (
    <BaseLayout>
      {page}
      <CreateContractForm />
    </BaseLayout>
  );
};
