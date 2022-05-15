import { HStack, VStack } from '@chakra-ui/react';
import {
  Activity,
  BadgeDisplay,
  Card,
  DetailInfo,
  Price,
  Badgebg,
} from '@wellness/admin-ui';
import { FC } from 'react';

type DashBoardActivityProps = {
  activity: Activity;
};

export const DashBoardActivity: FC<DashBoardActivityProps> = ({ activity }) => {
  return (
    <VStack spacing={4} align={'self-start'}>
      <HStack spacing={2}>
        <Badgebg name="Vendidos" value="150" />
        <Badgebg name="Usuarios activos" value="150" />
      </HStack>
      <Card>
        <DetailInfo title="Nombre" value={activity.detail.name} />
        <DetailInfo title="Precio" value={<Price>50</Price>} />
        <DetailInfo
          title="Descripción"
          value={activity.detail.description}
          direction="vertical"
        />
        <DetailInfo title="Duración" value="20 dias" />
      </Card>
    </VStack>
  );
};
