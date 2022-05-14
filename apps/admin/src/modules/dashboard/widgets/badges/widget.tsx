import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { Badgebg } from '@wellness/admin-ui';

export const BadgesWidget: FC = () => {
  return (
    <HStack>
      <Badgebg name="Nro de clientes" value={150} />
      <Badgebg name="Nro de Planes" value={150} />
      <Badgebg name="Nro de Actividades" value={150} />
    </HStack>
  );
};
