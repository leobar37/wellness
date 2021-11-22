import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { DeleteIcon, EditIcon } from '@wellness/admin-ui/icons';
import { SafeAny } from '@wellness/common';
import { useRouter } from 'next/router';
import { useClientController } from '../controller';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useTheme,
  SystemStyleObject,
} from '@chakra-ui/react';

import { ButtonIcon } from '@wellness/admin-ui/ui';
export const ClientPage: NextPageWithLayout<SafeAny> = () => {
  const { query } = useRouter();
  const theme = useTheme();
  const { client } = useClientController({
    clientId: query.clientId as string,
  });
  const tabStyles = {
    borderRadius: 'xl',
    mx: '3',
    _hover: {
      bg: 'gray.100',
    } as SystemStyleObject,
    _selected: {
      bg: 'brown.300',
      color: 'white',
    } as SystemStyleObject,
    _active: {
      bg: 'brown.300',
      color: 'white',
    } as SystemStyleObject,
  };
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
          <Tab {...tabStyles}>Dashboard</Tab>
          <Tab {...tabStyles}>Asistencias</Tab>
          <Tab {...tabStyles}>Servicios</Tab>
          <Tab {...tabStyles}>fichas</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <pre>{JSON.stringify(client, null, 5)}</pre>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

ClientPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
