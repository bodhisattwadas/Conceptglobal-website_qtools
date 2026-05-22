document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const line1 = document.getElementById('typed-welcome');
  const line2 = document.getElementById('typed-brand');

  const line1Text = 'Welcome to';
  const line2Text = 'Quantum Tools and Services';

  let active = 0;
  let intervalId;

  function setActive(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    active = index;
  }

  function nextSlide() {
    const next = (active + 1) % slides.length;
    setActive(next);
  }

  function startCarousel() {
    if (slides.length < 2) return;
    intervalId = setInterval(nextSlide, 4500);
  }

  function typeLine(el, text, speed, delay = 0) {
    if (!el) return;
    el.textContent = '';
    let i = 0;
    setTimeout(() => {
      const timer = setInterval(() => {
        el.textContent += text.charAt(i);
        i += 1;
        if (i >= text.length) {
          clearInterval(timer);
        }
      }, speed);
    }, delay);
  }

  function runTypewriter() {
    typeLine(line1, line1Text, 65, 180);
    typeLine(line2, line2Text, 58, 1050);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(intervalId);
      setActive(i);
      startCarousel();
    });
  });

  if (slides.length) {
    setActive(0);
    startCarousel();
  }

  runTypewriter();
});
