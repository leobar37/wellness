import {
  Checkbox,
  SystemStyleObject,
  Table as ChacrakTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  usePrevious,
} from '@chakra-ui/react';
import { SafeAny } from '@wellness/common';
import { count } from 'console';
import { get, isFunction } from 'lodash';
import React, {
  FunctionComponent,
  ReactChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  useFilters,
  useGlobalFilter,
  useRowSelect,
  UseRowSelectHooks,
  useTable,
} from 'react-table';
import { ColTableProps } from './Column';
import { TableInstanceProps, TableProps } from './internals';
import { convertChildrenToColumns } from './utils';

export const Table: FunctionComponent<TableProps> = ({
  data,
  children,
  onTable,
  rowProps,
  isSelecteable,
  onChangueTable,
  ...rest
}) => {
  // define columns
  const columns = React.useMemo(() => {
    const _columns: ColTableProps[] = [];
    if (isSelecteable) {
      const selectColumn = {
        id: 'selection',
        Header: ({
          getToggleAllRowsSelectedProps,
        }: UseRowSelectHooks<SafeAny>) => {
          const props = (getToggleAllRowsSelectedProps as SafeAny)();
          const { checked, indeterminate, onChange } = props;
          return (
            <Checkbox
              isChecked={checked}
              isIndeterminate={indeterminate}
              onChange={onChange}
            />
          );
        },
        Cell: (props: SafeAny) => {
          const fn = get(props, 'row.getToggleRowSelectedProps');
          const propsCheck = fn();

          return (
            <Checkbox
              isChecked={propsCheck.checked}
              onChange={propsCheck.onChange}
            />
          );
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

  const calculateOnChangue = () => {
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
      onChangueTable({
        selection,
      });
    }
  };
  useEffect(() => {
    if (onTable) {
      onTable(props as SafeAny as TableInstanceProps);
    }
  }, [onTable, props]);
  useEffect(() => {
    calculateOnChangue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows.length]);

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
