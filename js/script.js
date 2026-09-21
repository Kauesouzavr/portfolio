// Theme toggle (in-memory only) — present on every page
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;
themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

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

    gsap.from('.hcard', {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.highlights', start: 'top 82%', toggleActions: 'restart reverse restart reverse' }
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

    gsap.from('#portfolio .portfolio-head p', {
      y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#portfolio .portfolio-head p', start: 'top 90%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('#portfolio .tabs', {
      y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#portfolio .tabs', start: 'top 90%', toggleActions: 'restart reverse restart reverse' }
    });

    gsap.from('#panel-projetos .proj-card', {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '#panel-projetos', start: 'top 85%', toggleActions: 'restart reverse restart reverse' }
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
    gsap.from('.contact-inner p, .contact-actions', {
      y: 18, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-inner p', start: 'top 88%', toggleActions: 'restart reverse restart reverse' }
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

    gsap.from('.portfolio-head p', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 });
    gsap.from('.tabs', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 });
    gsap.from('#panel-projetos .proj-card', {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.55
    });
  });
}

// ---- Portfolio page only: tab switching ----
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('active')) return;
    tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const target = tab.dataset.tab;
    panels.forEach((p) => {
      if (p.id === 'panel-' + target) {
        p.hidden = false;
        if (gsapReady) {
          gsap.fromTo(p, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        }
      } else {
        p.hidden = true;
      }
    });
  });
});

// ---- Typewriter effect (loop infinito) ----
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const roles = ['Desenvolvedor Full Stack'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    typewriterEl.textContent = roles[0];
  } else {
    let roleIndex = 0, charIndex = 0, deleting = false;
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
}