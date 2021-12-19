import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  SystemStyleObject,
  Text,
  GridItemProps,
} from '@chakra-ui/react';
import { useConfig, SidebarConfig } from '../../config';
import {
  MenuItem,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '../../components';
import { Left, UsersIcon } from '../../icons';
import * as React from 'react';
import { ClientOnly } from '../../lib';
import { PropsWithChildren, FunctionComponent } from 'react';
import { useRouter } from 'next/router';
const layoutGrid: SystemStyleObject = {
  height: '100vh',
  bg: 'gray.200',
  gridTemplateRows: 'repeat(3 , 1fr) 50px',
  gridTemplateColumns: '280px repeat(3 , 1fr)',
  gridTemplateAreas: `
    "sidebar content content content"
    "sidebar content content content"
    "sidebar content content content" 
    "sidebar footer footer footer"
    `,
};

const contentLayoutGrid: SystemStyleObject = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4 ,1fr)',
  gridTemplateRows: '100px minmax(600px, 1fr)',
};

type BaseLayoutProps = PropsWithChildren<{
  /**
   * layout optional Sidebar
   */
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}>;

export const Layout: FunctionComponent<
  {
    /**
     * Text of hero
     */
    backText?: string;
    /**
     * Actions to go in the header
     */
    actions?: React.ReactNode;
  } & GridItemProps
> = ({ children, actions, backText, ...boxProps }) => {
  const showHeader = backText || actions;
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <ClientOnly>
      <GridItem
        display="flex"
        justifyContent="center"
        alignItems="center"
        gridArea="content"
        {...boxProps}
      >
        <Box
          overflowY="scroll"
          overflowX="hidden"
          width="90%"
          bg="white"
          height="90%"
          borderRadius="10px"
          sx={contentLayoutGrid}
        >
          {showHeader && (
            <HStack
              gridRow="1"
              gridColumn="1 / 5"
              justify="space-between"
              px={10}
              pt={5}
              align="center"
            >
              <HStack spacing={5}>
                <Button
                  onClick={() => onBack()}
                  width="45px"
                  height="45px"
                  bg="brown.500"
                >
                  <Box fontSize="18px">
                    <Left color="white" fontSize="xl" />
                  </Box>
                </Button>
                <Heading size="lg">{backText}</Heading>
              </HStack>
              {/* Actions */}
              {actions && <HStack pr="20px">{actions}</HStack>}
            </HStack>
          )}
          <Box
            gridColumn="1 / 5"
            gridRow={`${showHeader ? '2 / 4' : '1 /4'}  `}
            my={2}
            p={4}
            overflowY="scroll"
          >
            {children}
          </Box>
        </Box>
      </GridItem>
    </ClientOnly>
  );
};

const BaseLayout: React.FunctionComponent<BaseLayoutProps> = ({
  sidebar,
  footer,
  children,
  header,
}) => {
  return (
    <Grid sx={layoutGrid}>
      <GridItem gridArea="sidebar">{sidebar}</GridItem>
      {/* Content */}
      {children}
      <GridItem
        gridArea="footer"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {footer}
      </GridItem>
    </Grid>
  );
};

const DefaulSidebar = () => {
  const sidebar = useConfig<SidebarConfig>('sidebar');

  const renderItems = () => {
    return sidebar.items.map((item) => {
      return (
        <MenuItem path={item.path} icon={item.icon} subItems={item.subItems}>
          {item.name}
        </MenuItem>
      );
    });
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarMenu>{renderItems()}</SidebarMenu>
      <SidebarFooter />
    </Sidebar>
  );
};

BaseLayout.defaultProps = {
  sidebar: <DefaulSidebar />,
  footer: <Text>Developed by @vide</Text>,
};

export { BaseLayout };
