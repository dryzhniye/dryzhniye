import { Theme } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/shared/ui/Header/Header";

const meta = {
    component: Header,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Auth: Story = {
    args: {
        isLoggedIn: true,
        notifications: false,
        countNotifications: 5,
        title: 'Inctagram'
    },

    render: (args) => (
        <Theme>
            <Header {...args}/>
        </Theme>
    ),
};

export const Guest: Story = {
    args: {
        isLoggedIn: false,
        title: 'Inctagram'
    },
    render: (args) => (
        <Theme>
            <Header {...args} />
        </Theme>
    ),
};
