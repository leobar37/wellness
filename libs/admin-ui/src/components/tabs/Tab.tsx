import { SystemStyleObject, Tab, TabProps } from '@chakra-ui/react';
import * as React from 'react';

const tabStyles = {
  borderRadius: 'xl',
  mx: '3',
  _hover: {
    bg: 'gray.100',
  } as SystemStyleObject,
  _selected: {
    bg: 'brown.300',
    color: 'white',
  } as SystemStyleObject,
  _active: {
    bg: 'brown.300',
    color: 'white',
  } as SystemStyleObject,
};

export const TabWellness: React.FunctionComponent<TabProps> = ({
  children,
  ...props
}) => {
  return (
    <Tab {...tabStyles} {...props}>
      {children}
    </Tab>
  );
};
