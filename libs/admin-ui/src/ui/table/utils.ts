import * as React from 'react';
import { Column, CellProps } from 'react-table';
import { toArray } from '../../utils/react-utils';
import { SafeAny, TObject } from '@wellness/common';
import { TableInstanceProps } from './internals';
import { get } from 'lodash';
/**
 * see : https://github.com/tannerlinsley/react-table/blob/master/src/filterTypes.js
 */
export enum DefaultFilters {
  text = 'text',
  exactText = 'exactText',
  exactTextCase = 'exactTextCase',
  includes = 'includes',
  includesAl = 'includesAl',
  includesSome = 'includesSome',
  includesValue = 'includesValue',
  exact = 'exact',
  equals = 'equals',
  between = 'between',
}

/**
 *
 * @description
 * Giving a child this function return a array of data in column table
 */
export const convertChildrenToColumns = (children: React.ReactChildren) => {
  return toArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props, type }: React.ReactElement) => {
      const { children, ...restProps } = props;
      const column = {
        ...restProps,
      };
      return column;
    }) as unknown as Column[];
};

/**
 * Table utils
 *
 */
export const prepareCellProps = <D extends TObject>(props: CellProps<D>) => {
  return {
    ...props,
    original: props.cell.row.original,
  };
};

export const prepareTableProps = (props: TableInstanceProps) => {
  const selection = {
    ids: get(props, 'state.selectedRowIds'),
  };
  return {
    selection,
    ...props,
  };
};
