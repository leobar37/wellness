import * as React from 'react';
import { BaseLayout } from '@wellness/admin-ui/components';
import { ModalCrud } from '@wellness/admin-ui/components/modal';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

function Index() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <BaseLayout
      actions={<Button onClick={onOpen}>crear</Button>}
      backText="Clientes"
    >
      <ModalCrud isOpen={isOpen} onClose={onClose} textHeader="Clientes">
        <FormControl>
          <FormLabel>Nombre completo</FormLabel>
          <Input placeholder="Nombre" />
        </FormControl>
      </ModalCrud>
    </BaseLayout>
  );
}

export default Index;
