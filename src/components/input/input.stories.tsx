import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Plus } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    type: { control: "select", options: ["text", "password", "email"] },
    disabled: { control: "boolean", defaultValue: false },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Base: Story = {
  args: {
    id: "input",
    label: "Input",
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
