import { SafeAny } from '@wellness/common';
import { FunctionComponent } from 'react';
import { Column, UseFiltersColumnOptions } from 'react-table';

type ColTableProps = Column & UseFiltersColumnOptions<SafeAny>;

/**
 * This is a syntatic sugar for 'columns' prop
 */
export const ColTable: FunctionComponent<ColTableProps> = (props) => {
  return null;
};
