import { Text, useToken, VStack } from '@chakra-ui/react';
import { TextOrChild, ChildrenOrText } from '../../components/children';
type BadgeDisplayProps = {
  title: string;
  value: TextOrChild;
};

export const BadgeDisplay = ({ title, value }: BadgeDisplayProps) => {
  const [blackAlpha300] = useToken('colors', ['blackAlpha.300']);
  return (
    <VStack
      align="start"
      justify="center"
      width="250px"
      height="80px"
      pl="4"
      borderRadius="sm"
      border={`1.5px solid ${blackAlpha300}`}
    >
      <Text fontWeight="bold">{title}</Text>
      <ChildrenOrText
        onText={(text) => (
          <Text fontSize="sm" color="blackAlpha.600">
            {text}
          </Text>
        )}
      >
        {value}
      </ChildrenOrText>
    </VStack>
  );
};
