import type { NextPageWithLayout, Activity } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { TableInstanceProps } from '@wellness/admin-ui/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Badgebg,
  Table,
  ColTable,
  prepareCellProps,
  Price,
  GlobalFilter,
} from '@wellness/admin-ui/ui';
import { HStack, Button } from '@chakra-ui/react';
import { useInitActivitiesController } from '../controller';
import { CreateActivityModal } from '../components';
import { useSubscriptionsStore } from '../data';
import { SafeAny } from '@wellness/common';
import { DeleteIcon } from '@wellness/admin-ui/icons';

export const ActivitiesPage: NextPageWithLayout = () => {
  const { activities, isLoading } = useInitActivitiesController();
  const { toggleActivitiesCrudModal, patch, selectDeleteActivities } =
    useSubscriptionsStore();
  const router = useRouter();
  const [table, setTable] = useState<TableInstanceProps | null>();

  const showDeleteIcon =
    selectDeleteActivities && selectDeleteActivities.length > 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const onSelectActivity = (activity: Activity) => {
    router.push(`./activities/${activity.id}`);
  };
  return (
    <>
      <Layout
        backText="Actividades"
        actions={
          <Button onClick={() => toggleActivitiesCrudModal(true)}>Crear</Button>
        }
      >
        <HStack>
          <Badgebg name="Total de actividades" value={50} />
        </HStack>
        <HStack justify="space-between" mt={10}>
          {table && <GlobalFilter table={table} />}
          <HStack>
            {showDeleteIcon && (
              <Button variant="red" leftIcon={<DeleteIcon fontSize="large" />}>
                {selectDeleteActivities.length}
              </Button>
            )}
          </HStack>
        </HStack>
        <Table
          data={activities}
          mt={8}
          onTable={setTable}
          onChangueTable={(result) => {
            patch((state) => {
              state.selectDeleteActivities = result.selection.nodes;
            });
          }}
          rowProps={({ original }) => ({
            onClick: () => onSelectActivity(original as SafeAny),
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
        </Table>
      </Layout>
      <CreateActivityModal />
    </>
  );
};

ActivitiesPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
