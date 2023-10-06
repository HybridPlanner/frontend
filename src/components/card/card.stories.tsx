import { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";
import { Button } from "../base/button/button";
import { Plus } from "lucide-react";

const meta: Meta<typeof Card> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Base: Story = {
  args: {
    children: (
      <>
        <p>Some content</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum fuga
          saepe, ad error recusandae blanditiis, libero ratione reiciendis totam
          eius labore. Repellat, magni. Quisquam expedita ex dicta magnam
          obcaecati nobis!
        </p>
      </>
    ),
  },
};

export const Title: Story = {
  args: {
    ...Base.args,
    cardTitle: "Plan a meeting",
  },
};

export const TitleWithIcon: Story = {
  args: {
    ...Title.args,
    icon: <Plus />,
  },
};

export const WithActions: Story = {
  args: {
    ...TitleWithIcon.args,
    actions: [<Button>Cancel</Button>, <Button>Save</Button>],
  },
};
