import { HStack, VStack } from '@chakra-ui/react';
import { Activity, Badgebg, Card, DetailInfo, Price } from '@wellness/admin-ui';
import { FC } from 'react';

type DashBoardActivityProps = {
  activity: Activity;
};

export const DashBoardActivity: FC<DashBoardActivityProps> = ({ activity }) => {
  return (
    <VStack spacing={4} align={'self-start'}>
      <Card>
        <DetailInfo title="Nombre" value={activity.detail.name} />
        <DetailInfo
          title="Precio"
          value={<Price>{activity.detail.price}</Price>}
        />
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
