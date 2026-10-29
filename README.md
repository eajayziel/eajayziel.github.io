# Executive Assistant Portfolio

A responsive, static portfolio website for an aspiring Executive Assistant. Plain HTML, CSS and vanilla JavaScript. There is no build step, no backend and no dependencies, so it runs on GitHub Pages as is.

## What's inside

```
executive-assistant-portfolio/
├── index.html                      Homepage (all sections)
├── style.css                       All styles
├── script.js                       Interactions + your editable site settings
├── .nojekyll                       Tells GitHub Pages to serve files as is
├── assets/
│   ├── images/hero-bg.svg          Hero background (replaceable)
│   ├── images/portrait-hero.png    Hero photo (included)
│   ├── images/portrait-circle.png  About-circle photo (included)
│   ├── icons/favicon.svg
│   ├── icons/tools/                Your monochrome tool icons (add these)
│   └── videos/                     Put your intro video here if self-hosting
├── projects/
│   ├── executive-command-center.html
│   ├── meeting-to-action-system.html
│   └── client-onboarding-sop.html
└── README.md
```

## Add your real details

Open `script.js`. The settings are at the top:

```js
const SITE = {
  email: "",
  linkedin: "",
  cv: "",
  videoUrl: ""
};
```

| Setting    | What to enter                                                                                  |
|------------|------------------------------------------------------------------------------------------------|
| `email`    | Your email address. Creates a `mailto:` link.                                                  |
| `linkedin` | Full profile URL, e.g. `https://www.linkedin.com/in/your-profile`                              |
| `cv`       | A file path such as `assets/cv.pdf` (save the PDF there), or a full `https://` link            |
| `videoUrl` | A YouTube or Vimeo link, or a self-hosted file such as `assets/videos/intro.mp4`               |

While a setting is empty, the site shows a clearly labelled placeholder instead of a broken link. The "View My CV" buttons scroll to the Contact section until `cv` is set.

## Portraits (transparent PNGs)

Two photos are used, both already optimized and included in this update:

- `assets/images/portrait-hero.png`: the white-outfit photo in the hero.
- `assets/images/portrait-circle.png`: the blue-blazer photo in the "Experience at a Glance" circle.

To swap either one later, upload a new transparent PNG with the same file name. Until a file exists, a placeholder is shown.

## Tool icons

All 23 monochrome (navy) icons are included in **`assets/icons/tools/`**. They work as they are. To use your own versions, upload an SVG with the same file name and it replaces mine. If an icon file is ever missing, the tool's name shows instead.

Sources: Simple Icons (CC0) for most brands, plus Font Awesome (CC BY 4.0), Devicons and react-icons for the rest. The Microsoft Word, Excel and PowerPoint icons are generic file-type icons (letters W, X, P), the PDF icon is a generic PDF file, and the **GoHighLevel** icon is a simple placeholder glyph I drew, because no official mark was available. All brand names and logos belong to their owners.

Icons display at 30px tall in the scrolling strip and 22px on the project cards. The "Show all tools" button lists every tool by category with its name, so nothing is cut off. Visitors who prefer reduced motion see this view automatically.

## "Watch demo" buttons

Until your demo videos exist, the buttons open each project page. When a video is ready, tell me (or point the button's `href` at the video) and add its length to the label, for example "Watch 38 sec demo".

## Other things to replace

- **Hero background video (looping):** save your video as `assets/videos/hero-bg.mp4` (H.264). Optionally add a `hero-bg.webm` version too; browsers pick the first one they can play. It plays muted and loops automatically. Tips: keep it under about 8 MB, 10 to 20 seconds, 1920×1080 or smaller, no audio track, and a dark or low-contrast clip so the white headline stays readable. The old background image shows while the video loads, if the file is missing, and for visitors who have reduced motion turned on. The video pauses when scrolled out of view.
- **Project downloads:** each project page lists deliverables marked "Link to be added". When your files are ready, put them in `assets/downloads/` and replace the status label with a link such as `<a href="../assets/downloads/your-file.xlsx">`.

## Preview locally

Open `index.html` in a browser. For a closer match to the live site, run a tiny local server from the project folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a free account at github.com if you don't have one.
2. Click **New repository**. Name it, for example, `executive-assistant-portfolio`. Keep it **Public** (required for free GitHub Pages) and click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Drag in the **contents** of this folder (`index.html`, `style.css`, `script.js`, `.nojekyll`, `README.md`, and the `assets` and `projects` folders). `index.html` must sit at the top level of the repository, not inside another folder.
5. Click **Commit changes**.
6. Go to **Settings → Pages**.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Choose branch **main** and folder **/ (root)**, then click **Save**.
8. Wait one to two minutes and refresh. Your site will be live at:
   `https://YOUR-USERNAME.github.io/executive-assistant-portfolio/`

To update the site later, edit or re-upload the files on GitHub. The site republishes automatically.

### Notes on paths

Every link and asset uses a relative path (for example `assets/images/hero-bg.svg` and `../style.css`), so the site works from a repository sub-path like `/executive-assistant-portfolio/`. Don't change them to start with `/`.

## Honesty notes

- The three featured projects are labelled as self-directed, fictional scenario-based demonstrations.
- The "expected impact" sections describe intended benefits, not measured results.
- There are no testimonials, client names or performance statistics. Please keep it that way unless you have real, permissioned ones.

## Fonts

Fraunces and Instrument Sans are loaded from Google Fonts (open-source, free). If offline, the site falls back to Georgia and system sans-serif fonts.
