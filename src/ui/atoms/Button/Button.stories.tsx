import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default primary button with medium size.
 */
export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

/**
 * Primary variant is the main call-to-action style.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

/**
 * Secondary variant for less prominent actions.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

/**
 * Outline variant with transparent background and border.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

/**
 * Ghost variant for subtle actions.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

/**
 * Small size button.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

/**
 * Medium size button (default).
 */
export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

/**
 * Large size button.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

/**
 * Button expanded to full container width.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Loading state with spinner. Button remains focusable but clicks are prevented.
 * Uses aria-busy="true" to indicate loading to assistive technology.
 */
export const LoadingStory = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * Loading state on primary variant.
 */
export const LoadingPrimary: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Saving',
  },
};

/**
 * Loading state on secondary variant.
 */
export const LoadingSecondary: Story = {
  args: {
    variant: 'secondary',
    isLoading: true,
    children: 'Processing',
  },
};

/**
 * Submit button type for form submission.
 */
export const SubmitType: Story = {
  args: {
    type: 'submit',
    children: 'Submit Form',
  },
};

/**
 * Button with very long text to test text wrapping and overflow behavior.
 */
export const LongText: Story = {
  args: {
    children: 'This is a button with very long text that might wrap or overflow',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Full width loading button - common pattern for form submissions.
 */
export const FullWidthisLoading: Story = {
  args: {
    fullWidth: true,
    isLoading: true,
    type: 'submit',
    children: 'Signing in...',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * All size variants side by side for comparison.
 */
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * All variants side by side for comparison.
 */
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
