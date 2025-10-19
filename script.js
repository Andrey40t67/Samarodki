const parallaxElements = document.querySelectorAll('[data-parallax]');
const hero = document.querySelector('.hero');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const galleryItems = document.querySelectorAll('.gallery__item');

const handleParallax = () => {
  const scrollY = window.scrollY;
  parallaxElements.forEach((element) => {
    element.style.setProperty('--parallax-shift', `${scrollY * 0.25}px`);
  });
};

const toggleModal = (open, src = '', title = '') => {
  if (open) {
    modal.setAttribute('aria-hidden', 'false');
    modalImage.src = src;
    modalImage.alt = title;
    modalTitle.textContent = title;
    document.body.style.overflow = 'hidden';
  } else {
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    modalTitle.textContent = '';
    document.body.style.overflow = '';
  }
};

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    toggleModal(true, img.src, item.dataset.title || img.alt);
  });
});

modalClose.addEventListener('click', () => toggleModal(false));
modalBackdrop.addEventListener('click', () => toggleModal(false));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    toggleModal(false);
  }
});

let rafId = null;
const onScroll = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    handleParallax();
    if (hero) {
      const opacity = Math.min(window.scrollY / 400, 0.65);
      hero.style.setProperty('--nav-opacity', opacity);
    }
    rafId = null;
  });
};

handleParallax();
window.addEventListener('scroll', onScroll, { passive: true });

// smooth anchor navigation
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    }
  });
});
