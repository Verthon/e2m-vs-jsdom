import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

const variantClassMap = {
  caption: 'text-xs',
  s: 'text-sm',
  m: 'text-base',
  l: 'text-lg',
  xl: 'text-xl',
} as const;

const colorClassMap = {
  grey50: 'text-grey-50',
  grey100: 'text-grey-100',
  grey200: 'text-grey-200',
  grey300: 'text-grey-300',
  grey400: 'text-grey-400',
  grey500: 'text-grey-500',
  grey600: 'text-grey-600',
  grey700: 'text-grey-700',
  grey800: 'text-grey-800',
  grey900: 'text-grey-900',
  grey950: 'text-grey-950',
} as const;

const weightClassMap = {
  bold: 'font-bold',
  'semi-bold': 'font-semibold',
  regular: 'font-normal',
} as const;

type TextVariant = keyof typeof variantClassMap;
type TextColor = keyof typeof colorClassMap;
type TextWeight = keyof typeof weightClassMap;

type TextOwnProps<Element extends ElementType = ElementType> = {
  children: ReactNode;
  /** Controls the font size. Defaults to `m` (16px). */
  variant?: TextVariant;
  /** Controls the text colour using the greyscale design token palette. Defaults to `grey900`. */
  color?: TextColor;
  /** Controls the font weight. Defaults to `regular`. */
  weight?: TextWeight;
  /** Renders as a different HTML element. Defaults to `span`. */
  as?: Element;
};

type TextProps<Element extends ElementType> = TextOwnProps<Element> &
  Omit<ComponentPropsWithoutRef<Element>, keyof TextOwnProps>;

/**
 * Inline text primitive with greyscale colour tokens and size variants.
 *
 * @example
 * <Text variant="s" color="grey600">Subtitle</Text>
 * <Text variant="xl" weight="bold" as="p">Heading-like paragraph</Text>
 */
export const Text = <Element extends ElementType = 'span'>({
  children,
  variant = 'm',
  color = 'grey900',
  weight = 'regular',
  as,
  ...props
}: TextProps<Element>) => {
  const Component = as || 'span';
  const variantClass = variantClassMap[variant];
  const colorClass = colorClassMap[color];
  const weightClass = weightClassMap[weight];
  return (
    <Component className={`${variantClass} ${colorClass} ${weightClass}`} {...props}>
      {children}
    </Component>
  );
};
