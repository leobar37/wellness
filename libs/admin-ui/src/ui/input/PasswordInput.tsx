import { FC, useState } from 'react';
import {
  Box,
  InputGroup,
  InputRightElement,
  Input,
  useBoolean,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { InputControlProps } from 'formik-chakra-ui';
import { EyeIcon, EyeCloseIcon } from '../../icons';
import { useField } from 'formik';

export const PasswordInput: FC<InputControlProps> = ({ ...props }) => {
  const [show, actions] = useBoolean(true);
  const [field, { error, touched }] = useField(props?.name);
  return (
    <Box>
      <FormControl isInvalid={!!error && touched}>
        <FormLabel>{props.label}</FormLabel>
        <InputGroup>
          <Input type={show ? 'password' : 'text'} {...field} />
          <InputRightElement
            onClick={() => {
              actions.toggle();
            }}
            color={'gray.400'}
            cursor="pointer"
            fontSize={'lg'}
          >
            {!show ? <EyeCloseIcon /> : <EyeIcon />}
          </InputRightElement>
        </InputGroup>
        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        {props?.helperText && (
          <FormHelperText>{props.helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
