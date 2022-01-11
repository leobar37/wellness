import type { NextPageWithLayout, Activity } from '@wellness/admin-ui/common';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import { TableInstanceProps, ButtonIcon } from '@wellness/admin-ui/ui';
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
import { DeleteIcon, EyeIcon, EditIcon } from '@wellness/admin-ui/icons';
import { useModalConfirm } from '@wellness/admin-ui/ui';
import { useActivityModal } from '../data';
export const ActivitiesPage: NextPageWithLayout = () => {
  const { activities, isLoading } = useInitActivitiesController();
  const confirm = useModalConfirm();
  const { openModal } = useActivityModal();
  const { patch, selectDeleteActivities } = useSubscriptionsStore();
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

  const onDeleteActivities = () => {
    confirm({});
  };
  return (
    <>
      <Layout
        backText="Actividades"
        actions={<Button onClick={() => openModal(true)}>Crear</Button>}
      >
        <HStack>
          <Badgebg name="Total de actividades" value={activities.length} />
        </HStack>
        <HStack justify="space-between" mt={10}>
          {table && <GlobalFilter table={table} />}
          <HStack>
            {showDeleteIcon && (
              <Button
                variant="red"
                leftIcon={<DeleteIcon fontSize="large" />}
                onClick={() => onDeleteActivities()}
              >
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
