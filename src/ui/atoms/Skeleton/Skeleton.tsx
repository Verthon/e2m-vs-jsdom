import type { CSSProperties } from 'react';

const BASE_CLASSES = 'block animate-pulse bg-slate-300';

const roundedClassMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

export type SkeletonRounded = keyof typeof roundedClassMap;

type SkeletonProps = {
  height: number;
  width?: number;
  rounded?: SkeletonRounded;
};

/**
 * Placeholder pulse animation for content that hasn't loaded yet.
 *
 * Use Skeleton for **layout-preserving** loading states — when you know the
 * shape of the incoming content (text lines, avatars, cards, images).
 * Prefer a Spinner/Loader when the layout is unknown or the entire view is loading.
 *
 * Dimensions are in px. Both default to 100% of the parent container.
 *
 * @example Text line placeholder
 * ```tsx
 * <Skeleton height={16} />
 * ```
 *
 * @example Avatar circle
 * ```tsx
 * <Skeleton height={48} width={48} rounded="full" />
 * ```
 *
 * @example Card with multiple skeletons
 * ```tsx
 * <div className="flex gap-4">
 *   <Skeleton height={48} width={48} rounded="full" />
 *   <div className="flex flex-col gap-2">
 *     <Skeleton height={16} width={128} />
 *     <Skeleton height={12} width={96} />
 *   </div>
 * </div>
 * ```
 */
export const Skeleton = ({ height, width, rounded = 'md' }: SkeletonProps) => {
  const style: CSSProperties = {
    height: `${height}px`,
    width: width ? `${width}px` : '100%',
  };

  return (
    <span
      className={`${BASE_CLASSES} ${roundedClassMap[rounded]}`}
      style={style}
    />
  );
};