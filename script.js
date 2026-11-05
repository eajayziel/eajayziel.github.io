/* ==========================================================================
   Executive Assistant Portfolio — script.js
   Vanilla JS, no dependencies.
   ========================================================================== */

/* --------------------------------------------------------------------------
   SITE SETTINGS — edit these when you have the real details.
   Leave a value as "" and the site shows a clearly labelled placeholder.
   -------------------------------------------------------------------------- */
const SITE = {
  email: "eajayziel@gmail.com",      // e.g. "name@example.com"
  linkedin: "https://www.linkedin.com/in/jayziel-lagumbay/",   // e.g. "https://www.linkedin.com/in/your-profile"
  cv: "assets/cv.pdf",         // e.g. "assets/cv.pdf" (path relative to the site root) or a full https:// URL
  /* Walkthrough video for each card in "Workflows in Action".
     Leave "" to hide that card's "Watch demo" button. Accepts a YouTube, Vimeo or Google Drive
     share link, or a file path such as "assets/walkthroughs/command-center.mp4". */
  demos: {
    "executive-command-center": "",
    "meeting-to-action-system": "",
    "client-onboarding-sop": ""
  }
};

/* --------------------------------------------------------------------------
   WORKFLOW SCREENSHOTS — one folder per project in assets/workflows/.
   Each entry is ["file-name-without-extension", "Caption shown in the viewer"].
   Files can be .png, .jpg, .jpeg or .webp (lowercase names). Missing files are skipped,
   so you can add them gradually. The first one found becomes the card's cover image.
   -------------------------------------------------------------------------- */
