import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Time } from '../time';
import { Price } from '../../ui';
export type ShowPlanProgressProps = {
  startPlan: Date;
  price: number;
  percent: number;
  name: string;
};
export const ShowPlanProgress: FC<ShowPlanProgressProps> = ({
  startPlan,
  price,
  percent,
  name,
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
          <Text
            fontWeight="semibold"
            sx={{
              maxWidth: '200px',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Text>
          <Text fontSize="small">
            <Time>{startPlan}</Time>
          </Text>
        </Box>
        <Text color="white">
          <Price>{price}</Price>
        </Text>
      </Box>
      <Box
        zIndex={20}
        position="absolute"
        height="100%"
        left="0"
        width={`${percent}%`}
        top="0"
        bg="brown.500"
        borderRadius="10px"
      />
    </Box>
  );
};
