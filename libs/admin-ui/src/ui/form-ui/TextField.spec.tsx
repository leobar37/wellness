/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Formik, FormikConfig } from 'formik';
import { render, fireEvent, act, screen } from '@wellness/front-test';
import { FC } from 'react';
import { SafeAny } from '@wellness/common';
import { noop } from '@chakra-ui/utils';

import { TextField } from './TextField';
const Common: FC<{ onSubmit?: FormikConfig<SafeAny>['onSubmit'] }> = ({
  onSubmit,
  children,
}) => {
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={onSubmit ?? noop}
    >
      {children}
    </Formik>
  );
};

describe('TextField Element', () => {
  test('max property limit the characters entered by user', async () => {
    render(
      <Common>
        <TextField data-testid="control" label="Name" name="name" max={5} />
      </Common>
    );
    const control = screen.getByTestId('control');
    const input = control.querySelector('input') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    await act(async () => {
      fireEvent.input(input, {
        target: { value: '123456' },
      });
    });
    expect(input.value).toBe('12345');
  });

  test('when user press enter the, the value  remains empty ', async () => {
    render(
      <Common>
        <TextField data-testid="control" label="Name" name="name" max={5} />
      </Common>
    );
    const control = screen.getByTestId('control');
    const input = control.querySelector('input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    await act(async () => {
      fireEvent.input(input, {
        target: { value: '    ' },
      });
    });
    expect(input.value).toBe('');
  });
});
