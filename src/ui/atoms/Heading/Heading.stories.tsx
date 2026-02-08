import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    as: 'h2',
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default heading with medium variant rendered as h2.
 */
export const Default: Story = {
  args: {
    children: 'Default Heading',
  },
};

/**
 * Extra small heading variant.
 */
export const HeadingXS: Story = {
  args: {
    variant: 'heading-xs',
    children: 'Extra Small Heading',
  },
};

/**
 * Small heading variant.
 */
export const HeadingSM: Story = {
  args: {
    variant: 'heading-sm',
    children: 'Small Heading',
  },
};

/**
 * Medium heading variant (default).
 */
export const HeadingMD: Story = {
  args: {
    variant: 'heading-md',
    children: 'Medium Heading',
  },
};

/**
 * Large heading variant.
 */
export const HeadingLG: Story = {
  args: {
    variant: 'heading-lg',
    children: 'Large Heading',
  },
};

/**
 * Extra large heading variant.
 */
export const HeadingXL: Story = {
  args: {
    variant: 'heading-xl',
    children: 'Extra Large Heading',
  },
};

/**
 * Heading rendered as an h1 element.
 */
export const AsH1: Story = {
  args: {
    as: 'h1',
    variant: 'heading-xl',
    children: 'Page Title (h1)',
  },
};

/**
 * Heading rendered as an h3 element.
 */
export const AsH3: Story = {
  args: {
    as: 'h3',
    variant: 'heading-sm',
    children: 'Section Subtitle (h3)',
  },
};

/**
 * All variants stacked for comparison.
 */
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading as="h5" variant="heading-xs">Heading XS</Heading>
      <Heading as="h4" variant="heading-sm">Heading SM</Heading>
      <Heading as="h3" variant="heading-md">Heading MD</Heading>
      <Heading as="h2" variant="heading-lg">Heading LG</Heading>
      <Heading as="h1" variant="heading-xl">Heading XL</Heading>
    </div>
  ),
};
