import {
  SystemStyleObject,
  Table as ChacrakTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { SafeAny } from '@wellness/common';
import React, { FunctionComponent, ReactChildren, useEffect } from 'react';
import {
  TableProps as CTableProps,
  useFilters,
  useGlobalFilter,
  UseGlobalFiltersInstanceProps,
  useTable,
  UseTableInstanceProps,
} from 'react-table';
import { convertChildrenToColumns } from './utils';

export type TableInstanceProps = UseGlobalFiltersInstanceProps<SafeAny> &
  UseTableInstanceProps<SafeAny>;

export type TableProps = {
  data: SafeAny[];
  rowStyles?: SystemStyleObject;
  onTable?: (table: TableInstanceProps) => void;
} & CTableProps;

export const Table: FunctionComponent<TableProps> = ({
  data,
  children,
  rowStyles,
  onTable,
  ...rest
}) => {
  const columns = React.useMemo(
    () => convertChildrenToColumns(children as ReactChildren),
    [children]
  );
  const props = useTable({ data, columns }, useFilters, useGlobalFilter);
  let stylesRow: SystemStyleObject | null = null;
  if (typeof rowStyles == 'object') {
    stylesRow = rowStyles;
  }
  useEffect(() => {
    if (onTable) {
      onTable(props as SafeAny as TableInstanceProps);
    }
  }, [props, onTable]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    props as SafeAny as TableInstanceProps;

  return (
    <ChacrakTable {...getTableProps()} {...rest}>
      <Thead>
        {headerGroups.map((headerGroup, i) => {
          return (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => {
                return (
                  <Th {...column.getHeaderProps()} key={j}>
                    {column.render('Header')}
                  </Th>
                );
              })}
            </Tr>
          );
        })}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr sx={stylesRow || {}} {...row.getRowProps()} key={i}>
              {row.cells.map((cell, j) => {
                return (
                  <Td {...cell.getCellProps()} key={j}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </ChacrakTable>
  );
};
