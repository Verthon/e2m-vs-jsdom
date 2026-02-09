import type { Meta, StoryObj } from '@storybook/react';

import { Container } from './Container';

const meta = {
  title: 'Atoms/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-emerald-100 py-8">
        <h1 className="text-2xl font-bold text-emerald-900">Centered Content</h1>
        <p className="mt-2 text-emerald-800">
          This content is centered with responsive padding. Resize the window to see
          how the container adapts to different screen sizes.
        </p>
      </div>
    ),
  },
};

export const AsMain: Story = {
  args: {
    component: 'main',
    children: (
      <div className="bg-emerald-100 py-8">
        <h1 className="text-2xl font-bold text-emerald-900">Main Content Area</h1>
        <p className="mt-2 text-emerald-800">
          Using semantic &lt;main&gt; element for the primary content area.
        </p>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <div className="bg-emerald-100 py-8">
        <h1 className="text-2xl font-bold text-emerald-900">Long Content Test</h1>
        <p className="mt-2 text-emerald-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="mt-4 text-emerald-800">
          On wide screens, this container will constrain the max-width and prevent
          content from stretching edge-to-edge. The responsive padding ensures proper
          spacing on all screen sizes.
        </p>
      </div>
    ),
  },
};
