import type {Meta, StoryObj} from "@storybook/react";
import Recaptcha from "@/shared/ui/Recaptcha/Recaptcha";

const meta = {
    component: Recaptcha,
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {

}