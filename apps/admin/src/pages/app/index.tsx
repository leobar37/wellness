import { NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
const AppPage: NextPageWithLayout = () => {
  return <Layout backText="Dashboard">hello worl</Layout>;
};

AppPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};

export default AppPage;
