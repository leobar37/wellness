import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { MonthMapper, range, SafeAny } from '@wellness/common';
import format from 'date-fns/format';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import es from 'date-fns/locale/es';
import { useField } from 'formik';
import {
  FC,
  forwardRef,
  FunctionComponent,
  memo,
  useCallback,
  useState,
} from 'react';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
  registerLocale,
} from 'react-datepicker';
import { ButtonIcon } from '../';
import { CalendarIcon } from '../../icons';
import { isDate, startOfDay, isValid } from 'date-fns';
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
        <Input readOnly value={format(value, 'yyyy-MM-d')} />
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

const CustomHeader: FC<ReactDatePickerCustomHeaderProps> = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const years = range(1900, getYear(new Date()) + 1);
  const months = range(1, 12).map((m) => (MonthMapper as SafeAny)[m]);
  return (
    <HStack p={2}>
      <Select
        value={getYear(date)}
        onChange={({ target }) => {
          changeYear(Number(target.value));
        }}
        size={'sm'}
        maxWidth={'100px'}
      >
        {years.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </Select>
      <ButtonIcon
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        colorScheme={'purple'}
        size="sm"
      >
        {'<'}
      </ButtonIcon>
      <Select
        value={(months as SafeAny)[getMonth(date)]}
        size={'sm'}
        maxWidth={'100px'}
        onChange={({ target }) => {
          changeMonth(months.indexOf(target.value));
        }}
      >
        {months.map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </Select>
      <ButtonIcon
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        colorScheme={'purple'}
        size="sm"
      >
        {'>'}
      </ButtonIcon>
    </HStack>
  );
};

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  name,
  label,
  value,
  starDate,
}) => {
  const [date, setDate] = useState(value ?? new Date());
  const [field, helpers, meta] = useField(name);

  const onChangue = useCallback(
    (resultDate: Date) => {
      meta.setValue(resultDate);
      meta.setTouched(true, true);
      setDate(resultDate);
    },
    [meta, setDate]
  );

  return (
    <DatePickerProvider
      value={{
        value: field.value ?? new Date(),
      }}
    >
      <FormControl isInvalid={!!(helpers?.error && helpers?.touched)}>
        <FormLabel>{label}</FormLabel>
        <ReactDatePicker
          renderCustomHeader={CustomHeader}
          locale={'es'}
          selected={field.value ?? new Date()}
          startDate={isValid(starDate) ? starDate : new Date()}
          onChange={onChangue}
          customInput={<CustomInput />}
          showYearDropdown
          showMonthDropdown
        />
        {helpers?.error && helpers?.touched && (
          <FormErrorMessage>{helpers.error}</FormErrorMessage>
        )}
      </FormControl>
    </DatePickerProvider>
  );
};
