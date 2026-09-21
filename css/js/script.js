/* ==========================================================
   GILGAL INVESTMENTS — Main JavaScript
   ========================================================== */

/* ---------- HERO SLIDESHOW ---------- */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const heroTexts = [
  'Build Your Dream!',
  'Your Number One Builders',
  'Renovations • Painting • Surveys',
  'Property Sales — Done!'
];

let slideInterval;

function showSlide(index) {
  if (slides.length === 0) return;

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slides[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');

  const heroText = document.getElementById('heroText');
  if (heroText) {
    heroText.style.opacity = 0;
    setTimeout(() => {
      heroText.textContent = heroTexts[index];
      heroText.style.opacity = 1;
    }, 400);
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
  resetInterval();
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

if (slides.length > 0) {
  slideInterval = setInterval(nextSlide, 5000);
}

/* ---------- MOBILE MENU ---------- */
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.remove('open');
  });
});

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href.length < 2) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

/* ---------- CONTACT FORM ---------- */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const whatsappMsg = `Hello Gilgal Investments!%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0A%0A${message}`;
  window.open(`https://wa.me/256701128212?text=${whatsappMsg}`, '_blank');

  alert('Thank you ' + name + '! Opening WhatsApp to send your message...');
  e.target.reset();
}