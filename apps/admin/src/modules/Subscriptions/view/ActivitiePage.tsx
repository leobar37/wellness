import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { ButtonIcon } from '@wellness/admin-ui';
import { NextPageWithLayout } from '@wellness/admin-ui/common';
import { useModalConfirm } from '@wellness/admin-ui';
import { SafeAny } from '@wellness/common';
import {
  BaseLayout,
  Layout,
  TabContent,
  TabWellness,
} from '@wellness/admin-ui/components';

import { DeleteIcon, EditIcon } from '@wellness/admin-ui/icons';
import { useRouter } from 'next/router';
import * as React from 'react';
import { CreateActivityModal, DashBoardActivity } from '../components/activity';
import { useInitActivyController, useActivityController } from '../controller';
import { useActivityModal } from '../data';
export const ActivitiePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { openModal } = useActivityModal();
  const confirm = useModalConfirm();
  const { activityId } = router.query;
  const { deleteActivity } = useActivityController();
  const { activity, isLoading } = useInitActivyController({
    activityId: Number(activityId),
  });
  if (isLoading) {
    return null;
  }

  return (
    <Layout
      backText={activity.detail.name}
      actions={
        <>
          <ButtonIcon
            variant="red"
            onClick={() => {
              confirm({
                onConfirm: async () => {
                  await deleteActivity();
                  router.push('./');
                },
              });
            }}
          >
            <DeleteIcon />
          </ButtonIcon>
          <ButtonIcon
            bg="brown.300"
            variant="link"
            onClick={() => {
              openModal(activity as SafeAny);
            }}
          >
            <EditIcon color="white" />
          </ButtonIcon>
        </>
      }
    >
      {/* <pre>{JSON.stringify(activity, null, 2)}</pre> */}
      <Tabs variant="unstyled" defaultIndex={0}>
        <TabList>
          <TabWellness>Dashboard</TabWellness>
          <TabWellness>Usuarios</TabWellness>
        </TabList>
        <TabPanels>
          <TabContent>
            <DashBoardActivity activity={activity} />
          </TabContent>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

ActivitiePage.getLayout = (page) => (
  <BaseLayout>
    {page}
    <CreateActivityModal />
  </BaseLayout>
);

export default ActivitiePage;
