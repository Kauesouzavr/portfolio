// Theme toggle (in-memory only — se quiser que lembre entre visitas, dá pra trocar por localStorage
// já que agora isso vai rodar num site publicado de verdade, não no preview do chat)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;
themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// Entrance
gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
  .from('#badge', { opacity: 0, y: 14 }, 0.1)
  .from('#heading', { opacity: 0, y: 20 }, 0.25)
  .from('#subtext', { opacity: 0, y: 16 }, 0.4)
  .from('#pills', { opacity: 0, y: 16 }, 0.55)
  .from('#techRow', { opacity: 0, y: 14 }, 0.7)
  .from('#heroVisual', { opacity: 0, scale: 0.94 }, 0.3);

// Hero illustration (loaded from assets/computer-animation.json)
lottie.loadAnimation({
  container: document.getElementById('rocket'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/computer-animation.json'
});

// ---- About: letters animate in as you scroll to the section ----
gsap.registerPlugin(ScrollTrigger, SplitText);
document.fonts.ready.then(() => {
  const headingSplit = new SplitText('#aboutHeading', { type: 'chars' });
  gsap.from(headingSplit.chars, {
    yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.02, ease: 'power4.out',
    scrollTrigger: { trigger: '#aboutHeading', start: 'top 85%' }
  });

  const nameSplit = new SplitText('.about-name', { type: 'chars' });
  gsap.from(nameSplit.chars, {
    yPercent: 120, opacity: 0, duration: 0.6, stagger: 0.02, ease: 'power4.out',
    scrollTrigger: { trigger: '.about-name', start: 'top 85%' }
  });

  gsap.from('.about-subtitle', {
    y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-subtitle', start: 'top 90%' }
  });

  gsap.from('.about-greeting, .about-bio, .about-actions', {
    y: 20, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 78%' }
  });

  gsap.from('.about-photo-wrap', {
    scale: 0.85, opacity: 0, duration: 0.9, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 80%' }
  });

  gsap.from('.hcard', {
    y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: '.highlights', start: 'top 82%' }
  });
});