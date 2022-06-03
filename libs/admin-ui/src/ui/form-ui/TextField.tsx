import { SafeAny } from '@wellness/common';
import { InputControl, InputControlProps } from 'formik-chakra-ui';
import { FC, useCallback, MouseEventHandler } from 'react';
export type TextFieldProps = InputControlProps & {
  // maximum number of characteres in the input
  max: number;
  skipNormalize?: boolean;
};

export const TextField: FC<TextFieldProps> = ({
  skipNormalize,
  max,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wrapOnInput = useCallback(
    ((e) => {
      const target = e.target as HTMLInputElement;
      let value = target.value;
      if (value && !skipNormalize) {
        value = value.trim();
      }
      if (value && value.length >= max) {
        value = value.substring(0, max);
      }
      (e as SafeAny).target.value = value;
    }) as MouseEventHandler<HTMLInputElement>,
    [props]
  );

  return (
    <InputControl
      {...props}
      inputProps={{
        ...props.inputProps,
        onInput: wrapOnInput,
      }}
    />
  );
};

TextField.defaultProps = {
  skipNormalize: false,
};
