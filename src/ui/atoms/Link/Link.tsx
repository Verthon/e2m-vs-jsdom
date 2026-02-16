import { type ComponentPropsWithoutRef, type ElementType } from 'react';

/**
 * Base classes for the Link component.
 * Defined outside component to avoid re-creating on every render.
 */
const BASE_LINK_CLASSES =
  'text-emerald-800 hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 rounded-sm';

type LinkOwnProps<Element extends ElementType = 'a'> = {
  component?: Element;
};

/**
 * When component is NOT provided (default anchor), standard anchor props work.
 * When component IS provided, we require 'to' prop and merge component's props.
 */
type LinkProps<Element extends ElementType = 'a'> = Element extends 'a'
  ? LinkOwnProps<Element> & Omit<ComponentPropsWithoutRef<'a'>, keyof LinkOwnProps<Element>>
  : LinkOwnProps<Element> &
      Omit<ComponentPropsWithoutRef<Element>, keyof LinkOwnProps<Element>> & {
        to: string;
      };

/**
 * Polymorphic link component.
 *
 * By default renders as an anchor element with primary brand color styling.
 * Can accept a custom component (e.g., React Router's Link) via the `component` prop.
 *
 * When using a custom component, the `to` prop becomes mandatory.
 * Children can override styling by wrapping content in components like `<Text>`.
 *
 * @example
 * ```tsx
 * // Plain anchor
 * <Link href="/about">About</Link>
 *
 * // With React Router Link
 * <Link component={RouterLink} to={routesConfig.home}>
 *   <Text weight="bold" size="lg">Brand</Text>
 * </Link>
 * ```
 */
export const Link = <Element extends ElementType = 'a'>({
  component,
  children,
  ...rest
}: LinkProps<Element>) => {
  const Component = component || 'a';

  return (
    <Component className={BASE_LINK_CLASSES} {...rest}>
      {children}
    </Component>
  );
};