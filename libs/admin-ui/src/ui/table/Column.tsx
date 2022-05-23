import { SafeAny } from '@wellness/common';
import { FC } from 'react';
import { Column, Renderer, UseFiltersColumnOptions } from 'react-table';
import { SystemStyleObject } from '@chakra-ui/react';
export type ColTableProps = Omit<Column, 'Cell'> &
  UseFiltersColumnOptions<SafeAny> & {
    cellStyles?: SystemStyleObject;
  } & { Cell?: (props: SafeAny) => SafeAny };

/**
 * This is a syntatic sugar for 'columns' prop
 */
export const ColTable: FC<ColTableProps> = (props) => {
  return null;
};
