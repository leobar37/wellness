import {
  TableProps as ChakraTableProps,
  TableRowProps,
} from '@chakra-ui/react';
import { SafeAny } from '@wellness/common';
import {
  Row,
  TableProps as CTableProps,
  UseGlobalFiltersInstanceProps,
  UseTableInstanceProps,
  UseRowSelectInstanceProps,
} from 'react-table';

export type FilterGlobalProps = Pick<
  UseGlobalFiltersInstanceProps<SafeAny>,
  'preGlobalFilteredRows' | 'setGlobalFilter'
> & {
  globalFilter: SafeAny;
};

export type TableInstanceProps = UseGlobalFiltersInstanceProps<SafeAny> &
  UseTableInstanceProps<SafeAny> &
  UseRowSelectInstanceProps<SafeAny>;

type onChangueTableProps = {
  selection?: {
    ids: SafeAny[];
    nodes: SafeAny[];
  };
};

export type TableProps = {
  data: SafeAny[];
  rowProps?: TableRowProps | ((row: Row) => TableRowProps);
  onTable?: (table: TableInstanceProps) => void;
  isSelecteable?: boolean;
  onChangueTable?: (props: onChangueTableProps) => void;
  isLoading?: boolean;
} & CTableProps &
  ChakraTableProps;
