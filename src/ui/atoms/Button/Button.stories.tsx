import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { Link as RouterLink } from "react-router";

import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Book appointment",
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Book appointment",
    variant: "primary",
  },
};

export const Outlined: Story = {
  args: {
    children: "Book appointment",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Book appointment",
    variant: "ghost",
  },
};

/** Disabled via aria-disabled — stays in tab order, no native disabled attr. */
export const Disabled: Story = {
  args: {
    children: "Book appointment",
    variant: "default",
    isDisabled: true,
  },
};

/** sm / default / lg side-by-side. Default (medium) is never passed explicitly.
 * sm=40px, default=48px, lg=56px */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "row", gap: "12px", alignItems: "center" }}>
      <Button size="sm" variant="default">Small</Button>
      <Button variant="default">Default</Button>
      <Button size="lg" variant="default">Large</Button>
    </div>
  ),
};

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/** Icon inherits 16px (sm), 18px (default), or 20px (lg) from the size variant. */
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "row", gap: "12px", alignItems: "center" }}>
      <Button size="sm" variant="default">
        Continue <ArrowIcon />
      </Button>
      <Button variant="default">
        Continue <ArrowIcon />
      </Button>
      <Button size="lg" variant="default">
        Continue <ArrowIcon />
      </Button>
    </div>
  ),
};

/** Renders as an `<a>` tag — use when linking to external URLs or non-SPA routes. */
export const AsAnchor: Story = {
  render: () => (
    <Button component="a" href="https://example.com" variant="primary" target="_blank" rel="noreferrer">
      External link
    </Button>
  ),
};

/** Renders as a React Router Link — use for in-app navigation. Wrapped in MemoryRouter for Storybook. */
export const AsRouterLink: Story = {
  render: () => (
    <MemoryRouter>
      <Button component={RouterLink} to="/appointments" variant="outline">
        Book appointment
      </Button>
    </MemoryRouter>
  ),
};
