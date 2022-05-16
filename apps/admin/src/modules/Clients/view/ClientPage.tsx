import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { NextPageWithLayout, Role } from '@wellness/admin-ui/common';
import {
  BaseLayout,
  Layout,
  TabContent,
  TabWellness,
} from '@wellness/admin-ui/components';
import { DeleteIcon, EditIcon } from '@wellness/admin-ui/icons';
import { ButtonIcon } from '@wellness/admin-ui/ui';
import { SafeAny, isValid } from '@wellness/common';
import { useRouter } from 'next/router';
import { AsistenceTab } from '../components/asistence/AsistenceTab';
import { DashboardClient } from '../components/DashboarClient';
import { DashboardFicha } from '../components/ficha';
import { useInitClientController } from '../controller';
import { ServicesSection } from '../components/service';
import { CreateContractForm } from '../components/service';
import { RegisterClientModal } from '../components';
import { useModalConfirm } from '@wellness/admin-ui';
import { useClientCrudModal } from '../data';
import { ShowContractModal } from '../components/service';
import { ShowByRol } from '@wellness/admin-ui/auth';
const mapProperties = {};

export const ClientPage: NextPageWithLayout<SafeAny> = () => {
  const { query } = useRouter();
  const confirm = useModalConfirm();
  const { openModal } = useClientCrudModal();

  const { client, isLoading } = useInitClientController({
    clientId: query.clientId as string,
  });
  const tab = query.tab;

  let defaulIndex = 0;

  if (isValid(tab)) {
    defaulIndex = Number(tab);
  }

  return (
    <Layout
      backText={client?.name || ''}
      actions={
        <>
          <ShowByRol roles={[Role.ADMIN]}>
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
          </ShowByRol>
          <ButtonIcon
            onClick={() => openModal(true)}
            bg="brown.300"
            variant="link"
          >
            <EditIcon color="white" />
          </ButtonIcon>
        </>
      }
    >
      {!isLoading && (
        <Tabs defaultIndex={defaulIndex} variant="unstyled">
          <TabList>
            <TabWellness>Dashboard</TabWellness>
            <TabWellness>Asistencias</TabWellness>
            <TabWellness>Servicios</TabWellness>
            <TabWellness>fichas</TabWellness>
          </TabList>
          <TabPanels overflowY="scroll" maxHeight="500px">
            <TabContent>
              <DashboardClient />
            </TabContent>
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
      )}
    </Layout>
  );
};

ClientPage.getLayout = (page) => {
  return (
    <BaseLayout>
      {page}
      <CreateContractForm />
      <RegisterClientModal />
      <ShowContractModal />
    </BaseLayout>
  );
};
