import { Parameters, Story } from '@storybook/react';
import { theme } from '../src/system';

export const parameters: Parameters = {
  options: {
    storySort: (a: Story, b: Story) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  chakra: {
    theme: theme,
  },
};
