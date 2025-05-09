import {Button} from "@/shared/ui/base/Button/Button";
import type {Meta, StoryObj} from "@storybook/react";
import TextArea from "@/shared/ui/base/TextArea/TextArea";

const meta = {
    component: TextArea,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Hello. I textarea',
        disabled: false
    },
}