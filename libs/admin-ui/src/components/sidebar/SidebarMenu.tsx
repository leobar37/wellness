import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { warn } from '@chakra-ui/utils';
import {
  PropsWithChildren,
  ReactNode,
  FunctionComponent,
  useMemo,
} from 'react';
import { config } from './internal';
import NextLink from 'next/link';
import { isValid } from '@wellness/common';
import { Item } from './internal';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
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
  href: string;
}>;
export const SubItem: FunctionComponent<SubItemProps> = ({
  children,
  active,
  href,
}) => {
  return (
    <NextLink passHref href={href}>
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
    </NextLink>
  );
};

SubItem.defaultProps = {
  active: false,
};

export type MenuItemProps = {
  icon: ReactNode;
  children: string;
  subItems?: Item[];
  path?: string;
};

export const MenuItem = ({ icon, children, subItems, path }: MenuItemProps) => {
  const hasIcon = icon !== null;

  warn({
    condition: isValid(path) && isValid(subItems),
    message: 'When using path, subItems is ignored',
  });
  console.log('Hello sub items');
  console.log(subItems);

  const mapSubItems = useMemo(() => {
    if (!subItems) {
      return null;
    }
    return (
      <AccordionPanel>
        <VStack
          borderLeft="2px solid white"
          color="white"
          align="start"
          pl="4"
          ml="8"
        >
          {subItems.map((subItem) => {
            return <SubItem href={subItem.path}>{subItem.name}</SubItem>;
          })}
        </VStack>
      </AccordionPanel>
    );
  }, [subItems]);

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
          {mapSubItems}
        </>
      )}
    </AccordionItem>
  );
};
