import { TabPanel, TabPanelProps } from '@chakra-ui/react';
import * as React from 'react';

export const TabContent: React.FunctionComponent<TabPanelProps> = ({
  children,
  ...props
}) => {
  return (
    <TabPanel mt={8} px={4} {...props}>
      {children}
    </TabPanel>
  );
};
