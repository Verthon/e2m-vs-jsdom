import { type ComponentPropsWithoutRef, type ElementType } from "react";

type PaddingValue = 2 | 4 | 6 | 12;
type ResponsivePadding = PaddingValue | [PaddingValue, PaddingValue, PaddingValue];

type GapValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type FlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
type FlexAlign = "start" | "end" | "center" | "baseline" | "stretch";
type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";

type BoxOwnProps<T extends ElementType = "div"> = {
  component?: T;
  padding?: ResponsivePadding;
  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  wrap?: FlexWrap;
  gap?: GapValue;
};

type BoxProps<T extends ElementType = "div"> = BoxOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BoxOwnProps<T>>;

const directionMap: Record<FlexDirection, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  column: "flex-col",
  "column-reverse": "flex-col-reverse",
};

const justifyMap: Record<FlexJustify, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignMap: Record<FlexAlign, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const wrapMap: Record<FlexWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
};

const gapMap: Record<GapValue, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
};

const getPaddingClasses = (padding: ResponsivePadding | undefined): string => {
  if (!padding) return "";

  if (Array.isArray(padding)) {
    const [mobile, tablet, desktop] = padding;
    return `p-${mobile} md:p-${tablet} lg:p-${desktop}`;
  }

  return `p-${padding}`;
};

/**
 * Polymorphic flex container with responsive padding and alignment controls.
 * @param gap - Spacing between flex items using Tailwind's spacing scale (0-24)
 */
export const Box = <T extends ElementType = "div">({
  component,
  padding,
  direction = "row",
  justify = "start",
  align,
  wrap,
  gap,
  children,
}: BoxProps<T>) => {
  const Component = component || "div";

  const classes = [
    "flex",
    directionMap[direction],
    justifyMap[justify],
    align && alignMap[align],
    wrap && wrapMap[wrap],
    gap ? gapMap[gap] : "",
    getPaddingClasses(padding),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};
