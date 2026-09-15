# Interactive Profile Networks

## Goal
Upgrade the two Profile columns while preserving the existing `mt-14 grid gap-10 lg:grid-cols-2` wrapper, column proportions, section spacing, and outer padding.

## Research Interests
- Replace the 14 passive pills with a compact vertical node network inside the left column.
- Use a central rail and short connector branches to interactive interest tiles, alternating or paired where width permits and stacking clearly on small screens.
- Give every tile keyboard focus, a topic icon, restrained hover lift, and a clear selected state using existing semantic colors.
- Add a focused dialog for each interest containing:
  - interest name
  - concise summary derived only from existing portfolio research, skills, and publication content
  - curated matching publications from the existing publication list
  - year, title, venue, and DOI action when available
  - a button to close the dialog, scroll to Publications, and apply that topic as the active publication filter
- Topics without a DOI will retain the existing “DOI not listed” treatment.

## Publication Filter Link
- Lift or synchronize the Publications search state so a Profile dialog can apply its topic filter without blocking navigation.
- On “View filtered publications,” set the Publications category to All, reset the year, apply a verified search term or curated topic mapping, update the URL hash to `#publications`, and smooth-scroll to the section.
- Ensure the resulting list matches the publications shown in the dialog and remains editable through the existing search controls.

## Research Leadership
- Replace the plain bullet list with a vertical infographic rail and seven connected milestone cards.
- Keep all existing verified leadership statements, reorganized into concise role labels, descriptions, and badges.
- Assign relevant icons for consortium leadership, Eurostars/Eureka collaboration, principal investigator grants, SDU testbeds, thesis supervision, examination, and grant strategy.
- Use badges including existing names and counts such as `SAFEMARVEL · SDU · Dacoma`, `AMCOSTAR · Eurostars`, `Fabrikant Mads Clausen Fond`, and `12 Theses Supervised`.
- Keep the rail readable and balanced beside the interest network at desktop widths, with a clean single-column flow on smaller screens.

## Styling and Accessibility
- Reuse the existing Button and Dialog components and semantic design tokens.
- Add only focused Profile-network styles where utility classes are insufficient.
- Preserve light and dark mode contrast, visible keyboard focus, descriptive labels, Escape and backdrop dialog closing, and responsive text containment.
- Do not add em dashes to labels, copy, or code comments.

## Validation
- Run the TypeScript check.
- Verify desktop, laptop, tablet, and mobile layouts in the live preview.
- Test every interest tile, dialog close method, DOI link, filtered Publications jump, and leadership rail.
- Confirm the outer Profile grid and section spacing remain unchanged, with no overflow or console errors.
