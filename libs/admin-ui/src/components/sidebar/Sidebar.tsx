import {
  Avatar,
  Box,
  Center,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Logo } from '@wellness/admin-ui/components';
import { Left, Search } from '@wellness/admin-ui/icons';
import { PropsWithChildren, ReactNode } from 'react';
import { config } from './internal';

export const SidebarHeader = () => {
  return (
    <VStack spacing="6">
      <HStack width="100%" justify="space-between">
        <Logo />
        <Center
          as="button"
          width="30px"
          height="30px"
          borderRadius="3px"
          bg="whiteAlpha.600"
        >
          <Left color="white" />
        </Center>
      </HStack>
      <VStack>
        {/* search componente */}
        <InputGroup bg="white" size="md" borderRadius="5px">
          <InputLeftElement>
            <Search fontSize="20px" />
          </InputLeftElement>
          <Input type="text" placeholder="Buscar" />
        </InputGroup>
      </VStack>
      <Divider></Divider>
    </VStack>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
  return (
    // wrapper
    <Box position="fixed" left="0" top="0">
      {/* content */}
      <Box
        overflow="hidden"
        bg={'brown.300'}
        position="relative"
        padding="20px 20px"
        width={`${config.width}px`}
        border="2px solid black"
        height="100vh"
      >
        {children}
      </Box>
    </Box>
  );
};
