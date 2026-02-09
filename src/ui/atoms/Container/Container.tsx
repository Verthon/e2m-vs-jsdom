import { type ComponentPropsWithoutRef, type ElementType } from "react";

type ContainerOwnProps<Element extends ElementType = "div"> = {
  component?: Element;
};

type ContainerProps<Element extends ElementType = "div"> = ContainerOwnProps<Element> &
  Omit<ComponentPropsWithoutRef<Element>, keyof ContainerOwnProps<Element>>;

const CONTAINER_CLASSES = "container mx-auto px-4 sm:px-6 lg:px-8";

/**
 * Container component that centers content with responsive padding.
 *
 * Uses Tailwind's container class to constrain max-width and centers content
 * horizontally. Includes responsive horizontal padding.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Welcome</h1>
 * </Container>
 * ```
 *
 * @example Polymorphic usage
 * ```tsx
 * <Container component="main">
 *   <h1>Main Content</h1>
 * </Container>
 * ```
 *
 * Accessibility: This is a layout primitive with no interactive elements.
 * Ensure content within has proper semantic structure.
 */
export const Container = <Element extends ElementType = "div">({
  component,
  children,
}: ContainerProps<Element>) => {
  const Component = component || "div";

  return (
    <Component className={CONTAINER_CLASSES}>
      {children}
    </Component>
  );
};
