# Research to Experience Spacing Refinement

## Changes
- Keep the existing 2-1-2 honeycomb geometry, tile dimensions, and 14px facet gaps unchanged.
- Confirm the desktop honeycomb container ends exactly at the bottom edge of Pillars 4 and 5, and correct only any measurable excess in its calculated height.
- Add section-specific spacing support so Research uses a reduced bottom padding and Experience uses a reduced top padding, while all other sections retain their current spacing.
- Use compact but comfortable mobile spacing so the stacked tiles still have clear separation before Experience begins.
- Preserve the muted Research background and make its transition into the Experience section visually deliberate and balanced.

## Technical details
- Extend the shared Section wrapper with an optional class override, then apply responsive bottom padding to Research and top padding to Experience.
- Retain the current CSS custom-property calculations for hexagon width, height, row step, and positioning unless viewport measurements reveal a real container-height mismatch.
- Avoid negative margins or geometry changes that could disturb the honeycomb mesh.

## Validation
- Measure the honeycomb container and final-row bounds at desktop, tablet, and mobile widths.
- Confirm no trailing internal dead space, overlap, horizontal overflow, or changed 14px facet spacing.
- Visually verify the Research-to-Experience transition and check for console or type errors.
