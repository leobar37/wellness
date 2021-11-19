import ReactDatePicker from 'react-datepicker';
import { useState, forwardRef, memo } from 'react';
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
const ExampleCustomInput = memo(
  forwardRef<SafeAny, SafeAny>(({ value, onClick, onChange }, ref) => {
    console.log(value);

    return (
      <InputGroup>
        <InputLeftElement>
          <Box
            as="button"
            transition="0.2s ease"
            _hover={{
              transform: 'scale(1.08)',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
          >
            <CalendarIcon />
          </Box>
        </InputLeftElement>
        <Text>value: {value}</Text>
        <Input
          ref={ref}
          onClick={onClick}
          onChange={onChange}
          value={value}
          defaultValue={value}
        />
      </InputGroup>
    );
  })
);

export const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(startDate);
  return (
    <FormControl>
      <FormLabel>Date Picker</FormLabel>
      <ReactDatePicker
        startDate={startDate}
        onChange={(date: Date) => {
          console.log(date);
          //   setDate(date);
        }}
        customInput={<ExampleCustomInput />}
      />
    </FormControl>
  );
};

/* <Global
  styles={css`
    .react-datepicker {
      font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', sans-serif;
      overflow: hidden;
    }

    .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
      right: 90px;
    }

    .react-datepicker__navigation--previous,
    .react-datepicker__navigation--next {
      height: 8px;
    }

    .react-datepicker__navigation--previous {
      border-right-color: #cbd5e0;

      &:hover {
        border-right-color: #a0aec0;
      }
    }

    .react-datepicker__navigation--next {
      border-left-color: #cbd5e0;

      &:hover {
        border-left-color: #a0aec0;
      }
    }

    .react-datepicker-wrapper,
    .react-datepicker__input-container {
      display: block;
    }

    .react-datepicker__header {
      border-radius: 0;
      background: #f7fafc;
    }

    .react-datepicker,
    .react-datepicker__header,
    .react-datepicker__time-container {
      border-color: #e2e8f0;
    }

    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header {
      font-size: inherit;
      font-weight: 600;
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item {
      margin: 0 1px 0 0;
      height: auto;
      padding: 7px 10px;

      &:hover {
        background: #edf2f7;
      }
    }

    .react-datepicker__day:hover {
      background: #edf2f7;
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--selected {
      background: #3182ce;
      font-weight: normal;

      &:hover {
        background: #2a69ac;
      }
    }
  `}
/>; */
