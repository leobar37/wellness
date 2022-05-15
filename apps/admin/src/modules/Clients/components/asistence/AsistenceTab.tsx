import {
  Button,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react';
import { Time, useModalConfirm } from '@wellness/admin-ui';
import { Asistence } from '@wellness/admin-ui/common';
import { DeleteIcon } from '@wellness/admin-ui/icons';
import { Badgebg, ButtonIcon } from '@wellness/admin-ui/ui';
import { SafeAny } from '@wellness/common';
import { useAsistenceController } from '../../controller';
import { useClientsStore } from '../../data/client-store';
import { CreateAsistence } from '../asistence/CreateAsistence';
const { toggleClientAsistenceModal } = useClientsStore.getState();

type AsistenceItemProps = {
  asistence: Asistence;
  onDelete: (asistence: Asistence) => void;
};
const AsistenceItem = ({ asistence, onDelete }: AsistenceItemProps) => {
  const [blackAlpha300] = useToken('colors', ['blackAlpha.300']);
  const onComfirm = useModalConfirm();

  return (
    <ListItem
      justifyContent="space-between"
      px={5}
      alignItems="center"
      display="flex"
      width="100%"
      height="90px"
      border={`2px solid ${blackAlpha300}`}
      borderRadius="2px"
    >
      <VStack align="start">
        <Text fontSize="sm" color="blackAlpha.600">
          <Time>{asistence.createdAt}</Time>
        </Text>
        <Text>{asistence.note}</Text>
      </VStack>
      <ButtonIcon
        variant="red"
        onClick={() => {
          onComfirm({
            onConfirm: () => {
              onDelete(asistence);
              toggleClientAsistenceModal(false);
            },
          });
        }}
      >
        <DeleteIcon />
      </ButtonIcon>
    </ListItem>
  );
};

export const AsistenceTab = () => {
  const [blackAlpha300] = useToken('colors', ['blackAlpha.300']);
  const { selectClient } = useClientsStore();

  const { createAsistence, deleteAsistence } = useAsistenceController({
    clientId: selectClient?.id,
  });

  const { asistences } = useClientsStore();

  return (
    <>
      <HStack justify="space-between">
        <HStack>
          <Badgebg name="Total de asistencias" value={asistences.length} />
          {/* <Badgebg name="Ultima semana" value={30} /> */}
        </HStack>
        <Button onClick={() => toggleClientAsistenceModal(true)}>Nuevo</Button>
      </HStack>
      <Flex width="100%" justify="center" mt={'35px'}>
        <List spacing={5} width="750px">
          {asistences.map((asistence, index) => (
            <AsistenceItem
              onDelete={deleteAsistence}
              asistence={asistence as SafeAny}
              key={index}
            />
          ))}
        </List>
        <CreateAsistence />
      </Flex>
    </>
  );
};
