import {
  Box,
  Button,
  Grid,
  GridItem,
  GridItemProps,
  Heading,
  HStack,
  SystemStyleObject,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FunctionComponent, PropsWithChildren } from 'react';
import { ShowByRol } from '../../auth';
import { WithAuth } from '../../auth';
import {
  MenuItem,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '../../components';
import { SidebarConfig, useConfig } from '../../config';
import { Left } from '../../icons';
import { ClientOnly } from '../../lib';

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
        height="95%"
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
  );
};

const _BaseLayout: React.FunctionComponent<BaseLayoutProps> = ({
  sidebar,
  footer,
  children,
  header,
}) => {
  return (
    <ClientOnly>
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
    </ClientOnly>
  );
};

const DefaulSidebar = () => {
  const sidebar = useConfig<SidebarConfig>('sidebar');

  const items = React.useMemo(() => {
    return sidebar.items.map((item, idx) => {
      return (
        <ShowByRol key={String(idx)} roles={item.rol}>
          <MenuItem path={item.path} icon={item.icon} subItems={item.subItems}>
            {item.name}
          </MenuItem>
        </ShowByRol>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarMenu>{items}</SidebarMenu>
      <SidebarFooter />
    </Sidebar>
  );
};

_BaseLayout.defaultProps = {
  sidebar: <DefaulSidebar />,
  footer: <Text>Developed by @vide</Text>,
};

export const BaseLayout = WithAuth(_BaseLayout, {
  refirect: '/auth/login',
});
