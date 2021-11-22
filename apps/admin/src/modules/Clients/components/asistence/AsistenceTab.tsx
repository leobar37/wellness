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
import { DeleteIcon } from '@wellness/admin-ui/icons';
import { Badgebg, ButtonIcon } from '@wellness/admin-ui/ui';
import { CreateAsistence } from '../asistence/CreateAsistence';
import { useClientsStore } from '../../data/client-store';
const { toggleClientAsistenceModal } = useClientsStore.getState();
export const AsistenceTab = () => {
  const [blackAlpha300] = useToken('colors', ['blackAlpha.300']);
  return (
    <>
      <HStack justify="space-between">
        <HStack>
          <Badgebg name="Total de asistencias" value={50} />
          <Badgebg name="Ultima semana" value={30} />
        </HStack>
        <Button onClick={() => toggleClientAsistenceModal(true)}>Nuevo</Button>
      </HStack>
      <Flex width="100%" justify="center" mt={'35px'}>
        <List spacing={5} width="750px">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <ListItem
                key={index}
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
                    10/20/10 10:10 AM
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </VStack>
                <ButtonIcon variant="red">
                  <DeleteIcon />
                </ButtonIcon>
              </ListItem>
            ))}
        </List>
        <CreateAsistence />
      </Flex>
    </>
  );
};
