import { Box, SystemStyleObject, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { matVa } from '../../utils';
import { ChildrenOrText, TextOrChild } from '../../components/children';
import { SafeAny } from '@wellness/common';
export type DetailProps = {
  /* Title */
  title: TextOrChild;
  value: TextOrChild;
  direction?: 'horizontal' | 'vertical';
};

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

  const isEmpty = (val: SafeAny) => !!val && val.length === 0;

  return (
    <Box fontSize="sm" sx={stylesDetail}>
      <Text as="b" fontWeight="bold">
        {title}:
      </Text>
      <ChildrenOrText
        onText={(text) =>
          !isEmpty(text) ? (
            <Text as="p" sx={{ ...stylesSubtitle }}>
              {text}
            </Text>
          ) : null
        }
      >
        {isEmpty(value) ? null : value}
      </ChildrenOrText>
    </Box>
  );
};
