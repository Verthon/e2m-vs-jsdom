import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';
import { Text } from '../Text/Text';

/**
 * Mock RouterLink component for demonstration purposes in stories.
 */
const MockRouterLink = ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default anchor link with primary brand color.
 */
export const Default: Story = {
  args: {
    href: '/about',
    children: 'About',
  },
};

/**
 * Link with custom component (e.g., React Router Link).
 * The `to` prop is mandatory when using a custom component.
 */
export const WithCustomComponent: Story = {
  args: {
    component: MockRouterLink,
    to: '/home',
    children: 'Home',
  },
};

/**
 * Link with nested Text component to override default styling.
 * Demonstrates how children can customize appearance.
 */
export const WithNestedText: Story = {
  args: {
    component: MockRouterLink,
    to: '/brand',
    children: (
      <Text weight="bold" variant="l">
        Brand Name
      </Text>
    ),
  },
};

/**
 * External link opening in a new tab.
 * Uses target and rel attributes for security.
 */
export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'Visit External Site',
  },
};

/**
 * Long text link to test wrapping behavior.
 */
export const LongText: Story = {
  args: {
    href: '/services',
    children:
      'This is a very long link text that demonstrates how the component handles wrapping and maintains accessibility across multiple lines of content',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * All link variants side by side for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="/default">Default Link</Link>
      <Link component={MockRouterLink} to="/custom">
        Custom Component Link
      </Link>
      <Link component={MockRouterLink} to="/brand">
        <Text weight="bold" variant="l">
          Styled with Text
        </Text>
      </Link>
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
      </Link>
    </div>
  ),
};
