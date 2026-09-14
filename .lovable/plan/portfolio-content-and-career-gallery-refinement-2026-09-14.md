# Portfolio Content and Career Gallery Refinement

## Scope
- Rebuild the Teaching section into three clear levels: course teaching, Student Supervision, and Examination & Assessment.
- Shorten and responsively size all main section headings so they remain on one line on desktop.
- Update the home research-focus label to “Safety-critical Control (CLF-CBF-QP)”.
- Add a Career Moments section with a responsive bento layout using the available SDU Sønderborg, Vidyasagar Setu, and portrait imagery, plus structured placeholders for future testbed and laboratory photographs.

## Implementation
- Extend the section navigation and active-section tracking with Career Moments.
- Keep gallery entries in a small data structure so future images and captions can be added cleanly.
- Use the existing semantic colors, typography, borders, and image assets; preserve mobile stacking and accessibility.
- Verify desktop heading wrapping, teaching hierarchy, gallery layout, navigation, and mobile behavior in the live preview.

## Technical details
- Update `src/routes/index.tsx` for content, section ordering, and gallery markup.
- Update `src/styles.css` only for responsive section-heading sizing and desktop no-wrap behavior.
