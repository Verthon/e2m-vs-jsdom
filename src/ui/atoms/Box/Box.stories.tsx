import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { Box } from './Box';

const meta = {
  title: 'Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSmallestPadding: Story = {
  args: {
    padding: 2,
    children: <p>Children</p>
  },
};

export const AsMain: Story = {
  args: {
    component: 'main',
    children: <p>Children</p>
  },
};