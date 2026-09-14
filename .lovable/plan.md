# Research Pillars Honeycomb Spacing Fix

## Changes
- Replace the three independently offset rows with one desktop honeycomb layout driven by shared size and gap variables.
- Preserve the true pointy-top polygon and enforce its regular geometric ratio using a single card width calculation.
- Position the centered tile and lower pair from the same calculated hexagon height, leaving a consistent 12–16 px gap between neighboring facets without overlap.
- Keep the existing single-column mobile layout and comfortable vertical spacing.
- Leave all tile content, illustrations, click behavior, dialogs, descriptions, methodologies, keywords, applications, tools, and publication links unchanged.

## Technical details
- Use CSS custom properties for hexagon width, derived height, and mesh gap so tablet and desktop sizes scale together.
- Use a dedicated desktop grid with explicit tile coordinates rather than fixed negative rem margins.
- Keep the current pointy polygon on both the border shell and inner face.

## Validation
- Check desktop, tablet, and mobile widths for true aspect ratio, distinct outlines, uniform gaps, no overlap, and no horizontal overflow.
- Recheck all five tile dialogs and confirm no console or type errors.
