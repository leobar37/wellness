import {
    Badge, Heading,
    HStack, ListItem, Text, VStack
} from '@chakra-ui/react';

export const ItemAlert = () => {
  return (
    <ListItem>
      <HStack justify={'space-between'} width="full">
        <VStack alignItems={'flex-start'} textAlign="start">
          <Heading as="h4" size={'sm'}>
            Mariela Guitierrez
          </Heading>
          <Text textColor={'#524C4C'}>987654321</Text>
        </VStack>
        <VStack alignItems={'flex-end'}>
          <Badge bg="brown.300" textColor={'white'} rounded="md" py="1" px="3">
            Plan
          </Badge>
          <Text fontSize={'medium'} color={'gray.400'}>
            Su plan vence en 3 días
          </Text>
        </VStack>
      </HStack>
    </ListItem>
  );
};
