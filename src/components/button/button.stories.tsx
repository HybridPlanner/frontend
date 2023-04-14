import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/Button",
  component: Button,
  argTypes: {
    children: { control: "text" },
    disabled: { control: "boolean", defaultValue: false },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Base: Story = {
  args: {
    children: "Create",
  },
};

export const Disabled: Story = {
  args: {
    ...Base.args,
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    ...Base.args,
    icon: <Plus />,
  },
};
