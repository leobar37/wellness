import {
  Box,
  FormControl,
  Heading,
  HStack,
  List,
  Select,
} from '@chakra-ui/react';
import { FC } from 'react';
import { ItemAlert } from './ItemAlert';

export const AlertsWidget: FC = () => {
  return (
    <Box
      mt={14}
      p={4}
      borderColor="blackAlpha.400"
      borderWidth="1px"
      borderRadius={'15px'}
      flex={'40%'}
      maxWidth={'500px'}
    >
      <HStack justifyContent={'space-between'}>
        <Heading size="lg">Alertas:</Heading>
        <FormControl maxWidth={'200px'}>
          <Select>
            <option value="">Todos</option>
          </Select>
        </FormControl>
      </HStack>
      <List spacing={6} overflowY="scroll" maxHeight={'350px'} mt={5}>
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
        <ItemAlert />
      </List>
    </Box>
  );
};
