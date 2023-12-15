import { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";
import { Plus } from "lucide-react";

const meta: Meta<typeof Select> = {
  title: "Components/Forms/Select",
  component: Select,
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    disabled: { control: "boolean", defaultValue: false },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Base: Story = {
  args: {
    id: "select",
    label: "Select",
    children: <>
      <option value="0" disabled selected>0 (disabled)</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </>,
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
