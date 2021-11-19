import ReactDatePicker, { registerLocale } from 'react-datepicker';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';

import {
  useState,
  forwardRef,
  memo,
  useCallback,
  FunctionComponent,
} from 'react';
import { SafeAny } from '@wellness/common';
import { CalendarIcon } from '../../icons';

import {
  FormControl,
  FormLabel,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
  Box,
  Text,
} from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { useField } from 'formik';

registerLocale('es', es);

type DatePickerContext = {
  value: Date;
};

const [DatePickerProvider, useDatePickerContext, DatePickerContext] =
  createContext<DatePickerContext>({
    name: 'DatePickerContext',
  });

const CustomInput = memo(
  forwardRef<SafeAny, SafeAny>(({ onClick, onChange, ...props }, ref) => {
    const { value } = useDatePickerContext();
    return (
      <InputGroup>
        <InputLeftElement>
          <Box
            as="button"
            type="button"
            ref={ref}
            transition="0.2s ease"
            _hover={{
              transform: 'scale(1.08)',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            onClick={onClick}
          >
            <CalendarIcon />
          </Box>
        </InputLeftElement>
        <Input value={format(value, 'yyyy-MM-d')} />
      </InputGroup>
    );
  })
);

export type DatePickerProps = {
  value?: Date;
  name: string;
  label: string;
  starDate?: Date | null;
};
/**
 * This is a wrapper for datepickr component
 * wich has the ability to work with chakra and formik
 *  TODO:
 * - Allow user enter a date in input
 * - Implement custome header : https://reactdatepicker.com/#example-custom-header
 */
export const DatePicker: FunctionComponent<DatePickerProps> = ({
  name,
  label,
  value,
  starDate,
}) => {
  const [date, setDate] = useState(value ?? new Date());
  const [field, helpers, meta] = useField(name);
  const onChangue = useCallback(
    (date: Date) => {
      setDate(date);
      meta.setValue(date);
    },
    [meta]
  );
  return (
    <DatePickerProvider
      value={{
        value: date,
      }}
    >
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <ReactDatePicker
          locale={'es'}
          startDate={starDate ?? new Date()}
          onChange={onChangue}
          customInput={<CustomInput />}
          showYearDropdown
          showMonthDropdown
        />
      </FormControl>
    </DatePickerProvider>
  );
};
