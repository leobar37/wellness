import React from 'react';
import { useRouter } from 'next/router';
import {
  NextPageWithLayout,
  BaseLayout,
  Layout,
  ButtonIcon,
  useModalConfirm,
  TabWellness,
  TabContent,
} from '@wellness/admin-ui';
import { useInitPlanController, usePlansController } from '../controller';
import { DeleteIcon, EditIcon } from '@wellness/admin-ui/icons';
import { usePlanModal } from '../data';
import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { CrudPlanModal, DashBoardPlan } from '../components/plan';
export const PlanPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { planId } = query as { planId: string };
  const confirm = useModalConfirm();
  const { openModal } = usePlanModal();
  const router = useRouter();
  const { plan, isLoading } = useInitPlanController({
    planId: planId,
  });
  const { deletePlan } = usePlansController();

  if (isLoading) {
    return <div>loading ...</div>;
  }
  return (
    <Layout
      backText={plan.detail.name}
      actions={
        <>
          <ButtonIcon
            variant="red"
            onClick={() => {
              confirm({
                onConfirm: async () => {
                  await deletePlan();
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
              openModal(true);
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
          <TabWellness>Usuarios</TabWellness>
        </TabList>
        <TabPanels>
          <TabContent>
            <DashBoardPlan plan={plan} />
          </TabContent>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

PlanPage.getLayout = (page) => {
  return (
    <BaseLayout>
      {page}
      <CrudPlanModal />
    </BaseLayout>
  );
};
