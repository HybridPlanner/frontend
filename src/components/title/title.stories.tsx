import { Meta, StoryObj } from "@storybook/react";
import { Title } from "./title";
import { Calendar } from "lucide-react";

const meta: Meta<typeof Title> = {
  title: "Components/Title",
  component: Title,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Base: Story = {
  args: {
    children: "Title",
  },
};

export const WithIcon: Story = {
  args: {
    ...Base.args,
    icon: Calendar,
  },
};
