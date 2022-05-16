import { ComponentStory , ComponentMeta  } from "@storybook/react";
import { ButtonIcon  } from "../../ui/button";
import { SafeAny  } from "@wellness/common";
export default {
title : "Button/ButtonIcon",
component : ButtonIcon,
} as ComponentMeta<typeof ButtonIcon>

const Template = (args: SafeAny) => <ButtonIcon {...args} />;

export const Normal = Template.bind({});

