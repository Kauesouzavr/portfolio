const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Theme toggle (in-memory only) — present on every page ----
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function setTheme(next) {
  root.setAttribute('data-theme', next);
  themeIcon.className = next === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  if (!document.startViewTransition) { setTheme(next); return; }

  // Circular reveal growing from the toggle button. With "reduce motion" on it falls back to a plain cross-fade.
  const box = themeToggle.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  if (!prefersReducedMotion) root.classList.add('theme-reveal');

  const transition = document.startViewTransition(() => setTheme(next));
  transition.ready.then(() => {
    if (prefersReducedMotion) return;
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(.22,.8,.3,1)', pseudoElement: '::view-transition-new(root)' }
    );
  }).catch(() => {});
  transition.finished.finally(() => root.classList.remove('theme-reveal'));
});

// ---- Header: mobile menu + highlight of the section being viewed ----
const nav = document.querySelector('.nav');
const navBurger = document.getElementById('navBurger');
const navBurgerIcon = document.getElementById('navBurgerIcon');

function setMenu(open) {
  if (!nav || !navBurger) return;
  nav.classList.toggle('nav-open', open);
  navBurger.setAttribute('aria-expanded', String(open));
  navBurger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navBurgerIcon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}
if (navBurger) {
  navBurger.addEventListener('click', () => setMenu(!nav.classList.contains('nav-open')));
  document.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) setMenu(false); });
}

