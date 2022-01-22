import { Box, Center, VStack } from '@chakra-ui/react';
import { Logo } from '@wellness/admin-ui';
import { FC } from 'react';

export const Authlayout: FC = ({ children }) => {
  return (
    <Center bg="brown.300" w={'100vw'} h={'100vh'}>
      <VStack w={'510px'} justifyContent={'center'} spacing={4}>
        <Logo variant="normal" size="sm" />
        <Box
          bg={'white'}
          w="full"
          maxW={'510px'}
          borderRadius={'20px'}
          px={5}
          py={10}
        >
          {children}
        </Box>
      </VStack>
    </Center>
  );
};
