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
 * Default text — medium size, grey900 colour, regular weight.
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
 * Caption variant — smallest size (12px), typically for labels or metadata.
 */
export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text (12px)',
  },
};

/**
 * Small variant — 14px.
 */
export const Small: Story = {
  args: {
    variant: 's',
    children: 'Small text (14px)',
  },
};

/**
 * Medium variant — 16px (default).
 */
export const Medium: Story = {
  args: {
    variant: 'm',
    children: 'Medium text (16px)',
  },
};

/**
 * Large variant — 18px.
 */
export const Large: Story = {
  args: {
    variant: 'l',
    children: 'Large text (18px)',
  },
};

/**
 * Extra large variant — 20px.
 */
export const ExtraLarge: Story = {
  args: {
    variant: 'xl',
    children: 'Extra large text (20px)',
  },
};

/**
 * Muted grey600 colour — useful for secondary / supporting text.
 */
export const Grey600: Story = {
  args: {
    color: 'grey600',
    children: 'Grey 600 — secondary text',
  },
};

/**
 * Subtle grey500 colour — useful for placeholder or tertiary text.
 */
export const Grey500: Story = {
  args: {
    color: 'grey500',
    children: 'Grey 500 — tertiary text',
  },
};

/**
 * Lightest grey50 — typically used on dark backgrounds.
 */
export const Grey50: Story = {
  args: {
    color: 'grey50',
    children: 'Grey 50 — on dark background',
  },
  parameters: {
    backgrounds: { default: 'dark' },
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
 * All variants side by side for comparison.
 */
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text variant="caption">Caption (12px)</Text>
      <Text variant="s">Small (14px)</Text>
      <Text variant="m">Medium (16px)</Text>
      <Text variant="l">Large (18px)</Text>
      <Text variant="xl">Extra large (20px)</Text>
    </div>
  ),
};

/**
 * Greyscale colour palette side by side for comparison.
 */
export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text color="grey950">Grey 950</Text>
      <Text color="grey900">Grey 900 (default)</Text>
      <Text color="grey800">Grey 800</Text>
      <Text color="grey700">Grey 700</Text>
      <Text color="grey600">Grey 600</Text>
      <Text color="grey500">Grey 500</Text>
      <Text color="grey400">Grey 400</Text>
      <Text color="grey300">Grey 300</Text>
      <Text color="grey200">Grey 200</Text>
      <Text color="grey100">Grey 100</Text>
      <Text color="grey50">Grey 50</Text>
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