const WORKFLOW_SHOTS = {
  "executive-command-center": {
    title: "Executive Weekly Command Center",
    folder: "assets/workflows/executive-command-center/",
    shots: [
      ["01-executive-overview", "Executive Overview"],
      ["02-task-tracker", "Task Tracker"],
      ["03-guide-and-qa", "Guide and QA"]
    ]
  },
  "meeting-to-action-system": {
    title: "Meeting-to-Action System",
    folder: "assets/workflows/meeting-to-action-system/",
    shots: [
      ["01-executive-overview-kpis", "Executive Overview: KPIs"],
      ["02-executive-overview-deadlines", "Executive Overview: Deadlines"],
      ["03-action-tracker", "Action Tracker"],
      ["04-guide-and-qa-page-1", "Guide and QA: Page 1"],
      ["05-guide-and-qa-page-2", "Guide and QA: Page 2"]
    ]
  },
  "client-onboarding-sop": {
    title: "Client Onboarding SOP & Checklist",
    folder: "assets/workflows/client-onboarding-sop/",
    shots: [
      ["01-sop-procedure-steps-1-4", "SOP Procedure: Steps 1-4"],
      ["02-sop-procedure-steps-5-6", "SOP Procedure: Steps 5-6"],
      ["03-sop-procedure-steps-7-9", "SOP Procedure: Steps 7-9"],
      ["04-sop-process-checklist-a-f", "SOP Process Checklist: A-F"],
      ["05-process-checklist-f", "Process Checklist: F"],
      ["06-case-study-overview", "Case Study Overview"]
    ]
  }
};

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scriptSrc = document.currentScript ? document.currentScript.src : window.location.href;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* Resolve local paths relative to this script so it works from /projects/ too. */
  function resolveAsset(path) {
    if (/^(https?:)?\/\//i.test(path)) return path;
    return new URL(path, scriptSrc).href;
  }

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Header: solid background after scroll ---------- */
  var header = $(".site-header");
  function onScroll() {
    if (header && !header.classList.contains("is-solid")) {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = $(".nav__toggle");
  var links = $("#nav-links");
  function setMenu(open) {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    $$("a", links).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 861px)").addEventListener("change", function () { setMenu(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  var steps = $("#steps");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
    if (steps) io.observe(steps);
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    if (steps) steps.classList.add("is-visible");
  }

  /* ---------- Hero: freeze the orbit dots for visitors who prefer reduced motion ---------- */
  if (reduceMotion) {
    $$(".hero__orbits").forEach(function (svg) { if (svg.pauseAnimations) svg.pauseAnimations(); });
  }

  /* ---------- Hero: tiles drift slowly around the portrait along the orbit lines ---------- */
  var tiles = $$(".hero__stage .tile[data-orbit]");
  if (tiles.length) {
    /* Same ellipses as the orbit lines in the hero SVG (viewBox 600 x 640) */
    var ORBITS = {
      a: { rx: 255, ry: 300, rot: -14, secs: 95 },
      b: { rx: 235, ry: 285, rot: 26, secs: -120 }
    };
    var placeTiles = function (t) {
      tiles.forEach(function (el) {
        var o = ORBITS[el.getAttribute("data-orbit")];
        if (!o) return;
        var a = (parseFloat(el.getAttribute("data-phase")) || 0) * Math.PI / 180 + (t / o.secs) * Math.PI * 2;
        var r = o.rot * Math.PI / 180;
        var lx = o.rx * Math.cos(a), ly = o.ry * Math.sin(a);
        var x = 300 + lx * Math.cos(r) - ly * Math.sin(r);
        var y = 340 + lx * Math.sin(r) + ly * Math.cos(r);
        el.style.left = (x / 6).toFixed(2) + "%";
        el.style.top = (y / 6.4).toFixed(2) + "%";
        el.style.zIndex = y < 340 ? "0" : "2";          /* behind the portrait on the far side of the orbit */
      });
    };
    placeTiles(0);
    if (!reduceMotion) {
      var stageEl = $(".hero__stage"), running = true, t0 = null;
      var loop = function (now) {
        if (t0 === null) t0 = now;
        if (running) placeTiles((now - t0) / 1000);
        window.requestAnimationFrame(loop);
      };
      window.requestAnimationFrame(loop);
      if ("IntersectionObserver" in window && stageEl) {
        new IntersectionObserver(function (e) { running = e[0].isIntersecting; }).observe(stageEl);
      }
    }
  }

  /* ---------- Hero: micro-glitch activation for the floating tiles ----------
     Each tile "switches on" once, one after another (timing comes from --t in style.css),
     then settles. Afterwards a single random tile re-glitches every 10-16 seconds, softer than
     the first pass. Skipped entirely for visitors who prefer reduced motion. */
  if (tiles.length && !reduceMotion) {
    var GLITCH_MS = 240;
    var glitch = function (tile, delayMs, soft) {
      tile.style.setProperty("--gd", (delayMs / 1000) + "s");
      tile.style.setProperty("--gx", soft ? "2px" : "3px");
      tile.classList.remove("is-glitching");
      void tile.offsetWidth;                                   /* restart the animation if it was mid-run */
      tile.classList.add("is-glitching");
      window.setTimeout(function () {
        tile.classList.remove("is-glitching");
        tile.style.removeProperty("--gd");
        tile.style.removeProperty("--gx");
      }, delayMs + GLITCH_MS + 80);
    };

    tiles.forEach(function (tile) {
      var beat = parseFloat(window.getComputedStyle(tile).getPropertyValue("--t")) || 0;
      glitch(tile, Math.round(beat * 1000) + 120, false);      /* lands just as the tile fades in */
    });

    var stage = $(".hero__stage");
    var scheduleRepeat = function () {
      window.setTimeout(function () {
        var r = stage ? stage.getBoundingClientRect() : null;
        var inView = r && r.bottom > 0 && r.top < window.innerHeight;
        if (!document.hidden && inView) {
          glitch(tiles[Math.floor(Math.random() * tiles.length)], 0, true);
        }
        scheduleRepeat();
      }, 10000 + Math.random() * 6000);
    };
    window.setTimeout(scheduleRepeat, 4000);                   /* first repeat comes well after the intro sequence */
  }

  /* ---------- Hero background video: start reliably, pause when off-screen or if motion is reduced ---------- */
  var heroVideo = $(".hero__video video");
  if (heroVideo) {
    if (reduceMotion) {
      heroVideo.pause();
    } else {
      var kick = heroVideo.play();
      if (kick && kick.catch) kick.catch(function () {});
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) {
          if (e[0].isIntersecting) { var p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); }
          else heroVideo.pause();
        }).observe(heroVideo);
      }
    }
  }

  /* ---------- Hero parallax (gentle) ---------- */
  var parallax = $("[data-parallax]");
  if (parallax && !reduceMotion) {
    var ticking = false;
    var update = function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        parallax.style.transform = "translate3d(0," + (y * 0.12).toFixed(1) + "px,0)";
      }
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- Tools marquee: clone the list for a seamless loop ---------- */
  var marquee = $("#marquee");
  var track = $("#marquee-track");
  var set = $("#marquee-set");
  $$(".tool__icon").forEach(function (img) { if (img.alt) img.title = img.alt; });
  var toolsToggle = $("#tools-toggle");
  if (marquee && track && set) {
    var clone = set.cloneNode(true);
    clone.removeAttribute("id");
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
    if (reduceMotion) {
      marquee.classList.add("is-static");
      if (toolsToggle) toolsToggle.hidden = true;
      $$(".tool", marquee).forEach(function (t) {
        var ic = t.querySelector(".tool__icon"), nm = t.querySelector(".tool__name");
        if (ic && nm && !ic.hidden) nm.hidden = false;
      });
    } else {
      marquee.classList.add("is-running");
    }
    if (toolsToggle) {
      toolsToggle.addEventListener("click", function () {
        var showAll = !marquee.classList.contains("is-static");
        marquee.classList.toggle("is-static", showAll);
        marquee.classList.toggle("is-running", !showAll);
        toolsToggle.setAttribute("aria-pressed", String(showAll));
        /* In the full view, show each tool's name beside its icon (only where the icon loaded) */
        $$(".tool", marquee).forEach(function (t) {
          var ic = t.querySelector(".tool__icon"), nm = t.querySelector(".tool__name");
          if (ic && nm && !ic.hidden) nm.hidden = !showAll;
        });
        toolsToggle.setAttribute("aria-pressed", String(showAll));
        toolsToggle.textContent = showAll ? "Scroll tools" : "Show all tools";
      });
    }
  }

  /* ---------- Active nav link while scrolling (home page only) ---------- */
  var navAnchors = $$('.nav__links a[href^="#"]:not(.btn)');
  if (navAnchors.length && "IntersectionObserver" in window) {
    var map = {};
    navAnchors.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = map[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          navAnchors.forEach(function (n) { n.removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var target = document.getElementById(id);
      if (target) spy.observe(target);
    });
  }

  /* ---------- Contact details & CV links ---------- */
  function fillContact(id, value, href, external) {
    var el = document.getElementById(id);
    if (!el || !value) return;
    el.classList.remove("is-placeholder");
    el.setAttribute("href", href);
    if (external) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer"); }
    var label = el.querySelector(".value");
    if (label) label.textContent = value;
  }
  fillContact("contact-email", SITE.email, "mailto:" + SITE.email, false);
  fillContact("contact-linkedin", SITE.linkedin && "View my LinkedIn profile", SITE.linkedin, true);
  fillContact("contact-cv", SITE.cv && "Download my CV", SITE.cv && resolveAsset(SITE.cv), true);

  /* "Contact Me" button: opens an email once SITE.email is set */
  var cta = document.getElementById("contact-cta");
  if (cta && SITE.email) cta.setAttribute("href", "mailto:" + SITE.email);

  /* The contact-list CV link downloads the file; the other CV buttons open it in a new tab */
  var cvDownload = document.getElementById("contact-cv");
  if (cvDownload && SITE.cv) cvDownload.setAttribute("download", "Jayziel-Lagumbay-CV.pdf");

  if (SITE.cv) {
    $$("[data-cv-link]").forEach(function (a) {
      a.setAttribute("href", resolveAsset(SITE.cv));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ---------- Portrait: appears automatically once assets/images/portrait.png exists ---------- */
  $$("img[data-photo]").forEach(function (img) {
    function ok() {
      img.hidden = false;
      var box = img.closest(".portrait, .hub");
      if (box) box.classList.add("has-photo");
    }
    if (img.complete && img.naturalWidth > 0) ok();
    else img.addEventListener("load", ok);
  });

  /* ---------- Tool icons ----------
     If an icon does not load from its expected path, look for it in the neighbouring
     folders and common filename spellings (GitHub Pages is case-sensitive), then fall
     back to the tool's name. The browser console says exactly which file was missing. */
  function iconFallback(img) {
    img.hidden = true;
    var name = img.parentNode && img.parentNode.querySelector(".tool__name");
    if (name) name.hidden = false;
  }
  function iconVariants(img) {
    var u;
    try { u = new URL(img.getAttribute("data-src0"), document.baseURI); } catch (e) { return []; }
    var parts = u.pathname.split("/");
    var stem = parts.pop().replace(/\.svg$/i, "");
    var names = [
      stem,
      stem.replace(/(^|-)([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); }),
      stem.replace(/-/g, "_")
    ];
    var out = [];
    for (var k = 0; k < 4 && parts.length - k > 0; k++) {
      var dir = parts.slice(0, parts.length - k).join("/") + "/";
      names.forEach(function (n) {
        var url = u.origin + dir + n + ".svg";
        if (url !== u.href && out.indexOf(url) === -1) out.push(url);
      });
    }
    return out;
  }
  function iconRetry(img) {
    if (!img.getAttribute("data-src0")) img.setAttribute("data-src0", img.getAttribute("src"));
    if (!img._variants) img._variants = iconVariants(img);
    if (img._variants.length) { img.src = img._variants.shift(); return; }
    if (!img._warned) {
      img._warned = true;
      console.warn("[portfolio] Tool icon not found: " + img.getAttribute("data-src0") +
        " (also looked in the neighbouring folders). Check the file name and folder.");
    }
    iconFallback(img);
  }
  document.addEventListener("error", function (e) {
    if (e.target && e.target.classList && e.target.classList.contains("tool__icon")) iconRetry(e.target);
  }, true);
  document.addEventListener("load", function (e) {
    var img = e.target;
    if (img && img.classList && img.classList.contains("tool__icon") && img.getAttribute("data-src0") &&
        img.getAttribute("src") !== img.getAttribute("data-src0")) {
      console.info("[portfolio] Tool icon found at " + img.src + " instead of " + img.getAttribute("data-src0") +
        ". Move or rename it to the expected path to remove this notice.");
    }
  }, true);
  /* Icons that already finished loading before this script ran. Do not use naturalWidth here:
     SVG files without width/height attributes report 0 in some browsers even when they loaded fine. */
  $$(".tool__icon").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      var probe = new Image();                     /* load or error tells us the truth, size does not */
      probe.onerror = function () { iconRetry(img); };
      probe.src = img.currentSrc || img.src;
    }
  });

  /* ---------- Count-up for the experience figures ---------- */
  var counters = $$("[data-count]");
  function runCount(el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    var start = null;
    function tick(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / 1200, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) window.requestAnimationFrame(tick);
    }
    el.textContent = "0";
    window.requestAnimationFrame(tick);
  }
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- Workflow screenshots: cover image on each card + a viewer with all of them ---------- */
  var SHOT_EXTS = ["png", "jpg", "jpeg", "webp"];
  var galleries = {};

  function findImage(base) {                         /* resolves to the first URL that exists, else null */
    return new Promise(function (resolve) {
      var i = 0;
      (function next() {
        if (i >= SHOT_EXTS.length) return resolve(null);
        var url = resolveAsset(base + "." + SHOT_EXTS[i++]);
        var probe = new Image();
        probe.onload = function () { resolve(url); };
        probe.onerror = next;
        probe.src = url;
      })();
    });
  }

  Object.keys(WORKFLOW_SHOTS).forEach(function (key) {
    var cfg = WORKFLOW_SHOTS[key];
    Promise.all(cfg.shots.map(function (s) { return findImage(cfg.folder + s[0]); })).then(function (urls) {
      var list = [];
      urls.forEach(function (u, n) { if (u) list.push({ url: u, caption: cfg.shots[n][1] }); });
      if (!list.length) return;                      /* nothing uploaded yet: keep the drawn preview */
      galleries[key] = { title: cfg.title, items: list };
      var cover = document.querySelector('[data-cover="' + key + '"]');
      var box = cover && cover.closest(".preview");
      if (!cover || !box) return;
      cover.src = list[0].url;
      cover.alt = list[0].caption + " (" + cfg.title + ")";
      cover.hidden = false;
      box.classList.add("has-shot");
      var open = box.querySelector(".preview__open");
      var count = box.querySelector(".preview__count");
      if (open) open.hidden = false;
      if (count) {
        count.textContent = list.length === 1 ? "View screenshot" : "View " + list.length + " screenshots";
        count.hidden = false;
      }
      if (open) open.addEventListener("click", function () { openShots(key, 0); });
    });
  });

  var shotsDialog = null, shotsState = { key: null, i: 0 };
  function getShotsDialog() {
    if (shotsDialog) return shotsDialog;
    var d = document.createElement("dialog");
    d.className = "shots-modal";
    d.setAttribute("aria-label", "Project screenshots");
    d.innerHTML =
      '<div class="shots-modal__bar">' +
        '<div class="shots-modal__heading"><p class="shots-modal__project"></p><p class="shots-modal__caption"></p></div>' +
        '<span class="shots-modal__count" aria-live="polite"></span>' +
        '<a class="shots-modal__full" target="_blank" rel="noopener">Open full size</a>' +
        '<button type="button" class="shots-modal__close" aria-label="Close screenshots">&times;</button>' +
      '</div>' +
      '<div class="shots-modal__stage">' +
        '<button type="button" class="shots-nav shots-nav--prev" aria-label="Previous screenshot">&#8249;</button>' +
        '<img class="shots-modal__img" alt="">' +
        '<button type="button" class="shots-nav shots-nav--next" aria-label="Next screenshot">&#8250;</button>' +
      '</div>' +
      '<div class="shots-modal__thumbs" role="group" aria-label="Choose a screenshot"></div>';
    document.body.appendChild(d);
    d.querySelector(".shots-modal__close").addEventListener("click", function () { d.close(); });
    d.querySelector(".shots-nav--prev").addEventListener("click", function () { stepShots(-1); });
    d.querySelector(".shots-nav--next").addEventListener("click", function () { stepShots(1); });
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); stepShots(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); stepShots(1); }
    });
    var x0 = null;                                   /* swipe on touch screens */
    var stage = d.querySelector(".shots-modal__stage");
    stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) stepShots(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
    shotsDialog = d;
    return d;
  }

  function showShot(i) {
    var g = galleries[shotsState.key], d = shotsDialog;
    if (!g || !d) return;
    var n = g.items.length;
    shotsState.i = (i + n) % n;
    var it = g.items[shotsState.i];
    var img = d.querySelector(".shots-modal__img");
    img.src = it.url;
    img.alt = it.caption + " (" + g.title + ")";
    d.querySelector(".shots-modal__project").textContent = g.title;
    d.querySelector(".shots-modal__caption").textContent = it.caption;
    d.querySelector(".shots-modal__count").textContent = (shotsState.i + 1) + " / " + n;
    d.querySelector(".shots-modal__full").setAttribute("href", it.url);
    $$(".shots-thumb", d).forEach(function (t, idx) {
      if (idx === shotsState.i) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
    });
    var next = new Image(); next.src = g.items[(shotsState.i + 1) % n].url;   /* preload the next one */
  }
  function stepShots(delta) { showShot(shotsState.i + delta); }

  function openShots(key, start) {
    var g = galleries[key];
    if (!g) return;
    var d = getShotsDialog();
    if (typeof d.showModal !== "function") { window.open(g.items[start].url, "_blank", "noopener"); return; }
    shotsState.key = key;
    var many = g.items.length > 1;
    d.querySelector(".shots-nav--prev").hidden = !many;
    d.querySelector(".shots-nav--next").hidden = !many;
    var thumbs = d.querySelector(".shots-modal__thumbs");
    thumbs.hidden = !many;
    thumbs.innerHTML = "";
    g.items.forEach(function (it, idx) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "shots-thumb";
      b.setAttribute("aria-label", it.caption);
      var im = document.createElement("img");
      im.src = it.url; im.alt = "";
      b.appendChild(im);
      b.addEventListener("click", function () { showShot(idx); });
      thumbs.appendChild(b);
    });
    showShot(start);
    d.showModal();
  }

  /* ---------- Workflow walkthroughs: opens a player when a link is set in SITE.demos ---------- */
  function toEmbedUrl(url) {
    var yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/i);
    if (yt) return "https://www.youtube-nocookie.com/embed/" + yt[1] + "?autoplay=1&rel=0";
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vm) return "https://player.vimeo.com/video/" + vm[1] + "?autoplay=1";
    var gd = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/i);
    if (gd) return "https://drive.google.com/file/d/" + gd[1] + "/preview";
    return null;
  }

  var demoDialog = null;
  function getDemoDialog() {
    if (demoDialog) return demoDialog;
    demoDialog = document.createElement("dialog");
    demoDialog.className = "demo-modal";
    demoDialog.setAttribute("aria-label", "Project walkthrough");
    demoDialog.innerHTML =
      '<div class="demo-modal__bar"><p class="demo-modal__title"></p>' +
      '<button type="button" class="demo-modal__close" aria-label="Close walkthrough">&times;</button></div>' +
      '<div class="demo-modal__stage"></div>';
    document.body.appendChild(demoDialog);
    demoDialog.querySelector(".demo-modal__close").addEventListener("click", function () { demoDialog.close(); });
    demoDialog.addEventListener("click", function (e) { if (e.target === demoDialog) demoDialog.close(); });
    demoDialog.addEventListener("close", function () { demoDialog.querySelector(".demo-modal__stage").innerHTML = ""; });
    return demoDialog;
  }

  function openDemo(url, title) {
    var dlg = getDemoDialog();
    if (typeof dlg.showModal !== "function") { window.open(resolveAsset(url), "_blank", "noopener"); return; }
    var stage = dlg.querySelector(".demo-modal__stage");
    stage.innerHTML = "";
    dlg.querySelector(".demo-modal__title").textContent = title || "Walkthrough";
    var embed = toEmbedUrl(url), node;
    if (embed) {
      node = document.createElement("iframe");
      node.src = embed;
      node.title = title || "Walkthrough";
      node.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      node.allowFullscreen = true;
    } else {
      node = document.createElement("video");
      node.src = resolveAsset(url);
      node.controls = true;
      node.autoplay = true;
      node.playsInline = true;
      node.setAttribute("aria-label", title || "Walkthrough");
    }
    stage.appendChild(node);
    dlg.showModal();
  }

  var demoLinks = SITE.demos || {};
  $$("[data-demo]").forEach(function (el) {
    var url = demoLinks[el.getAttribute("data-demo")];
    if (!url) return;                       /* no walkthrough yet: the button and play icon stay hidden */
    el.hidden = false;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openDemo(url, el.getAttribute("data-title"));
    });
  });
})();
