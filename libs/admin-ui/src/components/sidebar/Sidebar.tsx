import {
  Avatar,
  Box,
  Center,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import { Logo } from '../../components';
import { Left, Search } from '../../icons';

import { PropsWithChildren, ReactNode, FunctionComponent } from 'react';
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
type SidebarProps = PropsWithChildren<{
  open?: boolean;
  onClose?: () => void;
}>;

export const Sidebar: FunctionComponent<SidebarProps> = ({ children }) => {
  return (
    // wrapper
    <Box>
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

Sidebar.defaultProps = {
  open: false,
};
