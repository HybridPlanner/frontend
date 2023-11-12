import { Meta, StoryObj } from "@storybook/react";
import { InputTags } from "./inputTags";
import { Plus } from "lucide-react";

const meta: Meta<typeof InputTags> = {
  title: "Components/Forms/InputTags",
  component: InputTags,
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    disabled: { control: "boolean", defaultValue: false },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof InputTags
>;
export const Base: Story = {
  args: {
    id: "inputTag",
    label: "Input Tag"
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