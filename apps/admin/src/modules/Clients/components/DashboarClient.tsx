import { Button, HStack, Img, VStack, Skeleton } from '@chakra-ui/react';
import {
  BadgeDisplay,
  ShowPlanProgress,
  useConfigFormats,
} from '@wellness/admin-ui';
import format from 'date-fns/format';
import { get } from 'lodash';
import { useClientsStore } from '../data/client-store';
import formatDistance from 'date-fns/formatDistance';
import es from "date-fns/locale/es";
export const DashboardClient = () => {
  const { selectClient, clientReport } = useClientsStore();
  const configFormats = useConfigFormats();
  const { asistences } = useClientsStore();
  if (!selectClient) {
    return <Skeleton h={'350px'} w="350px" />;
  }
  const lastAsistence = asistences.length > 0 ? asistences[0] : null;

  const planProgress = clientReport?.planProgress;
  return (
    <HStack width="100%" align="start" justify="start" spacing={'80px'}>
      <VStack spacing={5} align="start">
        {lastAsistence && (
          <BadgeDisplay
            title={'Última asistencia'}
            value={`Hace ${formatDistance(new Date(lastAsistence.createdAt), new Date() ,{ locale : es})}`}
          />
        )}
        <BadgeDisplay
          title={'Nacimiento'}
          value={format(
            new Date(get(selectClient, 'birth')),
            configFormats.onlyDate
          )}
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
        {planProgress && (
          <ShowPlanProgress
            name={planProgress.contractLabel}
            percent={planProgress.progress}
            price={planProgress.price}
            startPlan={planProgress.createdAt}
          />
        )}
      </VStack>
    </HStack>
  );
};
