import { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { Plus } from "lucide-react";

const meta: Meta<typeof Textarea> = {
  title: "Components/Forms/Textarea",
  component: Textarea,
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    disabled: { control: "boolean", defaultValue: false },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Base: Story = {
  args: {
    id: "textarea",
    label: "Textarea",
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

export const WithError: Story = {
  args: {
    ...Base.args,
    error: "This is an error",
  },
};
