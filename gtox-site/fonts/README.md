# Optional: the licensed "Size" font for the GTOX wordmark

Headings no longer need a licensed font — they use EB Garamond, a free
Google Font loaded automatically from `index.html` / `journal.html`.

The only licensed font the site still looks for is **Size (Semibold)**, used
for the "GTOX" lettering in the header. Until you add it, the wordmark uses
the free Space Grotesk, so nothing looks broken.

If you buy a **webfont license** for Size on MyFonts, drop the files here as:

- `Size-Semibold.woff2` (and `Size-Semibold.woff` if provided)

`styles.css` already points to those exact names; refresh and the real font
takes over. No other changes needed.
