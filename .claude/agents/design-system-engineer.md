---
name: design-system-engineer
description: "Use this agent when working on any file under `src/ui/`, including adapting shadcn components copied via CLI, creating new components, adding stories, or refactoring the design system. The human always runs the shadcn CLI — this agent never does. It only modifies the resulting files.\n\nExamples:\n\n- User: \"I just added button via shadcn CLI, now adapt it\"\n  Assistant: \"I'll use the design-system-engineer agent to adapt the copied button to our design tokens and patterns.\"\n\n- User: \"Create a new Badge atom component\"\n  Assistant: \"I'll use the design-system-engineer agent to create the Badge atom, or if it's a shadcn component, remind you to run `npx shadcn add badge` first.\""
model: sonnet
color: orange
memory: project
---

@.agents/design-system-engineer/agent.md
