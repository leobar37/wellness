import { Button, Center, Text } from '@chakra-ui/react';
import * as React from 'react';
import { useClientsStore } from '../../data/client-store';

const { patch } = useClientsStore.getState();

const NonFichaPreview = () => {
  return (
    <Center flexDirection="column" m="10" width="100%">
      <Text>Este usuario no tiene una ficha activa</Text>
      <Button
        my="4"
        onClick={() =>
          patch({
            modeModalFicha: 'open',
            modalCrudFicha: true,
          })
        }
      >
        Agregar
      </Button>
    </Center>
  );
};

export default NonFichaPreview;
