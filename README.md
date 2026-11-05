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
│   ├── images/hero-bg.svg          Used by the Introduction video thumbnail and project page headers
│   ├── images/portrait-hero.png    Hero photo (included)
│   ├── images/portrait-circle.png  About-circle photo (included)
│   ├── icons/favicon.svg
│   ├── icons/tools/                Your monochrome tool icons (add these)
│   ├── workflows/                  One folder of screenshots per project (see below)
│   └── walkthroughs/               Optional: self-hosted walkthrough videos
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
  demos: { ... }
};
```

| Setting    | What to enter                                                                                  |
|------------|------------------------------------------------------------------------------------------------|
| `email`    | Your email address. Creates a `mailto:` link.                                                  |
| `linkedin` | Full profile URL, e.g. `https://www.linkedin.com/in/your-profile`                              |
| `cv`       | A file path such as `assets/cv.pdf` (save the PDF there), or a full `https://` link            |
| `demos` | Walkthrough link for each Workflows card (see "Workflows in Action" below). |

While a setting is empty, the site shows a clearly labelled placeholder instead of a broken link. The "View My CV" buttons scroll to the Contact section until `cv` is set.

## Portraits (transparent PNGs)

Two photos are used, both already optimized and included in this update:

- `assets/images/portrait-hero.png`: the white-outfit photo in the hero. It fades out at the bottom, so a photo cropped at the hips or knees works best.
- `assets/images/portrait-circle.png`: the blue-blazer photo in the "Experience at a Glance" circle.

To swap either one later, upload a new transparent PNG with the same file name. Until a file exists, a placeholder is shown.

## Tool icons

All 23 monochrome (navy) icons are included in **`assets/icons/tools/`**. They work as they are. To use your own versions, upload an SVG with the same file name and it replaces mine. If an icon file is ever missing, the tool's name shows instead.

Sources: Simple Icons (CC0) for most brands, plus Font Awesome (CC BY 4.0), Devicons and react-icons for the rest. The Microsoft Word, Excel and PowerPoint icons are generic file-type icons (letters W, X, P), the PDF icon is a generic PDF file, and the **GoHighLevel** icon is a simple placeholder glyph I drew, because no official mark was available. All brand names and logos belong to their owners.

**Icons not showing?** The page looks for each file at exactly `assets/icons/tools/<name>.svg`, all lowercase with hyphens (GitHub Pages is case-sensitive). The 23 names are: `microsoft-word`, `google-docs`, `microsoft-excel`, `microsoft-powerpoint`, `google-sheets`, `google-slides`, `google-drive`, `gmail`, `google-meet`, `zoom`, `slack`, `calendly`, `google-calendar`, `notion`, `chatgpt`, `claude`, `gohighlevel`, `make`, `canva`, `adobe-photoshop`, `google-search`, `google-forms`, `pdf`. To check one, open `https://YOUR-USERNAME.github.io/assets/icons/tools/slack.svg` in a browser; if it shows a 404, the file is in the wrong folder or has a different name. The site also looks in the neighbouring folders and a few common spellings, and prints a message in the browser console (right-click, Inspect, Console) naming any icon it could not find.

Icons display at 30px tall in the scrolling strip and 22px on the project cards. The "Show all tools" button lists every tool by category with its name, so nothing is cut off. Visitors who prefer reduced motion see this view automatically.

## Workflows in Action: screenshots and walkthroughs

**Screenshots.** Each project has its own folder in `assets/workflows/`. Save your screenshots there with these exact names (all lowercase, `.png`; `.jpg`, `.jpeg` and `.webp` also work):

`assets/workflows/executive-command-center/`
- `01-executive-overview.png`
- `02-task-tracker.png`
- `03-guide-and-qa.png`

`assets/workflows/meeting-to-action-system/`
- `01-executive-overview-kpis.png`
- `02-executive-overview-deadlines.png`
- `03-action-tracker.png`
- `04-guide-and-qa-page-1.png`
- `05-guide-and-qa-page-2.png`

`assets/workflows/client-onboarding-sop/`
- `01-sop-procedure-steps-1-4.png`
- `02-sop-procedure-steps-5-6.png`
- `03-sop-procedure-steps-7-9.png`
- `04-sop-process-checklist-a-f.png`
- `05-process-checklist-f.png`
- `06-case-study-overview.png`

The first screenshot found becomes the card's cover image, and the card shows "View N screenshots". Clicking opens a viewer with arrows, thumbnails, captions and an "Open full size" link. You can upload only some of them: missing files are simply skipped, and until a project has any screenshot, its drawn "Illustrative preview" stays.

To rename a screenshot, change its caption, or add or remove one, edit the `WORKFLOW_SHOTS` list at the top of `script.js`. Each line is `["file-name-without-extension", "Caption shown in the viewer"]`. Tips: landscape or portrait both work, 1600 px wide is plenty, keep each under about 500 KB, and blur or crop out anything private (real names, emails, client data).

**Walkthrough videos.** Open `script.js` and paste a link into `demos`:

```js
demos: {
  "executive-command-center": "https://youtu.be/XXXXXXXXXXX",
  "meeting-to-action-system": "https://drive.google.com/file/d/FILE_ID/view",
  "client-onboarding-sop": "assets/walkthroughs/client-onboarding.mp4"
}
```

Accepted: a YouTube link (best: set it to Unlisted), a Vimeo link, a Google Drive share link (the file must be shared as "Anyone with the link can view"), or a video file in `assets/walkthroughs/`. While a link is empty, that card's "Watch demo" button and play icon stay hidden, so nothing points to a missing video. When it is set, the button and the play icon open the video in a pop-up player.

## Other things to replace

- **Hero:** the hero is now a designed scene (portrait, orbit lines, floating tiles and a handwritten "Work that Moves Forward" that writes itself in, then draws its arrow). It no longer uses a background video. The handwriting font is set by `--font-script` at the top of `style.css`; change it there, and add the font to the Google Fonts link in `index.html`. The timing of each word is the `--w-d` (delay) and `--w-dur` (duration) on each `script__word` in `index.html`. Visitors who prefer reduced motion see the finished tagline straight away.
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

Fraunces, Instrument Sans and Mr Dafoe (the handwritten tagline) are loaded from Google Fonts (open-source, free). If offline, the site falls back to Georgia and system sans-serif fonts.
