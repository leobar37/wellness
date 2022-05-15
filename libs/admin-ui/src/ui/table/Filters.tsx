import { HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SafeAny } from '@wellness/common';
import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { TableConfig, useConfig } from '../../config';
import { Search } from '../../icons';
import { TableInstanceProps } from './internals';

export type GlobalFilterProps = {
  table: TableInstanceProps;
};
export const GlobalFilter = ({ table }: GlobalFilterProps) => {
  const count = table.preGlobalFilteredRows.length;
  const tableConfig = useConfig<TableConfig>('tableConfig');
  const [value, setValue] = useState((table.state as SafeAny).globalFilter);

  const onChangue = useAsyncDebounce((value) => {
    table.setGlobalFilter(value || undefined);
  }, tableConfig.gloabalFilter.debounce);

  return (
    <HStack spacing={3}>
      <InputGroup maxWidth="350px" bg="white" size="md" borderRadius="5px">
        <InputLeftElement>
          <Search fontSize="20px" />
        </InputLeftElement>
        <Input
          value={value}
          onChange={(event) => {
            onChangue(event.target.value);
            setValue(event.target.value);
          }}
          type="text"
          placeholder={tableConfig.gloabalFilter.placeHolder(count)}
        />
      </InputGroup>
    </HStack>
  );
};
