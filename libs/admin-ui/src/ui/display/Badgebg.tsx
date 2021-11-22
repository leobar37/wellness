import { Text, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

export type BadgeBgProps = {
  name?: string;
  value?: string | number;
};
export const Badgebg: FunctionComponent<BadgeBgProps> = ({ name, value }) => {
  return (
    <VStack
      width="150px"
      bg="#524C4C"
      height="60px"
      borderRadius="10px"
      color="white"
      spacing={0}
      pl="3"
      align="start"
      justify="center"
    >
      <Text fontSize="small">{name}</Text>
      <Text>{value}</Text>
    </VStack>
  );
};
