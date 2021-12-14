import { Box, SystemStyleObject, Text } from '@chakra-ui/react';
import { matVa } from '../../utils';
export type DetailProps = {
  title: string;
  value: string;
  direction?: 'horizontal' | 'vertical';
};
export const Detail = ({
  title,
  value,
  direction = 'horizontal',
}: DetailProps) => {
  const stylesDetail: SystemStyleObject = matVa<
    SystemStyleObject,
    Exclude<DetailProps['direction'], undefined>
  >(direction)({
    vertical: {
      flexDirection: 'column',
      alignItems: 'start',
      margin: '0',
    },
    horizontal: {
      display: 'flex',
      ' > *': {
        marginRight: '10px',
      },
    },
  });
  return (
    <Box fontSize="sm" sx={stylesDetail}>
      <Text fontWeight="bold">{title}:</Text>
      <Text>{value}</Text>
    </Box>
  );
};
