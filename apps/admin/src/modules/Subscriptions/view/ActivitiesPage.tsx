import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { Badgebg } from '@wellness/admin-ui/ui';
import * as React from 'react';
import { HStack } from '@chakra-ui/react';
import { useInitActivityController } from '../controller';
import { CreateActivityModal } from '../components';
export const ActivitiesPage: NextPageWithLayout = () => {
  const { activities } = useInitActivityController();
  console.log(activities);

  return (
    <Layout backText="Actividades">
      <HStack>
        <Badgebg name="Total de actividades" value={50} />
      </HStack>
      <CreateActivityModal />
    </Layout>
  );
};

ActivitiesPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
