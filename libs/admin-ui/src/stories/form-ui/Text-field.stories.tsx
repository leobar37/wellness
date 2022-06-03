/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextField } from '../../ui/form-ui/TextField';
import { decorators } from '../../stories-utils';
import { Formik } from 'formik';
import { noop } from '@chakra-ui/utils';

type Story = ComponentStory<typeof TextField>;

export default {
  title: 'components / TextField',
  component: TextField,
  decorators: [
    ...decorators,
    (Story) => {
      return (
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={noop}
        >
          <Story />
        </Formik>
      );
    },
  ],
} as ComponentMeta<typeof TextField>;

const Template: Story = (args: any) => <TextField {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'name',
  max: 5,
};
