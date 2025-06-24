// Smooth-scroll navigation with offset for fixed header
const navLinks = document.querySelectorAll('nav ul li a');
const header = document.querySelector('header');
const headerOffset = header.offsetHeight;

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  });
});

// Intersection Observer for fade-in animations and active link highlighting
const sections = document.querySelectorAll('main section[id]');
const options = { root: null, threshold: 0.3 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      document.querySelector(`nav ul li a[href="#${id}"]`).classList.add('active');
    } else {
      document.querySelector(`nav ul li a[href="#${id}"]`).classList.remove('active');
    }
  });
}, options);

sections.forEach(section => observer.observe(section));

// Mobile navigation toggle
const menuButton = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  })
);



// Scroll-reveal for any element with .reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

revealElements.forEach(el => revealObserver.observe(el));
