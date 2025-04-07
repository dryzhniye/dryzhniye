import type { Meta, StoryObj } from "@storybook/react";
import {Sidebar} from "@/shared/ui/Sidebar/Sidebar";

const meta = {
    component: Sidebar,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        disabledIcon: true
    },

}