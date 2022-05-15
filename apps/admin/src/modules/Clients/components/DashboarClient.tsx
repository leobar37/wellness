import { Button, HStack, Img, VStack, Skeleton } from '@chakra-ui/react';
import {
  BadgeDisplay,
  ShowPlanProgress,
  useConfigFormats,
} from '@wellness/admin-ui';
import format from 'date-fns/format';
import { get } from 'lodash';
import { useClientsStore } from '../data/client-store';

export const DashboardClient = () => {
  const { selectClient } = useClientsStore();
  const configFormats = useConfigFormats();
  if (!selectClient) {
    return <Skeleton h={'350px'} w="350px" />;
  }
  return (
    <HStack width="100%" align="start" justify="start" spacing={'80px'}>
      <VStack spacing={5} align="start">
        <BadgeDisplay title={'Última asistencia'} value={'Hace 2 dias'} />
        <BadgeDisplay
          title={'Nacimiento'}
          value={format(new Date(get(selectClient, 'birth')), 'dd/MM/yyyy')}
        />
        <BadgeDisplay
          title={'Fecha de registro'}
          value={`${format(
            new Date(get(selectClient, 'createdAt')),
            configFormats.onlyDate
          )}`}
        />
      </VStack>
      <VStack>
        <Img
          src={selectClient.photo.previewUrl}
          width="250px"
          borderRadius="2xl"
        />
        <ShowPlanProgress percent={50} price={150} startPlan={new Date()} />
      </VStack>
    </HStack>
  );
};
