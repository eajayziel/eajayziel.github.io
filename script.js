/* ==========================================================================
   Executive Assistant Portfolio — script.js
   Vanilla JS, no dependencies.
   ========================================================================== */

/* --------------------------------------------------------------------------
   SITE SETTINGS — edit these when you have the real details.
   Leave a value as "" and the site shows a clearly labelled placeholder.
   -------------------------------------------------------------------------- */
const SITE = {
  email: "",      // e.g. "eajayziel@gmail.com"
  linkedin: "",   // e.g. "linkedin.com/in/jayziel-lagumbay"
  cv: "",         // e.g. "https://drive.google.com/file/d/1EWen1QkFMZ8Lrws0k-_vy1U9bxhjAwCp/view?usp=sharing" (path relative to the site root) or a full https:// URL
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

  /* ---------- Hero background video (loops silently; image is the fallback) ---------- */
  var heroVideo = $(".hero__video");
  if (heroVideo) {
    if (reduceMotion) {
      heroVideo.pause();
      heroVideo.removeAttribute("autoplay");
    } else {
      heroVideo.muted = true;
      heroVideo.addEventListener("playing", function () { heroVideo.classList.add("is-playing"); });
      var tryPlay = function () { var p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); };
      tryPlay();
      /* Save battery and data: pause when the hero is off screen */
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) tryPlay(); else heroVideo.pause(); });
        }, { threshold: 0.05 }).observe(heroVideo);
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
  if (marquee && track && set && !reduceMotion) {
    var clone = set.cloneNode(true);
    clone.removeAttribute("id");
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
    marquee.classList.add("is-running");
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

  /* ---------- Tool icons: fall back to the tool name if an SVG is missing ---------- */
  function iconFallback(img) {
    img.hidden = true;
    var name = img.parentNode && img.parentNode.querySelector(".tool__name");
    if (name) name.hidden = false;
  }
  document.addEventListener("error", function (e) {
    if (e.target && e.target.classList && e.target.classList.contains("tool__icon")) iconFallback(e.target);
  }, true);
  $$(".tool__icon").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) iconFallback(img);
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
