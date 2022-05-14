import { HStack } from '@chakra-ui/react';
import { BaseLayout, Layout, NextPageWithLayout } from '@wellness/admin-ui';
import { BadgesWidget, GrowthWidget, AlertsWidget } from './widgets';

export const DashboardPage: NextPageWithLayout = () => {
  return (
    <Layout backText="Dashboard">
      {/* <BadgesWidget /> */}
      <HStack mt={5} spacing={10} justifyContent="center" alignItems={"start"}>
        <GrowthWidget />
        <AlertsWidget />
      </HStack>
    </Layout>
  );
};

DashboardPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
