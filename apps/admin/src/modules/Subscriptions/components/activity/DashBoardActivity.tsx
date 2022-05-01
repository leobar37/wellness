import { HStack, VStack } from '@chakra-ui/react';
import {
  Activity,
  BadgeDisplay,
  Card,
  DetailInfo,
  Price,
} from '@wellness/admin-ui';
import { FC } from 'react';

type DashBoardActivityProps = {
  activity: Activity;
};

export const DashBoardActivity: FC<DashBoardActivityProps> = ({ activity }) => {
  return (
    <HStack spacing={'250px'} align={'self-start'}>
      <VStack spacing={10}>
        <BadgeDisplay title="Vendidos" value="150" />
        <BadgeDisplay title="Usuarios activos" value="150" />
      </VStack>
      <Card>
        <DetailInfo title="Nombre:" value={activity.detail.name} />
        <DetailInfo title="Precio" value={<Price>50</Price>} />
        <DetailInfo
          title="Descripción"
          value={activity.detail.description}
          direction="vertical"
        />
        <DetailInfo title="Duración" value="20 dias" />
      </Card>
    </HStack>
  );
};
