const observerOptions = {
  threshold: 0.2,
};

const animatedElements = document.querySelectorAll('.animate-in');
const parallaxElements = document.querySelectorAll('[data-parallax]');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('.lightbox__image');
const closeButton = lightbox.querySelector('.lightbox__close');

const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

animatedElements.forEach((element) => intersectionObserver.observe(element));

function updateParallax() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed ? parseFloat(element.dataset.speed) : 0.2;
    element.style.transform = `translateY(${scrollTop * speed * -0.2}px)`;
  });
}

document.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-visible');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-visible')) {
    closeLightbox();
  }
});

const cards = document.querySelectorAll('.collection-card');
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    openLightbox(card.dataset.media || image.src, image.alt);
  });
});
