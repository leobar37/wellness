import { TabList, TabPanels, Tabs } from '@chakra-ui/react';
import {
  BaseLayout,
  ButtonIcon,
  Layout,
  NextPageWithLayout,
  TabContent,
  TabWellness,
  useModalConfirm,
} from '@wellness/admin-ui';
import { DeleteIcon, EditIcon } from '@wellness/admin-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { CrudPlanModal, DashBoardPlan } from '../components/plan';
import { ListContracts, ShowContractModal } from '../components/shared';
import { useInitPlanController, usePlansController } from '../controller';
import { usePlanModal } from '../data';

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

  return (
    <Layout
      backText={plan?.detail?.name ?? ''}
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
          <TabWellness>Contratos</TabWellness>
        </TabList>
        <TabPanels>
          <TabContent>{!isLoading && <DashBoardPlan plan={plan} />}</TabContent>
          <TabContent>
            <ListContracts />
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
      <ShowContractModal />
    </BaseLayout>
  );
};
