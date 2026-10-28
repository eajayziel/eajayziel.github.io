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
│   ├── icons/favicon.svg
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

## Other things to replace

- **Portrait:** save your photo as `assets/images/portrait.jpg`. In `index.html`, find the comment inside the `.portrait` figure, uncomment the `<img>` line and delete the placeholder `<div>`.
- **Hero background:** to use your own HD image, save it in `assets/images/` and change the `url(...)` in the `.hero__bg` rule in `style.css`.
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
