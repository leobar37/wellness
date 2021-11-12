import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  SystemStyleObject,
  Text,
} from '@chakra-ui/react';
import {
  MenuItem,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@wellness/admin-ui/components';
import { Left, UsersIcon } from '@wellness/admin-ui/icons';
import * as React from 'react';
import { PropsWithChildren } from 'react';

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
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
}>;

const BaseLayout: React.FunctionComponent<BaseLayoutProps> = ({
  sidebar,
  footer,
  children,
}) => {
  return (
    <Grid sx={layoutGrid}>
      <GridItem gridArea="sidebar">{sidebar}</GridItem>
      {/* Content */}
      <GridItem
        display="flex"
        justifyContent="center"
        alignItems="center"
        gridArea="content"
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
          {/* Header of the layout */}
          <HStack
            gridRow="1"
            gridColumn="1 / 5"
            justify="space-between"
            px={10}
            pt={5}
            align="center"
          >
            <HStack spacing={5}>
              <Button width="45px" height="45px" bg="brown.500">
                <Box fontSize="18px">
                  <Left color="white" fontSize="xl" />
                </Box>
              </Button>
              <Heading size="lg">Administradores</Heading>
            </HStack>
            <HStack pr="20px">
              <Button>Nuevo</Button>
            </HStack>
          </HStack>
          <Box gridColumn="1 / 5" gridRow="1 / 4">
            {children}
          </Box>
        </Box>
      </GridItem>
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

BaseLayout.defaultProps = {
  sidebar: (
    <Sidebar>
      <SidebarHeader />
      <SidebarMenu>
        <MenuItem icon={<UsersIcon fontSize="xl" />}>Clientes</MenuItem>
      </SidebarMenu>
      <SidebarFooter />
    </Sidebar>
  ),
  footer: <Text>Developed by @vide</Text>,
};

export { BaseLayout };
