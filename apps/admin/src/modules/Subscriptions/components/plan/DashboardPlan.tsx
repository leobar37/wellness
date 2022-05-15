import { HStack, VStack } from '@chakra-ui/react';
import { Badgebg, Card, DetailInfo, Plan, Price } from '@wellness/admin-ui';
import { FC } from 'react';

type DashBoardActivityProps = {
  plan: Plan;
};

export const DashBoardPlan: FC<DashBoardActivityProps> = ({ plan }) => {
  return (
    <VStack align={'self-start'} spacing={5}>
      <HStack spacing={2}>
        <Badgebg name="Vendidos" value="150" />
        <Badgebg name="Usuarios activos" value="150" />
      </HStack>
      <Card>
        <DetailInfo title="Nombre" value={plan.detail.name} />
        <DetailInfo title="Precio" value={<Price>{plan.detail.price}</Price>} />
        <DetailInfo
          title="Descripción"
          value={plan.detail.description}
          direction="vertical"
        />
        <DetailInfo
          title="Duración"
          value={`${plan.suscription.duration} dias`}
        />
      </Card>
    </VStack>
  );
};
