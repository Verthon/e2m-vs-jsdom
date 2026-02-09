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
 * Default primary button (h-14, emerald-800 background).
 */
export const Default: Story = {
  args: {
    children: 'Next',
  },
};

/**
 * Primary variant with shadow, bold text, and emerald color scheme.
 * Height: 56px (h-14), includes focus ring for accessibility.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Next',
  },
};

/**
 * Outlined variant with transparent background and border.
 * Height: 48px (h-12), supports dark mode.
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'View Profile',
  },
};

/**
 * Disabled primary button.
 * Shows reduced opacity and prevents interactions while maintaining focus.
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    isDisabled: true,
    ariaLabel: 'Please select a doctor to continue',
    children: (
      <>
        Next
        <span className="material-symbols-outlined">arrow_forward</span>
      </>
    ),
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
 * Shows spinner and prevents click handling while keeping button focusable.
 */
export const LoadingPrimary: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Saving',
  },
};

/**
 * Loading state on outlined variant.
 */
export const LoadingOutlined: Story = {
  args: {
    variant: 'outlined',
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
export const FullWidthLoading: Story = {
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
 * All variants side by side for comparison.
 * Shows both primary (h-14, emerald) and outlined (h-12, border) styles.
 */
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary">Next</Button>
      <Button variant="outlined">View Profile</Button>
    </div>
  ),
};

/**
 * Button with icon - demonstrates gap spacing between elements.
 */
export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        Continue
        <span className="material-symbols-outlined">arrow_forward</span>
      </>
    ),
  },
};
