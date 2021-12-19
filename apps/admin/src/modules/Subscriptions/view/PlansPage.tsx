import * as React from 'react';
import { BaseLayout } from '@wellness/admin-ui/components';
import type { NextPageWithLayout } from '@wellness/admin-ui/common';

export const PlansPage: NextPageWithLayout = () => {
  return <h1>Hello Plans page</h1>;
};

PlansPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
