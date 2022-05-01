import { Box, SystemStyleObject, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { matVa } from '../../utils';
import { ChildrenOrText, TextOrChild } from '../../components/children';
export type DetailProps = {
  /* Title */
  title: TextOrChild;
  value: TextOrChild;
  direction?: 'horizontal' | 'vertical';
};
/**
 *
 *
 */
export const DetailInfo = ({
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
  const stylesSubtitle: SystemStyleObject = matVa<
    SystemStyleObject,
    Exclude<DetailProps['direction'], undefined>
  >(direction)({
    vertical: {
      pt: '8px',
    },
    horizontal: {},
  });

  return (
    <Box fontSize="sm" sx={stylesDetail}>
      <Text as="b" fontWeight="bold">
        {title}:
      </Text>
      <ChildrenOrText
        onText={(text) => (
          <Text as="p" sx={{ ...stylesSubtitle }}>
            {text}
          </Text>
        )}
      >
        {value}
      </ChildrenOrText>
    </Box>
  );
};
