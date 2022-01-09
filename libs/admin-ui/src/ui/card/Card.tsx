import {
  BoxProps,
  SystemStyleObject,
  useToken,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
export type CardProps = {
  includeBorder?: boolean;
} & BoxProps;

export const Card: FC<CardProps> = ({ children, includeBorder }) => {
  const [blackAlpha300] = useToken('colors', ['blackAlpha.300']);

  const borderStyles = includeBorder
    ? ({ border: `1.5px solid ${blackAlpha300}` } as SystemStyleObject)
    : {};

  return (
    <VStack
      align="start"
      border="gray"
      sx={{ ...borderStyles }}
      width={'300px'}
      py={3}
      px={3}
    >
      {children}
    </VStack>
  );
};

Card.defaultProps = {
  includeBorder: true,
};
