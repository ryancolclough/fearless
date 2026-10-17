const reduce = document.documentElement.classList.contains('reduce');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function trackingParams() {
  const incoming = new URLSearchParams(location.search);
  const hasIncoming = utmKeys.some((key) => incoming.get(key));
  const params = new URLSearchParams();
  if (hasIncoming) {
    utmKeys.forEach((key) => {
      const value = incoming.get(key);
      if (value) params.set(key, value);
    });
    return params;
  }
  params.set('utm_source', 'website');
  params.set('utm_medium', 'onsite');
  params.set('utm_campaign', 'evergreen');
  return params;
}

document.querySelectorAll('a[data-track]').forEach((link) => {
  const url = new URL(link.getAttribute('href'), location.origin);
  trackingParams().forEach((value, key) => url.searchParams.set(key, value));
  link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
});

document.querySelectorAll('iframe[data-widget]').forEach((frame) => {
  const url = new URL(frame.dataset.widget);
  trackingParams().forEach((value, key) => url.searchParams.set(key, value));
  frame.src = url.toString();
});

const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });
}

const menu = document.querySelector('.mobile-nav');
if (menu) {
  menu.addEventListener('toggle', () => {
    document.body.classList.toggle('menu-open', menu.open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) menu.open = false;
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.open = false;
    });
  });
}

const picker = document.querySelector('#artist-picker');
document.querySelectorAll('[data-open-picker]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!picker || typeof picker.showModal !== 'function') return;
    event.preventDefault();
    picker.showModal();
  });
});

picker?.addEventListener('click', (event) => {
  if (event.target === picker) picker.close();
});

document.querySelector('[data-close-picker]')?.addEventListener('click', () => picker?.close());

if (!reduce) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  document.querySelectorAll('.reveal').forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
}

if (fine && !reduce) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);
  document.addEventListener(
    'pointermove',
    (event) => {
      glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
      document.querySelectorAll('.tilt').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const inside = Math.abs(x) < rect.width / 2 && Math.abs(y) < rect.height / 2;
        card.style.transform = inside
          ? `perspective(900px) rotateY(${x / 40}deg) rotateX(${-y / 46}deg)`
          : '';
      });
    },
    { passive: true },
  );
}
