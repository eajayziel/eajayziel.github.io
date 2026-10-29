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
  videoUrl: ""    // YouTube/Vimeo link, or a path such as "assets/videos/intro.mp4"
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

  /* ---------- Video introduction ---------- */
  var frame = $("#video-frame");
  var playBtn = $("#video-play");
  var status = $("#video-status");

  function toEmbedUrl(url) {
    var yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/i);
    if (yt) return "https://www.youtube-nocookie.com/embed/" + yt[1] + "?autoplay=1&rel=0";
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vm) return "https://player.vimeo.com/video/" + vm[1] + "?autoplay=1";
    return null;
  }

  if (frame && playBtn) {
    playBtn.addEventListener("click", function () {
      if (!SITE.videoUrl) {
        if (status) { status.hidden = false; }
        return;
      }
      var embed = toEmbedUrl(SITE.videoUrl);
      var node;
      if (embed) {
        node = document.createElement("iframe");
        node.src = embed;
        node.title = "Introduction video";
        node.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        node.allowFullscreen = true;
      } else {
        node = document.createElement("video");
        node.src = resolveAsset(SITE.videoUrl);
        node.controls = true;
        node.autoplay = true;
        node.setAttribute("aria-label", "Introduction video");
      }
      frame.appendChild(node);
      playBtn.hidden = true;
      var caption = $(".video-frame__caption", frame);
      if (caption) caption.hidden = true;
      node.focus();
    });
  }
})();
