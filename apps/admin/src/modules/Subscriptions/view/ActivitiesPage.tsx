import { Button, HStack } from '@chakra-ui/react';
import type { Activity, NextPageWithLayout } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { EyeIcon } from '@wellness/admin-ui/icons';
import {
  Badgebg,
  ButtonIcon,
  ColTable,
  GlobalFilter,
  prepareCellProps,
  Price,
  Table,
  TableInstanceProps,
  useModalConfirm,
} from '@wellness/admin-ui/ui';
import { SafeAny } from '@wellness/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateActivityModal } from '../components';
import { useInitActivitiesController } from '../controller';
import { useActivityModal, useSubscriptionsStore } from '../data';
export const ActivitiesPage: NextPageWithLayout = () => {
  const { activities, isLoading } = useInitActivitiesController();
  const confirm = useModalConfirm();
  const { openModal } = useActivityModal();
  const { patch } = useSubscriptionsStore();
  const router = useRouter();
  const [table, setTable] = useState<TableInstanceProps | null>();

  const onSelectActivity = (activity: Activity) => {
    router.push(`./activities/${activity.id}`);
  };

  return (
    <>
      <Layout
        backText="Actividades"
        actions={<Button onClick={() => openModal()}>Crear</Button>}
      >
        <HStack>
          <Badgebg name="Total de actividades" value={activities.length} />
        </HStack>
        <HStack justify="space-between" mt={10}>
          {table && <GlobalFilter table={table} />}
        </HStack>
        <Table
          isSelecteable={false}
          data={activities}
          mt={8}
          onTable={setTable}
          isLoading={isLoading}
          rowProps={({ original }) => ({
            sx: {
              _hover: {
                cursor: 'pointer',
                bg: 'gray.100',
              },
            },
          })}
        >
          <ColTable accessor="detail.name" Header="Nombre" />
          <ColTable accessor="detail.description" Header="Descripción" />
          <ColTable
            accessor="detail.price"
            Header="Precio"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Activity>(props);
              return <Price>{original.detail.price}</Price>;
            }}
          />
          <ColTable
            id="actions"
            Header="Actions"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Activity>(props);
              return (
                <HStack>
                  <ButtonIcon
                    bg={'brown'}
                    onClick={() => {
                      onSelectActivity(original as SafeAny);
                    }}
                  >
                    <EyeIcon />
                  </ButtonIcon>
                </HStack>
              );
            }}
          />
        </Table>
      </Layout>
    </>
  );
};

ActivitiesPage.getLayout = (page) => (
  <BaseLayout>
    {page}
    <CreateActivityModal />
  </BaseLayout>
);
