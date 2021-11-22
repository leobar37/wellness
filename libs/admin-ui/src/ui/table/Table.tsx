import {
  SystemStyleObject,
  Table as ChacrakTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
} from '@chakra-ui/react';
import { SafeAny } from '@wellness/common';
import { get, isFunction } from 'lodash';
import React, {
  FunctionComponent,
  ReactChildren,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  useFilters,
  useGlobalFilter,
  useTable,
  useRowSelect,
  UseRowSelectHooks,
} from 'react-table';
import { TableInstanceProps, TableProps } from './internals';
import { convertChildrenToColumns } from './utils';
import { ColTableProps } from './Column';

export const Table: FunctionComponent<TableProps> = ({
  data,
  children,
  onTable,
  rowProps,
  isSelecteable,
  onChangueTable,
  ...rest
}) => {
  const columns = React.useMemo(() => {
    const _columns: ColTableProps[] = [];
    if (isSelecteable) {
      const selectColumn = {
        id: 'selection',
        Header: ({
          getToggleAllRowsSelectedProps,
        }: UseRowSelectHooks<SafeAny>) => {
          return <Checkbox {...(getToggleAllRowsSelectedProps as SafeAny)()} />;
        },
        Cell: (props: SafeAny) => {
          const fn = get(props, 'row.getToggleRowSelectedProps');
          return <Checkbox {...fn()} />;
        },
      };
      _columns.push(selectColumn);
    }
    return [
      ..._columns,
      ...convertChildrenToColumns(children as ReactChildren),
    ];
  }, [children, isSelecteable]);

  const memoizedData = useMemo(() => data, [data]);
  const props = useTable(
    { data: memoizedData, columns },
    useFilters,
    useGlobalFilter,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
  } = props as SafeAny as TableInstanceProps;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoChangue = useCallback(
    onChangueTable ||
      (() => {
        return 0;
      }),
    []
  );

  const calculateOnChangue = useCallback(() => {
    if (onTable) {
      onTable(props as SafeAny as TableInstanceProps);
    }
    if (onChangueTable) {
      let selection;
      if (isSelecteable) {
        selection = {
          ids: Object.keys(
            (state as SafeAny)?.selectedRowIds
          ) as unknown as SafeAny[],
          nodes: selectedFlatRows.map((r) => r.original),
        };
      }
      memoChangue({
        selection,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  useEffect(() => {
    console.log('effect');

    calculateOnChangue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, state]);

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
        {rows.map((row) => {
          prepareRow(row);
          const trProps = isFunction(rowProps) ? rowProps(row) : rowProps;

          return (
            <Tr {...row.getRowProps()} {...trProps}>
              {row.cells.map((cell, j) => {
                const cellStyles = get(
                  cell.column,
                  'cellStyles',
                  {}
                ) as SystemStyleObject;

                return (
                  <Td {...cell.getCellProps()} sx={cellStyles}>
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

Table.defaultProps = {
  isSelecteable: true,
};
