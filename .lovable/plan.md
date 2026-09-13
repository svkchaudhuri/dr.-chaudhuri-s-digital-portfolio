# Dr. Shouvik Chaudhuri Digital Resume

## Overview
Build the portfolio as a polished, single-page academic resume with a persistent profile panel on desktop and a compact drawer on phones. The content will be taken from the supplied master CV, with the attached headshot and PDF used directly.

## Visual direction
- Use a clean editorial-academic style with deep teal navigation accents, warm white content surfaces, charcoal typography, and restrained gold highlights for distinctions and metrics.
- Keep the two-panel composition: a fixed-width sticky profile/navigation panel and a spacious scrolling content panel.
- Match the supplied navigation reference with compact line icons, generous vertical spacing, and a filled deep-teal active item.
- Use a confident serif display face for section titles and a highly readable sans-serif for body copy and data.
- Add restrained motion only for navigation state changes, drawer transitions, and interactive filters; respect reduced-motion preferences.

## Page structure
1. **Sidebar / mobile drawer**
   - Headshot, full name, credentials, current research title, email, phone, and stated Kolkata / SDU Denmark location.
   - Direct icon links for ORCID, Web of Science / ResearcherID, Google Scholar, Scopus, LinkedIn, IEEE membership, and email.
   - Navigation for Home, Profile, Research, Experience, Funding, Education, Publications, Teaching, Skills, Service, Downloads, and Contact.
   - Prominent CV download control using the supplied PDF.
   - On mobile, replace the sidebar with a compact top bar and accessible slide-out drawer that closes after navigation.

2. **Home**
   - Executive research summary adapted faithfully from the CV.
   - Bibliometric highlights: h-index 7, 170 Google Scholar citations, 122 Web of Science citations, and 28 publications.
   - Three core specialisation statements for nonlinear/adaptive control, safety-critical control with CBF-QP, and maritime/electrohydraulic systems.

3. **Profile and Research**
   - Preserve the full research profile narrative.
   - Present five research pillars: Dynamics & Control; Electrohydraulics & Stewart Platforms; Marine Roll Stabilisation / SAFEMARVEL & AMCOSTAR; Energy Systems; Engineering–Biology Interface.
   - Include the five key achievements from the CV as concise evidence points.

4. **Experience and Funding**
   - Timeline for SDU postdoctoral work, TU Ilmenau secondment, Jadavpur University research fellowship, and BARC Masters GATE fellowship.
   - Nested project details for SAFEMARVEL, AMCOSTAR, CARS, and DARO, retaining exact sponsors, roles, dates, consortium details, and outcomes.
   - Separate funded grants, travel support, and submitted/proposed work with exact amounts and statuses.

5. **Education**
   - Ph.D., M.E., B.Tech, Class XII, and Class X entries with exact dates, institutions, grades, EQF levels, thesis titles, supervisors, and subject areas.
   - Include the three dissertation summaries without duplicating long text unnecessarily.

6. **Publications explorer**
   - Tabs with source counts: All (28), Journals (14), Conference Proceedings (11), Book (1), Book Chapters (2).
   - Search across title, author, venue, keyword, DOI, and year, plus a year selector and a clear-filter action.
   - Reverse-chronological entries with full verbatim citations, visibly highlighted “S. Chaudhuri,” venue, year, category, and DOI button.
   - Use the exact DOI URL for every source entry that provides one. Four CV entries have no DOI listed; they will show a clear “DOI not listed” status rather than a fabricated link.
   - Show useful empty results and result counts without changing the underlying publication data.

7. **Teaching and Supervision**
   - SDU lecturer/co-lecturer courses XCOS, EXT, SPRO4ME, and CoE1 with level, ECTS, teaching periods, role, and descriptions.
   - Teaching-assistant and examination duties.
   - All six Master’s and six Bachelor’s projects, including student names and years.

8. **Skills, Service, Downloads, and Contact**
   - Technical capabilities grouped exactly as control, modelling, application domains, real-time implementation, actuation/drives, and tools.
   - Memberships, 55 verified reviews across the listed journals/conference, awards, and languages.
   - Download section for the supplied master CV and a concise contact area with direct email and profile links.

## Interaction and accessibility
- Scroll navigation will update the active sidebar item as sections enter view and support direct section links.
- Keyboard-accessible tabs, filters, external links, download control, and mobile drawer.
- Clear focus states, semantic headings, descriptive image text, adequate contrast, and comfortable reading widths.
- Responsive checks at desktop and phone sizes, including long citation wrapping and no clipped navigation text.

## Technical details
- Implement the page at `/` in React with focused data and presentation modules, using the existing TanStack setup.
- Store the supplied headshot and CV as project CDN assets and import their generated asset pointers.
- Keep all colors, typography, shadows, and radii in the existing semantic token system.
- Use lightweight client state for publication filters and active-section tracking; no account or database is needed.
- Add unique page metadata for Dr. Shouvik Chaudhuri’s academic portfolio.
- Verify the complete publication dataset, every external link, CV download, desktop layout, mobile drawer, filtering, and search in the live preview.

## Acceptance criteria
- The placeholder page is fully replaced by the requested portfolio.
- All 28 publications and all CV sections requested above are present and searchable.
- The attached headshot displays crisply and the attached PDF downloads successfully.
- Desktop uses the sticky two-panel layout; phone navigation remains fully usable through a drawer.
- No content, dates, counts, funding amounts, affiliations, citations, or DOI URLs are invented.
