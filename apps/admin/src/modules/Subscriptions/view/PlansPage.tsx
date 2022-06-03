import * as React from 'react';
import { useState } from 'react';
import { BaseLayout, Layout } from '@wellness/admin-ui/components';
import type { NextPageWithLayout } from '@wellness/admin-ui/common';
import { Button, HStack, Badge, SystemStyleObject } from '@chakra-ui/react';
import { ButtonIcon } from '@wellness/admin-ui';
import { useInitPlansController } from '../controller';
import { usePlanModal } from '../data';
import { CrudPlanModal } from '../components/plan';
import {
  Badgebg,
  ColTable,
  Table,
  GlobalFilter,
  prepareCellProps,
  Price,
  TableInstanceProps,
  Plan,
} from '@wellness/admin-ui';
import { useRouter } from 'next/router';
import { SafeAny } from '@wellness/common';
import { EyeIcon } from '@wellness/admin-ui/icons';

export const PlansPage: NextPageWithLayout = () => {
  const { plans, isloading } = useInitPlansController();
  const { openModal } = usePlanModal();
  const [table, setTable] = useState<TableInstanceProps | null>();
  const router = useRouter();
  const onSelectPlan = (plan: Plan) => {
    router.push(`./plans/${plan.id}`);
  };

  return (
    <Layout
      backText="Planes"
      actions={<Button onClick={() => openModal()}>Crear</Button>}
    >
      <HStack>
        <Badgebg name="Total de Planes" value={plans.length} />
      </HStack>
      <HStack justify="space-between" mt={10}>
        {table && <GlobalFilter table={table} />}
        <HStack></HStack>
      </HStack>
      <Table
        data={plans}
        mt={8}
        isSelecteable={false}
        onTable={setTable}
        isLoading={isloading}
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
        <ColTable
          accessor="suscription.active"
          Header="Activo"
          Cell={(props: SafeAny) => {
            const { original } = prepareCellProps<Plan>(props);
            const styles: Record<0 | 1, SystemStyleObject> = {
              '1': {
                bg: 'primary',
              },
              '0': {
                bg: 'brown.300',
                color: 'white',
              },
            };
            const isActive = original.suscription.active;
            return (
              <Badge sx={styles[Number(original.suscription.active)]}>
                {isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            );
          }}
        />
        <ColTable
          accessor="detail.price"
          Header="Precio"
          Cell={(props: SafeAny) => {
            const { original } = prepareCellProps<Plan>(props);
            return <Price>{original.detail.price}</Price>;
          }}
        />
        <ColTable
          id="actions"
          Header="Actions"
          Cell={(props: SafeAny) => {
            const { original } = prepareCellProps<Plan>(props);
            return (
              <HStack>
                <ButtonIcon
                  bg={'brown'}
                  onClick={() => {
                    onSelectPlan(original);
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
  );
};

PlansPage.getLayout = (page) => (
  <BaseLayout>
    {page}
    <CrudPlanModal />
  </BaseLayout>
);
