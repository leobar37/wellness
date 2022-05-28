import { HStack, Img, Skeleton, Text, VStack } from '@chakra-ui/react';
import {
  BadgeDisplay,
  Card,
  DetailInfo,
  Price,
  ProgressBadge,
  useConfigFormats,
} from '@wellness/admin-ui';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import es from 'date-fns/locale/es';
import { get } from 'lodash';
import { useClientsStore } from '../data/client-store';
import { useEnviroment } from '@wellness/admin-ui';
export const DashboardClient = () => {
  const { selectClient, clientReport } = useClientsStore();
  const configFormats = useConfigFormats();
  const { asistences } = useClientsStore();
  const enviroment = useEnviroment();
  if (!selectClient) {
    return <Skeleton h={'350px'} w="350px" />;
  }
  const lastAsistence = asistences.length > 0 ? asistences[0] : null;

  const planProgress = clientReport?.planProgress;

  return (
    <HStack width="100%" align="start" justify="start" spacing={'80px'}>
      <VStack spacing={3} align="start">
        <Card includeBorder={false}>
          <DetailInfo title="Nombre" value={selectClient.name} />
          <DetailInfo title="Apellidos" value={selectClient.lastName} />
          <DetailInfo title="Dni" value={selectClient.dni} />
          <DetailInfo title="Codigo" value={selectClient.code} />
          <DetailInfo title="Email" value={selectClient.email} />
          <DetailInfo title="Dirección" value={selectClient.direction} />
          <DetailInfo title="Teléfono" value={selectClient.phone} />
          <DetailInfo title="Sexo" value={selectClient.sex} />
        </Card>
        {lastAsistence && (
          <BadgeDisplay
            title={'Última asistencia'}
            value={`Hace ${formatDistance(
              new Date(lastAsistence.createdAt),
              new Date(),
              { locale: es }
            )}`}
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
          src={selectClient?.photo?.previewUrl || ''}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = enviroment.notFoundImage.profile;
          }}
          width="250px"
          borderRadius="2xl"
        />
        {planProgress && (
          <ProgressBadge
            title={planProgress.contractLabel}
            progress={planProgress.progress}
            subtitle={`${format(
              new Date(planProgress.finishedAt),
              configFormats.onlyDate
            )}  ${planProgress.progress}%`}
            value={
              <Text color={'white'}>
                <Price>{planProgress.price}</Price>
              </Text>
            }
          />
        )}
      </VStack>
    </HStack>
  );
};
