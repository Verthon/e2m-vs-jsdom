Product: B2C AI-Driven Medical Platform
Vibe: Satiric Healthcare — Clinical sterility meets dark humor. The UI presents itself with deadpan seriousness: pristine white surfaces, surgical precision in spacing, and a teal accent that reads like hospital scrubs. AI-generated content is always visibly contained and labeled, as if quarantined. The satire lives in microcopy, not in the visual system itself — the design stays clinical so the humor lands harder.

1. Visual Theme & Atmosphere
A hyper-clean, almost sterile light interface with maximum information clarity. The atmosphere evokes a modern private clinic: white walls, precise instruments, zero decoration. Every element earns its place. High information density is achieved through disciplined whitespace rather than cramming — think medical chart, not cluttered dashboard.
The visual hierarchy is strict and deliberate. Color is used sparingly — almost everything is greyscale, with a single deep teal accent reserved exclusively for the most important interactive element on any given screen. Shadows are absent. Depth is communicated through subtle background shifts and precise 1px borders.
Accessibility is non-negotiable: WCAG AAA compliance with a minimum 7:1 contrast ratio on all text. This isn't just a guideline — it's a hard constraint that shapes every color decision.
2. Color Palette & Roles
Surgical Teal (#006045) — The singular accent color. Used only for primary call-to-action buttons, active states, focus rings, and the most critical interactive elements. Applied sparingly — if everything is teal, nothing is.
Deep Teal (#004f35) — Hover and pressed state for primary actions. Noticeably darker than Surgical Teal to provide clear tactile feedback.
Teal Ghost (#006045 at 10% opacity) — A barely-there teal wash used for Pro-tier container fills and subtle active-state backgrounds. Visible but not loud.
Mint Foam (#d0fae5) — Text color used on top of Surgical Teal backgrounds. Light, high-contrast foreground for buttons and badges.
Clinical White (#ffffff) — The dominant surface color. Backgrounds, cards, popovers. The canvas is always white.
Near Black (#0a0a0a) — Primary text color. Headlines, body copy, labels. Maximum contrast against white.
Charcoal (#171717) — Secondary text emphasis. Used where Near Black would be redundant but grey would be too weak.
Muted Steel (#737373) — De-emphasized text: timestamps, helper text, placeholder content, inactive labels.
Hairline Grey (#e5e5e5) — Borders and input strokes. Visible enough to define boundaries, quiet enough to disappear when you're not looking for them.
Ash Surface (#f5f5f5) — Secondary surface fills. Used for secondary buttons, muted containers, and alternating row backgrounds.
Bone White (#fafafa) — AI quarantine container background. The lightest possible deviation from white, used exclusively for AI-generated content cards.
Emergency Red (#e7000b) — Destructive actions, validation errors, critical alerts. High-saturation, no ambiguity. Used with a light red background tint for error states.
Clinical Greyscale Ramp
A 10-step neutral ramp with a very faint warm undertone, progressing from near-white to near-black. Used for all non-accent UI elements:

Bone White (#fafafa) → barely off-white surfaces
Soft Linen (#f5f4f4) → subtle card differentiation
Pale Ash (#e7e3e4) → disabled state backgrounds
Warm Mist (#d8d3d4) → divider lines, decorative borders
Pewter (#a99c9f) → disabled text, placeholder icons
Slate (#7b6e72) → secondary body text alternative
Graphite (#5c4f53) → medium-emphasis labels
Charcoal Stone (#463d3f) → strong secondary text
Dark Ember (#2a2627) → high-emphasis on dark surfaces
Ink (#1b1718) → near-maximum contrast text
Void (#0b0809) → reserved for extreme contrast needs

1. Typography Rules
Font Family: Inter — the entire interface uses a single typeface. No serif, no display font, no exceptions. Fallback chain: "Inter", "Helvetica Neue", "Arial", sans-serif.
Scale: Major Third ratio (1.25×) from a 16px base. Each step up multiplies by 1.25. This produces a tight, professional hierarchy that doesn't shout.

H1 (2.441rem / ~39px) — Page titles only. Semi-bold (600). One per screen.
H2 (1.953rem / ~31px) — Section headers. Semi-bold (600). Tight letter-spacing (-0.01em).
H3 (1.563rem / ~25px) — Subsection headers, card titles. Medium (500).
H4 (1.25rem / ~20px) — Component group labels, sidebar navigation headers. Medium (500).
Body (1rem / 16px) — Default reading text. Regular (400). Line-height 1.5 for readability.
Small (0.8rem / ~13px) — Captions, footnotes, legal disclaimers, AI attribution labels. Regular (400).

All headings use tight leading (1.2). Body text gets generous leading (1.5). No heading ever appears without a minimum 1.5rem gap above it.
4. Component Stylings
Buttons: Gently rounded corners (0.625rem / 10px radius). Primary buttons use a solid Surgical Teal fill with Mint Foam text — they are the loudest element on any screen. Secondary buttons use Ash Surface fill with Charcoal text. Destructive buttons use Emergency Red fill with white text. Ghost buttons are borderless with Teal Ghost background on hover. All buttons have a 2px focus ring in Surgical Teal with a 2px offset.
Cards & Containers: Matching 0.625rem rounded corners. No box-shadow — ever. Differentiation comes from a 1px Hairline Grey border and background color shifts. Standard cards sit on Clinical White. Elevated cards use Bone White. All cards maintain consistent internal padding at 1.5rem.
AI Quarantine Containers: All AI-generated text is housed in a Bone White (#fafafa) card with a 1px Hairline Grey border. A small mono-styled label ("AI Generated" or similar) with a Bot icon sits at the top-left corner. This container is visually distinct from user-authored content — the quarantine is the joke, but it also builds trust.
Inputs & Forms: 1px Hairline Grey border, Clinical White background, 0.625rem radius. On focus, the border transitions to Surgical Teal and a subtle focus ring appears. Placeholder text uses Muted Steel. Error states replace the border with Emergency Red.
Tier Visual Distinction:

Tier 1 (Basic): Default styling. Standard Hairline Grey borders, Clinical White backgrounds. Clean, functional, no frills.
Tier 2 (Pro): Containers receive a Teal Ghost background fill — a subtle 10% teal wash that signals upgraded status without screaming.
Tier 3 (Elite): High-contrast 2px Surgical Teal borders with a faint inner teal glow. The most visually elevated tier, but still restrained — premium, not gaudy.

1. Layout Principles
Grid: Strict 8-point system. Every dimension — padding, margin, gap, height — resolves to a multiple of 0.5rem (8px). No exceptions, no "close enough."
Spacing tokens: 0.5rem (8px), 1rem (16px), 1.5rem (24px), 2rem (32px), 3rem (48px). These are the only allowed spacing values.
Radius tokens:

Large: 0.625rem (10px) — cards, modals, buttons
Medium: ~8px — inner elements, chips, tags
Small: ~6px — tiny badges, toggles

Density: High information density with breathing room. Content sections use 2rem–3rem vertical gaps. Related items within a section use 0.5rem–1rem gaps. The overall impression should be "organized clinical chart" not "sparse landing page."
Responsive: Mobile-first. Content reflows but spacing tokens remain constant across breakpoints. Cards stack vertically on mobile, grid on desktop.
6. Iconography
Lucide React icons exclusively. No inline SVGs, no icon fonts, no custom icons.
Standard size: 20px (1.25rem). Icons inherit text color by default, accent color for interactive elements.
Medical context icons: Stethoscope, Activity, HeartPulse, Thermometer.
AI/Satiric context icons: Bot, Sparkles, Cpu, BrainCircuit.
Navigation icons: ChevronRight, Menu, X, Search.
Do's and Don'ts

7. Photography & Imagery
Mandatory: Editorial / documentary-style photography only. All human imagery must look like it was shot by a photojournalist in a real clinic — not generated by AI. This means: natural skin texture with pores and imperfections, asymmetric facial features, uneven lighting, candid poses, visible environmental context (exam rooms, waiting areas, hallways with scuff marks).
Explicitly banned: AI-generated faces and bodies (the telltale signs: porcelain skin, perfect symmetry, plastic hair, glowing backlight, sterile-but-nowhere environments). Also banned: generic stock photography with forced smiles, handshakes, or stethoscope-as-prop poses. If the image looks like it came from a "diverse team of doctors smiling" search, it's wrong.
The look we want: Think editorial health journalism — real patients in real settings, slightly desaturated color grading, shallow depth of field. Faces should have character. Environments should have wear. The clinical sterility of the UI contrasts with the human warmth of the photography — that tension is intentional.
Placeholder guidance: When generating mockup screens, use grayscale photo placeholders with a subtle Surgical Teal (#006045) overlay at 5% opacity to maintain brand presence. Never use colored illustration or cartoon-style placeholders.
Do's and Don'ts

Do keep the primary teal for exactly one action per screen section — the one thing you most want the user to do.
Do maintain the AI quarantine pattern for every piece of AI-generated content, no matter how small.
Do use the greyscale ramp for everything that isn't the primary action — the interface should read as mostly monochrome with teal punctuation.
Do use only editorial, documentary-style photography of real humans. Never use AI-generated people or generic stock photos.
Don't introduce shadows, gradients, or decorative elements. The sterility is the point.
Don't mix corner radii within the same visual plane — all siblings share the same radius.
Don't use teal for informational or passive elements. Teal means "do something."
Don't drop below 7:1 contrast ratio for any text, including small/muted text. WCAG AAA is a hard floor.
Don't use any icon library other than Lucide React.
Don't use AI-generated imagery for any human depiction. No exceptions.
