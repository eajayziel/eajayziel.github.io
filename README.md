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
│   ├── images/portrait.png         Your transparent portrait (add this)
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

## Portrait (transparent PNG)

Save your cut-out photo (no background) as **`assets/images/portrait.png`**. That is all you need to do. It shows up automatically in two places: the hero, and the circle in "Experience at a Glance". Until the file exists, a placeholder is shown. A tall image (about 4:5) works best.

## Tool icons (your monochrome SVGs)

Save each icon in **`assets/icons/tools/`** using exactly these file names. Any icon that is missing falls back to the tool's name as text, so you can add them gradually.

```
microsoft-word.svg   google-docs.svg      microsoft-excel.svg    microsoft-powerpoint.svg
google-sheets.svg    google-slides.svg    google-drive.svg       gmail.svg
google-meet.svg      zoom.svg             slack.svg              calendly.svg
google-calendar.svg  notion.svg           chatgpt.svg            claude.svg
gohighlevel.svg      make.svg             canva.svg              adobe-photoshop.svg
google-search.svg    google-forms.svg     pdf.svg
```

Icons display at 30px tall in the scrolling strip and 22px tall on the project cards. Use a viewBox and no fixed width so they scale cleanly.

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
