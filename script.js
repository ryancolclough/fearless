const header = document.getElementById('header');
const glow = document.getElementById('cursorGlow');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 5, 4) * 80}ms`;
  observer.observe(el);
});

document.addEventListener('pointermove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
  document.querySelectorAll('.tilt').forEach((card) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    if (Math.abs(x) < r.width && Math.abs(y) < r.height) {
      card.style.transform = `perspective(900px) rotateY(${x / 38}deg) rotateX(${-y / 44}deg) translateY(-8px)`;
    } else {
      card.style.transform = '';
    }
  });
});
