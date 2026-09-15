# Dr. Shouvik Chaudhuri - Academic Digital Portfolio

An interactive, responsive academic portfolio and curriculum vitae for **Dr. Shouvik Chaudhuri, PhD** (Researcher in Nonlinear Dynamics & Control, with a specialization in electrohydraulic, robotic, and maritime systems).

## Overview

This digital portfolio features:

- **Two-Panel Academic Layout:** Personal sidebar with high-resolution portrait, verified academic badges (ORCID, Google Scholar, Scopus, Web of Science, IEEE, LinkedIn), and direct CV downloads.
- **Dynamic Google Scholar Metrics:** Automated sync of citations, h-index, and publication counts.
- **Interlocking Research Pillars:** Interactive 2-1-2 hexagonal honeycomb showcasing research domains, methodologies, key milestones, and linked publications.
- **Categorized Publications:** Comprehensive list of journal articles, conferences, book chapters, and theses with clickable DOIs and embedded experimental video demonstrations.
- **Career Moments Gallery:** Masonry jigsaw gallery featuring lab milestones, student supervisions, and international collaborations, equipped with an uncropped full-screen lightbox, photo pinning, and a private admin edit mode.
- **Teaching & Supervision:** Course links, student supervision records, and verified teaching credentials.
- **Core Competencies:** Technical engineering proficiencies alongside CEFR-scaled language dials with official certificates.

---

## Tech Stack & Architecture

- **Framework:** [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Routing:** [TanStack Router](https://tanstack.com/router) (file-based)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend & Integrations:** Lovable Cloud (database, auth, storage) powering the scheduled Scholar metrics sync

---

## Repository Structure

```text
├── public/                 # Static web assets, favicons, PWA manifest
├── src/
│   ├── assets/             # CDN asset pointers (photos, certificates, logos, documents)
│   ├── components/         # UI components (shadcn/ui, dialogs, pillar graphics)
│   ├── integrations/       # Backend client and auth configuration
│   ├── lib/                # Portfolio data, utility helpers, and error tracking
│   ├── routes/
│   │   ├── index.tsx       # Main portfolio application page
│   │   └── api/            # Server endpoints (Scholar metrics sync hook)
│   ├── styles.css          # Global styling, honeycomb geometry, animations
│   ├── router.tsx          # Application routing setup
│   └── start.ts            # Entrypoint
├── supabase/
│   └── config.toml         # Backend project configuration
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build and plugin configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended) or Bun / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/svkchaudhuri/digital-portfolio.git
   cd digital-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser to view the site.

4. Build for production:
   ```bash
   npm run build
   ```

---

## Built with Lovable

This project was built with [Lovable](https://lovable.dev) and stays in two-way sync with GitHub: changes made in Lovable are committed straight to this repository, and commits pushed here sync back into Lovable.

---

## License & Contact

Copyright © 2026 Dr. Shouvik Chaudhuri. All rights reserved.
For academic inquiries and collaboration, reach out via [LinkedIn](https://www.linkedin.com/in/shouvik-chaudhuri-phd/).
