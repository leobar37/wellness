import { ComponentMeta, ComponentStory } from '@storybook/react';
import { decorators } from '../../stories-utils';
import {
  ErrorContentModal,
  DialogsProvider,
  useDialogs,
} from '../../ui/dialogs';
import { Button } from '@chakra-ui/react';
const meta: ComponentMeta<typeof ErrorContentModal> = {
  title: 'Components/Dialogs/Error',
  decorators: [
    (storyFn) => <DialogsProvider>{storyFn()}</DialogsProvider>,
    ...decorators,
  ],
  component: ErrorContentModal,
  argTypes: {
    title: {
      defaultValue: 'Error',
      control: {
        type: 'text',
      },
    },
    description: {
      defaultValue: 'Ha ocurrido en el sistema',
    },
  },
};

const Template: ComponentStory<typeof ErrorContentModal> = ({ ...args }) => {
  return <ErrorContentModal {...args} />;
};

export const WithModal = () => {
  const { setErrorState } = useDialogs();
  return (
    <Button
      onClick={() => {
        console.log('click me');

        setErrorState((state) => {
          state.info.description = 'Ha ocurrido en el sistema';
          state.info.title = 'Error';
          state.isOpen = true;
        });
      }}
    >
      show modal error
    </Button>
  );
};

export const Normal = Template;
Normal.parameters = {
  controls: { include: ['title', 'description'] },
};
export default meta;
