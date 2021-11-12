import * as React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
  MenuItem,
} from '@wellness/admin-ui/components';
import { UsersIcon } from '@wellness/admin-ui/icons';
function Index() {
  return (
    <React.Fragment>
      <Sidebar>
        <SidebarHeader />
        <SidebarMenu>
          <MenuItem icon={<UsersIcon fontSize="xl" />}>Clientes</MenuItem>
        </SidebarMenu>
        <SidebarFooter />
      </Sidebar>
    </React.Fragment>
  );
}

export default Index;
