import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode, FunctionComponent } from 'react';
import { config } from './internal';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useAccordion,
} from '@chakra-ui/react';
// eslint-disable-next-line @typescript-eslint/ban-types
type SidebarMenuProps = {};
export const SidebarMenu = ({
  children,
}: PropsWithChildren<SidebarMenuProps>) => {
  return (
    <Accordion allowToggle>
      <VStack marginLeft="10px" my={'50px'} spacing={5}>
        {children}
      </VStack>
    </Accordion>
  );
};

export type SubItemProps = PropsWithChildren<{
  active?: boolean;
}>;
export const SubItem: FunctionComponent<SubItemProps> = ({
  children,
  active,
}) => {
  return (
    <Text
      fontSize="small"
      p={1.5}
      borderRadius="3px"
      _hover={{
        background: 'whiteAlpha.500',
        cursor: 'pointer',
      }}
      as="a"
    >
      {children}
    </Text>
  );
};

SubItem.defaultProps = {
  active: false,
};

export type MenuItemProps = {
  icon: ReactNode;
  children: string;
};

export const MenuItem = ({ icon, children }: MenuItemProps) => {
  const hasIcon = icon !== null;

  return (
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <>
          <AccordionButton>
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
          </AccordionButton>
          <AccordionPanel>
            <VStack
              borderLeft="2px solid white"
              color="white"
              align="start"
              pl="4"
              ml="8"
            >
              <SubItem>Administradores</SubItem>
              <SubItem>Clases</SubItem>
            </VStack>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
