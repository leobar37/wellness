import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { config } from './internal';

// eslint-disable-next-line @typescript-eslint/ban-types
type SidebarMenuProps = {};
export const SidebarMenu = ({
  children,
}: PropsWithChildren<SidebarMenuProps>) => {
  return (
    <VStack marginLeft="10px" my={'50px'} spacing={5}>
      {children}
    </VStack>
  );
};

export type MenuItemProps = {
  icon: ReactNode;
  children: string;
};

export const MenuItem = ({ icon, children }: MenuItemProps) => {
  const hasIcon = icon !== null;
  return (
    <HStack
      spacing="4"
      as="button"
      color="white"
      borderRadius="8px"
      padding="10px 15px"
      _hover={{
        bg: 'whiteAlpha.300',
      }}
      justify={!hasIcon ? 'center' : 'start'}
      width={`${config.width - 30}px`}
    >
      {hasIcon && <Box>{icon}</Box>}
      <Text fontSize="md">{children}</Text>
    </HStack>
  );
};
