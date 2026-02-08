import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default text with regular weight, base size, and primary color.
 */
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

/**
 * Bold weight for emphasis.
 */
export const Bold: Story = {
  args: {
    weight: 'bold',
    children: 'Bold text',
  },
};

/**
 * Semi-bold weight for moderate emphasis.
 */
export const SemiBold: Story = {
  args: {
    weight: 'semi-bold',
    children: 'Semi-bold text',
  },
};

/**
 * Extra small text size.
 */
export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: 'Extra small text',
  },
};

/**
 * Small text size.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small text',
  },
};

/**
 * Large text size.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large text',
  },
};

/**
 * Extra large text size.
 */
export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra large text',
  },
};

/**
 * 2XL text size.
 */
export const TwoExtraLarge: Story = {
  args: {
    size: '2xl',
    children: '2XL text',
  },
};

/**
 * Secondary color for less prominent text.
 */
export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary color text',
  },
};

/**
 * Tertiary color for subtle text.
 */
export const Tertiary: Story = {
  args: {
    color: 'tertiary',
    children: 'Tertiary color text',
  },
};

/**
 * Error color for validation messages.
 */
export const Error: Story = {
  args: {
    color: 'error',
    children: 'Something went wrong',
  },
};

/**
 * Success color for confirmation messages.
 */
export const Success: Story = {
  args: {
    color: 'success',
    children: 'Operation completed successfully',
  },
};

/**
 * Rendered as a paragraph element using the `as` prop.
 */
export const AsParagraph: Story = {
  args: {
    as: 'p',
    children: 'This is rendered as a paragraph element.',
  },
};

/**
 * All sizes side by side for comparison.
 */
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="xs">Extra small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="base">Base (base)</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra large (xl)</Text>
      <Text size="2xl">2XL (2xl)</Text>
    </div>
  ),
};

/**
 * All colors side by side for comparison.
 */
export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text color="primary">Primary</Text>
      <Text color="secondary">Secondary</Text>
      <Text color="tertiary">Tertiary</Text>
      <Text color="error">Error</Text>
      <Text color="success">Success</Text>
    </div>
  ),
};

/**
 * All weights side by side for comparison.
 */
export const AllWeights = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="semi-bold">Semi-bold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};
