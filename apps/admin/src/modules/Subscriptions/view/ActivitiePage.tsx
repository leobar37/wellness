import * as React from 'react';
import { useRouter } from 'next/router';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { NextPageWithLayout } from '@wellness/admin-ui/common';
import { useInitActivyController } from '../controller';
export const ActivitiePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { activityId } = router.query;
  const { activity } = useInitActivyController({
    activityId: Number(activityId),
  });
  return (
    <Layout backText="Actividades">
      <pre>{JSON.stringify(activity, null, 2)}</pre>
    </Layout>
  );
};

ActivitiePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ActivitiePage;
