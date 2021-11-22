import { Box, BoxProps, chakra } from '@chakra-ui/react';
import * as React from 'react';
import { SafeAny } from '@wellness/common';

export const Wrapper = (Component: React.ComponentType<SafeAny>) =>
  (({ containerPrps, ...props }) => {
    const ChackraComponent = chakra(Component);
    return <Box {...containerPrps}>{<ChackraComponent {...props} />}</Box>;
  }) as React.FC<BoxProps & { containerPrps?: BoxProps }>;
