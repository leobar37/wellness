import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { ButtonIcon, useModalConfirm } from '@wellness/admin-ui';
import { NextPageWithLayout, Role } from '@wellness/admin-ui/common';
import {
  BaseLayout,
  Layout,
  TabContent,
  TabWellness,
} from '@wellness/admin-ui/components';
import { DeleteIcon, EditIcon } from '@wellness/admin-ui/icons';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ListContracts } from '../components';
import { CreateActivityModal, DashBoardActivity } from '../components/activity';
import { useActivityController, useInitActivyController } from '../controller';
import { useActivityModal } from '../data';
import { ShowByRol } from '@wellness/admin-ui';
import { ShowContractModal } from '../components';
export const ActivitiePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { openModal } = useActivityModal();
  const confirm = useModalConfirm();
  const { activityId } = router.query;

  const { deleteActivity } = useActivityController();
  const { activity, isLoading } = useInitActivyController({
    activityId: activityId as string,
  });

  return (
    <Layout
      backText={activity?.detail?.name || ''}
      actions={
        <>
          <ShowByRol roles={[Role.ADMIN]}>
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
          </ShowByRol>
          <ButtonIcon
            bg="brown.300"
            variant="link"
            onClick={() => {
              openModal(activity);
            }}
          >
            <EditIcon color="white" />
          </ButtonIcon>
        </>
      }
    >
      <Tabs variant="unstyled" defaultIndex={0}>
        <TabList>
          <TabWellness>Dashboard</TabWellness>
          <TabWellness>Contratos</TabWellness>
        </TabList>
        {!isLoading && (
          <TabPanels>
            <TabContent>
              <DashBoardActivity activity={activity} />
            </TabContent>
            <TabContent>
              <ListContracts />
            </TabContent>
          </TabPanels>
        )}
      </Tabs>
    </Layout>
  );
};

ActivitiePage.getLayout = (page) => (
  <BaseLayout>
    {page}
    <CreateActivityModal />
    <ShowContractModal />
  </BaseLayout>
);

export default ActivitiePage;
