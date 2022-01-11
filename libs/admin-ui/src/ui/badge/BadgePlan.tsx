import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ChildrenOrText, TextOrChild } from '../../components/children';
type ProgressBadgeProps = {
  title: string;
  subtitle: TextOrChild;
  value: TextOrChild;
  progress: number;
};
export const ProgressBadge: FC<ProgressBadgeProps> = ({
  title,
  subtitle,
  value,
  progress,
}) => {
  return (
    <Box
      width="280px"
      height="80px"
      borderRadius="10px"
      position="relative"
      zIndex={19}
      bg="#524C4C"
    >
      <Box
        px={4}
        position="absolute"
        height="100%"
        left="0"
        width="100%"
        top="0"
        borderRadius="10px"
        display="flex"
        zIndex={21}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box color="white">
          <Text fontWeight="semibold">{title}</Text>
          <ChildrenOrText onText={(val) => <Text fontSize="small">{val}</Text>}>
            {subtitle}
          </ChildrenOrText>
        </Box>
        <ChildrenOrText onText={(val) => <Text color="white">{val}</Text>}>
          {value}
        </ChildrenOrText>
      </Box>
      <Box
        zIndex={20}
        position="absolute"
        height="100%"
        left="0"
        width={`${progress}%`}
        top="0"
        bg="brown.500"
        borderRadius="10px"
      ></Box>
    </Box>
  );
};
