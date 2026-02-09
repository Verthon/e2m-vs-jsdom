import type { Meta } from '@storybook/react';
import type { ReactNode } from 'react';
import { Skeleton } from './Skeleton';

const StoryWrapper = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 600,
      minHeight: 200,
    }}
  >
    {children}
  </div>
);

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <StoryWrapper><Story /></StoryWrapper>],
} satisfies Meta<typeof Skeleton>;

export default meta;

export const Default = {
  args: { height: 16 },
  parameters: {
    docs: { description: { story: 'No width — fills parent. Only height is required.' } },
  },
};

export const FixedSize = {
  args: { height: 48, width: 256 },
};

export const Circle = {
  args: { height: 48, width: 48, rounded: 'full' },
  parameters: {
    docs: { description: { story: 'Avatar placeholder.' } },
  },
};

export const SharpEdges = {
  args: { height: 24, width: 200, rounded: 'none' },
};

export const UserCardLoading = {
  render: () => (
    <div
      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
      style={{ width: 320 }}
    >
      <Skeleton height={48} width={48} rounded="full" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton height={16} width={128} />
        <Skeleton height={12} width={96} />
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Composing skeletons for a user card loading state.' } },
  },
};

export const TextBlock = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 400 }}>
      <Skeleton height={16} />
      <Skeleton height={16} />
      <Skeleton height={16} width={300} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Paragraph placeholder. Last line shorter for realism.' } },
  },
};

export const ImagePlaceholder = {
  args: { height: 200, width: 320, rounded: 'lg' },
};

export const Tiny = {
  args: { height: 4, width: 4 },
  parameters: {
    docs: { description: { story: 'Status dot or minimal indicator.' } },
  },
};