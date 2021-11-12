import { Avatar, Box, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { config } from './internal';
export const SidebarFooter = () => {
  return (
    <Box position="absolute" bottom="10px" left="0">
      {/* Footer */}
      <Wrap spacing="4" width={config.width} py={3} bg="blackAlpha.700">
        <WrapItem>
          <Avatar
            name="Segun Adebayo"
            size="sm"
            src="https://bit.ly/sage-adebayo"
          />
        </WrapItem>
        <WrapItem color="white">
          <VStack spacing={0} align="start">
            <Text fontSize="sm">Alberto Huaman</Text>
            <Text fontSize="sm" color="whiteAlpha.600">
              albertohuaman@gmail.com
            </Text>
          </VStack>
        </WrapItem>
      </Wrap>
    </Box>
  );
};
