/* ===================================================================
   GGP v4.2 — Interactive Features
   Theme Toggle, Platform Tabs, Copy-to-Clipboard, Navigation
   =================================================================== */

// ===== THEME TOGGLE (data-theme attribute) =====
const tog = document.getElementById('themeToggle');
const bod = document.body;

function initTheme() {
  const saved = localStorage.getItem('ggp-theme');
  if (saved) {
    bod.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    bod.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  tog.textContent = bod.getAttribute('data-theme') === 'dark' ? '\u2600' : '\u263D';
}

function applyTheme(theme) {
  bod.setAttribute('data-theme', theme);
  localStorage.setItem('ggp-theme', theme);
  updateThemeIcon();
}

tog.addEventListener('click', () => {
  const current = bod.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Respect system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('ggp-theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

initTheme();

// ===== NAVIGATION — Active link highlighting via IntersectionObserver =====
const secs = document.querySelectorAll('.sec');
const navLinks = document.querySelectorAll('.nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((n) => n.classList.remove('on'));
      const active = document.querySelector('.nav a[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('on');
    }
  });
}, { rootMargin: '-15% 0px -80% 0px' });

secs.forEach((s) => navObserver.observe(s));

// ===== PLATFORM TABS =====
document.querySelectorAll('.ptab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach((t) => t.classList.remove('on'));
    document.querySelectorAll('.ppanel').forEach((p) => p.classList.remove('on'));
    tab.classList.add('on');
    const panel = document.getElementById(tab.dataset.tab);
    if (panel) panel.classList.add('on');
  });
});

// ===== COPY TO CLIPBOARD =====
function copyCode(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var btn = el.querySelector('.copy-btn');

  // Clone and remove button to get clean text
  var clone = el.cloneNode(true);
  var b = clone.querySelector('.copy-btn');
  if (b) b.remove();

  // Decode HTML entities
  var txt = clone.textContent
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/&/g, '&')
    .replace(/≤/g, '\u2264')
    .replace(/≥/g, '\u2265')
    .replace(/≠/g, '\u2260')
    .replace(/→/g, '\u2192');

  navigator.clipboard.writeText(txt).then(function () {
    showCopied(btn);
  }).catch(function () {
    // Fallback for older browsers
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopied(btn);
  });
}

function showCopied(btn) {
  if (!btn) return;
  btn.textContent = 'Copied!';
  btn.classList.add('copied');
  setTimeout(function () {
    btn.textContent = 'Copy';
    btn.classList.remove('copied');
  }, 2000);
}

// Attach copy handlers to all copy buttons
document.querySelectorAll('.copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var target = btn.getAttribute('data-target');
    if (target) copyCode(target);
  });
});

// ===== SMOOTH SCROLL POLYFILL =====
if (!CSS.supports || !CSS.supports('scroll-behavior', 'smooth')) {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== ANALYTICS (optional — connects to GA if present) =====
function trackEvent(eventName, eventData) {
  if (window.gtag) {
    gtag('event', eventName, eventData || {});
  }
}

// Track button clicks
document.querySelectorAll('.copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    trackEvent('copy_code', { platform: btn.getAttribute('data-target') });
  });
});

tog.addEventListener('click', function () {
  trackEvent('theme_toggle', { theme: bod.getAttribute('data-theme') });
});

// ===== PAGE LOAD =====
window.addEventListener('load', function () {
  bod.classList.add('loaded');
});

// ===== PUBLIC API =====
window.GGPWebsite = {
  applyTheme: applyTheme,
  trackEvent: trackEvent
};
