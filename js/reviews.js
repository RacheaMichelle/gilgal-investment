/* ==========================================================
   GILGAL INVESTMENTS — Reviews System
   Auto-publish mode: ALL reviews show instantly
   ========================================================== */

import { 
  db, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from './firebase-config.js';

/* ==========================================================
   1. DISPLAY ALL REVIEWS (no approval filter)
   ========================================================== */
async function loadReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container) return;

  container.innerHTML = '<p style="text-align:center; color:#999; grid-column: 1 / -1; padding: 40px;">Loading reviews...</p>';

  try {
    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc')
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      container.innerHTML = `
        <p style="text-align:center; color:#666; grid-column: 1 / -1; padding: 40px;">
          Be the first to leave a review! ⭐
        </p>`;
      return;
    }

    let html = '';
    snap.forEach(docSnap => {
      const r = docSnap.data();
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      const initial = (r.name || '?').charAt(0).toUpperCase();
      const service = r.service || 'Client';
      const date = r.createdAt?.toDate?.()?.toLocaleDateString?.('en-GB', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      }) || '';

      html += `
        <div class="testimonial">
          <div class="stars">${stars}</div>
          <p class="quote">"${escapeHtml(r.review)}"</p>
          <div class="author">
            <div class="avatar">${initial}</div>
            <div>
              <h5>${escapeHtml(r.name)}</h5>
              <span>${escapeHtml(service)} — Mbale${date ? ' • ' + date : ''}</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error('Error loading reviews:', err);
    container.innerHTML = `
      <p style="text-align:center; color:#999; grid-column: 1 / -1; padding: 40px;">
        Unable to load reviews right now.<br>
        <small style="color:#bbb; font-size:0.8rem;">${escapeHtml(err.message || '')}</small>
      </p>`;
  }
}

/* ==========================================================
   2. SUBMIT NEW REVIEW (auto-approved)
   ========================================================== */
async function submitReview(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  const name = document.getElementById('rvName').value.trim();
  const phone = document.getElementById('rvPhone').value.trim();
  const service = document.getElementById('rvService').value;
  const rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value || 0);
  const review = document.getElementById('rvText').value.trim();

  // Validation
  if (!name || !service || !rating || !review) {
    showMsg('Please fill in all required fields.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    await addDoc(collection(db, 'reviews'), {
      name,
      phone: phone || '',
      service,
      rating,
      review,
      status: 'approved',
      createdAt: serverTimestamp()
    });

    showMsg('✅ Thank you! Your review has been published.', 'success');
    form.reset();
    resetStars();

    // Reload reviews so the new one appears immediately
    setTimeout(() => loadReviews(), 800);
  } catch (err) {
    console.error('Error submitting review:', err);
    showMsg('❌ Something went wrong. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '⭐ Submit Review';
  }
}

/* ==========================================================
   3. HELPERS
   ========================================================== */
function showMsg(text, type) {
  const box = document.getElementById('reviewMsg');
  if (!box) return;
  box.textContent = text;
  box.className = 'review-msg ' + type;
  box.style.display = 'block';
  setTimeout(() => { box.style.display = 'none'; }, 6000);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function resetStars() {
  document.querySelectorAll('input[name="rating"]').forEach(i => i.checked = false);
  document.querySelectorAll('.star-label').forEach(l => l.classList.remove('active'));
}

/* ==========================================================
   4. STAR RATING UI
   ========================================================== */
function setupStarRating() {
  const stars = document.querySelectorAll('input[name="rating"]');
  stars.forEach(star => {
    star.addEventListener('change', () => {
      document.querySelectorAll('.star-label').forEach(l => l.classList.remove('active'));
      const val = parseInt(star.value);
      for (let i = 1; i <= val; i++) {
        document.querySelector(`.star-label[data-val="${i}"]`)?.classList.add('active');
      }
    });
  });
}

/* ==========================================================
   5. INIT
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadReviews();
  setupStarRating();

  const form = document.getElementById('reviewForm');
  if (form) form.addEventListener('submit', submitReview);
});