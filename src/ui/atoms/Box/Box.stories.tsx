import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { Box } from './Box';

const meta = {
  title: 'Atoms/Box',
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

export const CenteredContent: Story = {
  args: {
    align: 'center',
    justify: 'center',
    padding: 6,
    children: <p>Centered horizontally and vertically</p>,
  },
};

export const ColumnLayout: Story = {
  args: {
    direction: 'column',
    align: 'start',
    justify: 'start',
    padding: 4,
    children: (
      <>
        <p>First item</p>
        <p>Second item</p>
        <p>Third item</p>
      </>
    ),
  },
};

export const SpaceBetweenWithWrap: Story = {
  args: {
    justify: 'between',
    align: 'center',
    wrap: 'wrap',
    padding: 4,
    children: (
      <>
        <button type="button">Button 1</button>
        <button type="button">Button 2</button>
        <button type="button">Button 3</button>
        <button type="button">Button 4</button>
        <button type="button">Button 5</button>
      </>
    ),
  },
};

export const AlignBaseline: Story = {
  args: {
    align: 'baseline',
    justify: 'start',
    padding: 4,
    children: (
      <>
        <h1 style={{ margin: 0 }}>Large</h1>
        <p style={{ margin: 0 }}>Small text</p>
        <span style={{ fontSize: '0.75rem', margin: 0 }}>Tiny</span>
      </>
    ),
  },
};

export const StretchItems: Story = {
  args: {
    align: 'stretch',
    justify: 'start',
    padding: 4,
    children: (
      <>
        <div style={{ border: '1px solid black', padding: '8px' }}>Item 1</div>
        <div style={{ border: '1px solid black', padding: '8px' }}>Item 2</div>
        <div style={{ border: '1px solid black', padding: '8px' }}>Item 3</div>
      </>
    ),
  },
};

export const WithGap: Story = {
  args: {
    gap: 4,
    padding: 6,
    children: (
      <>
        <button type="button">Button 1</button>
        <button type="button">Button 2</button>
        <button type="button">Button 3</button>
      </>
    ),
  },
};

export const ColumnWithLargeGap: Story = {
  args: {
    direction: 'column',
    gap: 8,
    padding: 6,
    children: (
      <>
        <p style={{ margin: 0 }}>First paragraph</p>
        <p style={{ margin: 0 }}>Second paragraph</p>
        <p style={{ margin: 0 }}>Third paragraph</p>
      </>
    ),
  },
};