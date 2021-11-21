import { SafeAny } from '@wellness/common';
import { FunctionComponent } from 'react';
import { Column, UseFiltersColumnOptions } from 'react-table';
import { SystemStyleObject } from '@chakra-ui/react';
export type ColTableProps = Column &
  UseFiltersColumnOptions<SafeAny> & { cellStyles?: SystemStyleObject };

/**
 * This is a syntatic sugar for 'columns' prop
 */
export const ColTable: FunctionComponent<ColTableProps> = (props) => {
  return null;
};
