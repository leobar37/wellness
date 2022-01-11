import { HStack, VStack } from '@chakra-ui/react';
import { Plan, BadgeDisplay, Card, Detail, Price } from '@wellness/admin-ui';
import { FC } from 'react';

type DashBoardActivityProps = {
  plan: Plan;
};

export const DashBoardPlan: FC<DashBoardActivityProps> = ({ plan }) => {
  return (
    <HStack spacing={'250px'} align={'self-start'}>
      <VStack spacing={10}>
        <BadgeDisplay title="Vendidos" value="150" />
        <BadgeDisplay title="Usuarios activos" value="150" />
      </VStack>
      <Card>
        <Detail title="Nombre:" value={plan.detail.name} />
        <Detail title="Precio" value={<Price>{plan.detail.price}</Price>} />
        <Detail
          title="Descripción"
          value={plan.detail.description}
          direction="vertical"
        />
        <Detail title="Duración" value={`${plan.suscription.duration} dias`} />
      </Card>
    </HStack>
  );
};
