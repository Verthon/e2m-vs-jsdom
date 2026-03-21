Skill: Element Mapping (Raw Markup → Design System)
Trigger: Feature engineer requests a mapping for raw HTML markup received from Stitch or other external tools.

Purpose
Provide a deterministic mapping from raw HTML elements to src/ui/ components. The feature engineer consults this table during markup integration (Step 3). Ambiguous cases are flagged for manual resolution.

Static Mapping Table
Text & Typography
Raw HTMLDS ComponentImportProps mappingNotes<h1>Headingsrc/ui/atoms/Heading/Headingas="h1" variant="heading-xl"<h2>Headingsrc/ui/atoms/Heading/Headingas="h2" variant="heading-lg"<h3>Headingsrc/ui/atoms/Heading/Headingas="h3" variant="heading-md"<h4>Headingsrc/ui/atoms/Heading/Headingas="h4" variant="heading-sm"<h5>, <h6>Headingsrc/ui/atoms/Heading/Headingas="h5"/"h6" variant="heading-xs"<p>Textsrc/ui/atoms/Text/Textas="p" variant="m"Default. Adjust variant by font-size context.<span> (body text)Textsrc/ui/atoms/Text/Textvariant="m"Default element is already span.Small/caption textTextsrc/ui/atoms/Text/Textvariant="s" or variant="caption"text-sm → variant="s", text-xs → variant="caption"Large body textTextsrc/ui/atoms/Text/Textvariant="l" or variant="xl"text-lg → variant="l", text-xl → variant="xl"
Text size → variant cheat sheet
Tailwind class / raw sizeText varianttext-xs, ~13px, 0.8remcaptiontext-sm, ~14pxstext-base, 16px, 1remm (default)text-lg, ~18pxltext-xl, ~20pxxl
Text color mapping
Tailwind / raw valueText color proptext-neutral-950, #0a0a0a, Near Blackgrey950text-neutral-900, #171717grey900text-neutral-700, #404040grey700text-neutral-500, #737373, Muted Steelgrey500text-neutral-400, #a3a3a3grey400text-neutral-300grey300
Text weight mapping
Tailwind classText weight propfont-bold, font-extraboldboldfont-semibold, font-mediumsemi-boldfont-normal, font-light, (none)regular
Interactive Elements
Raw HTMLDS ComponentImportProps mappingNotes<button>Buttonsrc/ui/atoms/Button/ButtonMatch variant by visual style (see below)<a> (text link)Linksrc/ui/atoms/Link/LinkDefault, no extra props neededPlain text navigation<a> (styled as button)Buttonsrc/ui/atoms/Button/Buttoncomponent={RouterLink} to="..."When <a> has button-like styling (bg fill, padding, rounded)<a> (internal navigation)Linksrc/ui/atoms/Link/Linkcomponent={RouterLink} to="..."When it's a text link to an internal route<input>, <select>, <textarea>Field.*src/ui/organisms/Field/FieldWrap in Field.Root > Field.Label + Field.Controldisabled attribute on button——Replace with isDisabled propNever use native disabled
Button variant decision tree
Is it filled with Surgical Teal / primary color?
  → variant="primary"

Is it filled with Ash Surface / grey background?
  → variant="secondary"

Is it filled with Emergency Red?
  → variant="destructive"

Is it outlined with a border, no fill?
  → variant="outline"

Is it text-only, no border, no fill?
  → variant="ghost"

Is it styled to look like a text link?
  → variant="link"

None of the above / unclear?
  → variant="default", flag for review
Button size decision tree
Padding ~py-1 / h-8 / compact?
  → size="sm"

Padding ~py-2 / h-10 / standard?
  → size="default"

Padding ~py-3–4 / h-12+ / prominent?
  → size="lg"
Layout & Structure
Raw HTMLDS ComponentImportNotes<div> (flex/grid container)Boxsrc/ui/atoms/Box/BoxMap flex classes to props: direction, justify, align, gap, padding<div> (max-width wrapper)Containersrc/ui/atoms/Container/Container<nav>, <footer>, <header>, <main>, <section>, <article>Keep as-is—No DS equivalent. Use semantic HTML. Can wrap with Box component="nav" if flex props needed.<ul>, <ol>, <li>Keep as-is—No DS equivalent.<img>Keep as-is—No DS equivalent.
Feedback & Loading
Raw HTMLDS ComponentImportNotesPlaceholder / skeleton rectanglesSkeletonsrc/ui/atoms/Skeleton/SkeletonSet height, width, rounded to match the shapeLoading spinnersSpinnersrc/ui/atoms/Spinner/SpinnerFull-page loadingPageLoadersrc/ui/atoms/PageLoader/PageLoaderNo props needed
Avatars
Raw HTMLDS ComponentImportNotes<img> (circular profile photo)Avatar + AvatarImage + AvatarFallbacksrc/ui/atoms/Avatar/AvatarMap size by context: sm, default, lgAvatar row / stackAvatarGroupsrc/ui/atoms/Avatar/Avatar
Dialogs / Modals
Raw HTMLDS ComponentImportNotesModal / overlay patternDialog compoundsrc/ui/molecules/Dialog/DialogUse full compound: Dialog > DialogTrigger + DialogPortal > DialogOverlay + DialogContent > DialogHeader + DialogTitle + DialogDescription + DialogFooter

Ambiguity Protocol
If a raw element doesn't clearly map to one of the above:

Check if the element is purely structural → keep as semantic HTML
Check if it's a styled <div> that acts like a known component (button, card, link) → map to the behavioral equivalent
If still unclear → flag with {/*TODO: DS mapping unclear — <description of element>*/} and include in the audit report for the feature engineer to escalate

What This Skill Does NOT Cover

Creating new src/ui/ components or variants — that's a design-system-engineer task, not a mapping task
Icon mapping (Stitch icons → Lucide) — handled by the feature engineer's markup-integration skill
i18n extraction — handled by the feature engineer's markup-integration skill
Color token resolution beyond text (backgrounds, borders) — those stay as Tailwind classes mapped to design tokens by the feature engineer
