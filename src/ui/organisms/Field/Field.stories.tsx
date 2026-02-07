import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "./Field";

const meta = {
  title: "Field",
  component: Field.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "email",
    children: (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" placeholder="you@example.com" />
      </Field.Root>
    ),
  },
};

export const Required: Story = {
  args: {
    name: "email",
    children: (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" required placeholder="you@example.com" />
        <Field.Error match="valueMissing">Email is required</Field.Error>
        <Field.Error match="typeMismatch">Enter a valid email</Field.Error>
      </Field.Root>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    name: "password",
    children: (
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Field.Control type="password" required />
        <Field.Description>Must be at least 8 characters</Field.Description>
        <Field.Error />
      </Field.Root>
    ),
  },
};

export const Disabled: Story = {
  args: {
    name: "email",
    disabled: true,
    children: (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" placeholder="you@example.com" />
      </Field.Root>
    ),
  },
};

export const Invalid: Story = {
  args: {
    name: "email",
    invalid: true,
    children: (
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" />
        <Field.Error>Email already taken</Field.Error>
      </Field.Root>
    ),
  },
};

export const WithTextarea: Story = {
  args: {
    name: "bio",
    children: (
      <Field.Root>
        <Field.Label>Bio</Field.Label>
        <Field.Control render={<textarea rows={4} />} />
        <Field.Description>Tell us about yourself</Field.Description>
      </Field.Root>
    ),
  },
};
