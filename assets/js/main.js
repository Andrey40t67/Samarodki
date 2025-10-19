const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const galleryCards = document.querySelectorAll('.gallery__card');
const chips = document.querySelectorAll('.chip');
const modal = document.querySelector('.modal');
const modalImage = modal.querySelector('img');
const modalCaption = modal.querySelector('.modal__caption');
const modalClose = document.querySelector('.modal__close');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll('[data-animate], .pillar, .timeline__item, .review').forEach(el => observer.observe(el));

const parallaxElements = document.querySelectorAll('[data-parallax]');

function handleParallax() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.1;
        const offset = scrollTop * speed;

        if (el.classList.contains('hero')) {
            el.style.backgroundPositionY = `${offset * 0.4}px`;
        } else if (el.querySelector('.parallax')) {
            el.querySelector('.parallax').style.transform = `translate3d(0, ${offset * -0.15}px, 0)`;
        } else {
            el.style.transform = `translate3d(0, ${offset * -0.1}px, 0)`;
        }
    });
}

window.addEventListener('scroll', handleParallax, { passive: true });
handleParallax();

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

function filterGallery(category) {
    galleryCards.forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        card.style.display = matches ? 'block' : 'none';
        card.style.opacity = matches ? '1' : '0';
        card.style.transform = matches ? '' : 'scale(0.95)';
    });
}

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('chip--active'));
        chip.classList.add('chip--active');
        filterGallery(chip.dataset.filter);
    });
});

galleryCards.forEach(card => {
    card.addEventListener('click', () => {
        const image = card.dataset.modalImg;
        const caption = card.querySelector('h3').textContent;
        modalImage.src = image;
        modalImage.alt = card.querySelector('img').alt;
        modalCaption.textContent = caption;
        modal.classList.add('modal--visible');
        modal.setAttribute('aria-hidden', 'false');
    });
});

function closeModal() {
    modal.classList.remove('modal--visible');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keyup', event => {
    if (event.key === 'Escape' && modal.classList.contains('modal--visible')) {
        closeModal();
    }
});

filterGallery('all');