const spyLinks = [...document.querySelectorAll('.nav-links a[data-section]')];
if (spyLinks.length && 'IntersectionObserver' in window) {
  const setActive = (id) => spyLinks.forEach((a) => {
    const on = a.dataset.section === id;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  spyLinks.forEach((a) => { const s = document.getElementById(a.dataset.section); if (s) spy.observe(s); });
  setActive('inicio');
}

let gsapReady = true;
try {
  gsap.registerPlugin(ScrollTrigger, SplitText);
} catch (e) {
  gsapReady = false;
  console.warn('GSAP não carregou — animações desativadas, mas o site continua funcional.', e);
}

// ---- Home page only: hero entrance ----
if (document.getElementById('heading') && gsapReady) {
  gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
    .from('#badge', { opacity: 0, y: 14 }, 0.1)
    .from('#heading', { opacity: 0, y: 20 }, 0.25)
    .from('#subtext', { opacity: 0, y: 16 }, 0.4)
    .from('#pills', { opacity: 0, y: 16 }, 0.55)
    .from('#techRow', { opacity: 0, y: 14 }, 0.7)
    .from('#heroVisual', { opacity: 0, scale: 0.94 }, 0.3);
}

// ---- Home page only: hero illustration (loaded from assets/computer-animation.json) ----
if (document.getElementById('rocket') && typeof lottie !== 'undefined') {
  lottie.loadAnimation({
    container: document.getElementById('rocket'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/computer-animation.json'
  });
}

// ---- Home page only: About + Highlights scroll animations ----
if (document.getElementById('aboutHeading') && gsapReady) {
  document.fonts.ready.then(() => {
    const headingSplit = new SplitText('#aboutHeading', { type: 'chars' });
    gsap.from(headingSplit.chars, {
      yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.02, ease: 'power4.out',
      scrollTrigger: { trigger: '#aboutHeading', start: 'top 85%', toggleActions: 'restart reverse restart reverse' }
    });

    const nameSplit = new SplitText('.about-name', { type: 'chars' });
    gsap.from(nameSplit.chars, {
      yPercent: 120, opacity: 0, duration: 0.6, stagger: 0.02, ease: 'power4.out',
      scrollTrigger: { trigger: '.about-name', start: 'top 85%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('.about-subtitle', {
      y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-subtitle', start: 'top 90%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('.about-greeting, .about-bio, .about-actions', {
      y: 20, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-grid', start: 'top 78%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('.about-photo-wrap', {
      scale: 0.85, opacity: 0, duration: 0.9, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 80%', toggleActions: 'restart reverse restart reverse' }
    });

    const highlightsSplit = new SplitText('#highlightsHeading', { type: 'chars' });
    gsap.from(highlightsSplit.chars, {
      yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.02, ease: 'power4.out',
      scrollTrigger: { trigger: '#highlightsHeading', start: 'top 85%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('.highlights-head p', {
      y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.highlights-head p', start: 'top 90%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('.hcard', {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.highlights-grid', start: 'top 85%', toggleActions: 'restart reverse restart reverse' }
    });
  });
}

// ---- Home page only: embedded Portfolio section (scroll-triggered, since it's not at the very top) ----
if (document.getElementById('homePortfolioHeading') && gsapReady) {
  document.fonts.ready.then(() => {
    const homePortSplit = new SplitText('#homePortfolioHeading', { type: 'chars' });
    gsap.from(homePortSplit.chars, {
      yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.02, ease: 'power4.out',
      scrollTrigger: { trigger: '#homePortfolioHeading', start: 'top 85%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('#portfolio .sec-head p', {
      y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#portfolio .sec-head p', start: 'top 90%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('#portfolio .tabs', {
      y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#portfolio .tabs', start: 'top 90%', toggleActions: 'restart reverse restart reverse' }
    });

    // Triggered by the tab bar (always visible) instead of the panel: the panel can be hidden when another tab is open.
    gsap.from('#panel-projetos .proj-card', {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '#portfolio .tabs', start: 'top 75%', toggleActions: 'restart reverse restart reverse' }
    });
  });
}

// ---- Home page only: Contact section ----
if (document.getElementById('contactHeading') && gsapReady) {
  document.fonts.ready.then(() => {
    gsap.from('#contactHeading', {
      y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '#contactHeading', start: 'top 85%', toggleActions: 'restart reverse restart reverse' }
    });
    gsap.from('.contact-inner > p, .contact-actions, .contact-mail', {
      y: 18, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-inner > p', start: 'top 88%', toggleActions: 'restart reverse restart reverse' }
    });
  });
}

// ---- Projects/Portfolio page only: heading entrance ----
if (document.getElementById('projHeading') && gsapReady) {
  document.fonts.ready.then(() => {
    const projSplit = new SplitText('#projHeading', { type: 'chars' });
    gsap.from(projSplit.chars, {
      yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.02, ease: 'power4.out'
    });

    gsap.from('.sec-head p', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 });
    gsap.from('.tabs', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 });
    gsap.from('#panel-projetos .proj-card', {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.55
    });
  });
}

// ---- Portfolio: tab switching ----
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

function activateTab(name) {
  const tab = [...tabs].find((t) => t.dataset.tab === name);
  if (!tab || tab.classList.contains('active')) return;
  tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  panels.forEach((p) => {
    if (p.id === 'panel-' + name) {
      p.hidden = false;
      if (gsapReady) {
        gsap.fromTo(p, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' });
      }
    } else {
      p.hidden = true;
    }
  });
  // Page height changes with the tab, so scroll-triggered sections further down need their positions recalculated.
  if (gsapReady) requestAnimationFrame(() => ScrollTrigger.refresh());
}

tabs.forEach((tab) => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));

// Links like "Ver Projetos" open the right tab first, then land directly on it
document.querySelectorAll('[data-open-tab]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const tabBar = document.querySelector('#portfolio .tabs');
    if (!tabBar) return;
    e.preventDefault();
    activateTab(link.dataset.openTab);
    tabBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---- Contact: copy e-mail address ----
const copyBtn = document.getElementById('copyMail');
if (copyBtn) {
  const label = copyBtn.querySelector('span');
  const showCopied = () => {
    copyBtn.classList.add('copied');
    label.textContent = 'Copiado!';
    setTimeout(() => { copyBtn.classList.remove('copied'); label.textContent = 'Copiar'; }, 1800);
  };
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    showCopied();
  });
}

// ---- Typewriter effect (loop infinito) ----
// Runs even when the OS reports "reduce motion": many Windows setups have animations switched off,
// which used to freeze this text. It only swaps characters — nothing moves on screen.
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const roles = ['Desenvolvedor Full Stack'];
  let roleIndex = 0, charIndex = 0, deleting = false;
  typewriterEl.textContent = '';
  function typeLoop() {
    const current = roles[roleIndex % roles.length];
    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex++;
        setTimeout(typeLoop, 400);
        return;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90);
  }
  typeLoop();
}

// ---- Force-match the height of the 2 Destaques top cards (Projetos / Tempo de Resposta) ----
// Runs regardless of what's causing the mismatch in CSS — measures the real rendered
// height and makes both match it exactly.
function equalizeRow2Cards() {
  const cards = document.querySelectorAll('.row-2 > .hcard');
  if (cards.length < 2) return;
  cards.forEach((c) => { c.style.height = 'auto'; });
  let maxHeight = 0;
  cards.forEach((c) => { maxHeight = Math.max(maxHeight, c.offsetHeight); });
  cards.forEach((c) => { c.style.height = maxHeight + 'px'; });
}
window.addEventListener('load', equalizeRow2Cards);
window.addEventListener('resize', equalizeRow2Cards);
