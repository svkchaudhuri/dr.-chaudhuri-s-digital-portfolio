# Browser and Home-Screen Icon Update

## Scope
- Use the supplied `apple-touch-icon.png` artwork as the source for the site icon set.
- Create correctly sized square PNG variants for Apple touch, standard favicons, and installable home-screen icons, padding the original artwork rather than stretching it.
- Replace the default browser favicon with the new mark.
- Add a web app manifest for installable home-screen metadata only. No offline caching or service worker will be added.

## Implementation
- Generate optimized files under `public/` for 16px, 32px, 180px, 192px, and 512px use cases.
- Add `public/manifest.webmanifest` with the portfolio name, standalone display mode, theme colors, and 192px and 512px icons.
- Update the TanStack root document metadata with favicon, Apple touch icon, manifest, and theme-color links. This project has no standalone `index.html`, so its root document head is the correct equivalent.
- Remove the old default `public/favicon.ico` after the new favicon references are active.

## Validation
- Confirm the icon, manifest, and metadata URLs return successfully in the live preview.
- Verify the rendered document head contains the expected icon and manifest tags.
- Confirm the manifest references valid image dimensions and the page has no browser errors.
