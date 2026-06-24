/* ================================================
   HUKUM KELUARGA ISLAM — JAVASCRIPT
================================================ */

// ── Page Navigation ────────────────────────────────────────────────────────
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.getElementById('link-' + pageId);
  if (activeLink) activeLink.classList.add('active');

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
}

// ── Mobile Hamburger ───────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ── Navbar Scroll Effect ───────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Animated Counters ──────────────────────────────────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// Observe stats section to trigger counter animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ── FAQ Toggle ─────────────────────────────────────────────────────────────
function toggleFAQ(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all open FAQs
  document.querySelectorAll('.faq-question.open').forEach(openBtn => {
    openBtn.classList.remove('open');
    openBtn.nextElementSibling.classList.remove('show');
  });

  // If it wasn't open, open it
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('show');
  }
}

// ── FAQ Search ─────────────────────────────────────────────────────────────
let currentCategory = 'all';

function filterFAQ() {
  const searchInput = document.getElementById('faq-search');
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();
  const items = document.querySelectorAll('.faq-item');
  let visibleCount = 0;

  items.forEach(item => {
    const questionEl = item.querySelector('.faq-question span:first-child');
    const answerEl   = item.querySelector('.faq-answer');
    if (!questionEl || !answerEl) return;

    const questionText = questionEl.textContent.toLowerCase();
    const answerText   = answerEl.textContent.toLowerCase();
    const cat          = item.getAttribute('data-cat') || '';

    const matchesSearch   = !query || questionText.includes(query) || answerText.includes(query);
    const matchesCategory = currentCategory === 'all' || cat === currentCategory;

    if (matchesSearch && matchesCategory) {
      item.classList.remove('hidden');
      visibleCount++;
    } else {
      item.classList.add('hidden');
    }
  });

  const emptyMsg = document.getElementById('faqEmpty');
  if (emptyMsg) {
    emptyMsg.classList.toggle('hidden', visibleCount > 0);
  }
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.faq-cat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterFAQ();
}

// ── Save Profile ───────────────────────────────────────────────────────────
function saveProfile() {
  const nimEl     = document.getElementById('input-nim');
  const namaEl    = document.getElementById('input-nama');
  const prodiEl   = document.getElementById('input-prodi');
  const jurusanEl = document.getElementById('input-jurusan');

  const nim     = nimEl ? nimEl.value.trim() : '';
  const nama    = namaEl ? namaEl.value.trim() : '';
  const prodi   = prodiEl ? prodiEl.value.trim() : '';
  const jurusan = jurusanEl ? jurusanEl.value.trim() : '';

  if (!nim && !nama && !prodi && !jurusan) {
    showToast('⚠️ Silakan isi minimal satu data profil!');
    return;
  }

  const profNimEl = document.getElementById('profil-nim');
  const profNamaEl = document.getElementById('profil-nama');
  const profNama2El = document.getElementById('profil-nama-2');
  const profProdiEl = document.getElementById('profil-prodi');
  const profJurusanEl = document.getElementById('profil-jurusan');

  if (nim && profNimEl)     profNimEl.textContent    = nim;
  if (nama) {
    if (profNamaEl)  profNamaEl.textContent  = nama;
    if (profNama2El) profNama2El.textContent = nama;
  }
  if (prodi && profProdiEl)   profProdiEl.textContent   = prodi;
  if (jurusan && profJurusanEl) profJurusanEl.textContent = jurusan;

  // Save to localStorage
  if (nim)     localStorage.setItem('hki-nim',     nim);
  if (nama)    localStorage.setItem('hki-nama',    nama);
  if (prodi)   localStorage.setItem('hki-prodi',   prodi);
  if (jurusan) localStorage.setItem('hki-jurusan', jurusan);

  showToast('✅ Data profil berhasil disimpan!');
}

// ── Load Saved Profile on Start ────────────────────────────────────────────
function loadProfile() {
  const nim     = localStorage.getItem('hki-nim');
  const nama    = localStorage.getItem('hki-nama');
  const prodi   = localStorage.getItem('hki-prodi');
  const jurusan = localStorage.getItem('hki-jurusan');

  const profNimEl = document.getElementById('profil-nim');
  const inputNimEl = document.getElementById('input-nim');
  const profNamaEl = document.getElementById('profil-nama');
  const profNama2El = document.getElementById('profil-nama-2');
  const inputNamaEl = document.getElementById('input-nama');
  const profProdiEl = document.getElementById('profil-prodi');
  const inputProdiEl = document.getElementById('input-prodi');
  const profJurusanEl = document.getElementById('profil-jurusan');
  const inputJurusanEl = document.getElementById('input-jurusan');

  if (nim) {
    if (profNimEl) profNimEl.textContent = nim;
    if (inputNimEl) inputNimEl.value = nim;
  }
  if (nama) {
    if (profNamaEl) profNamaEl.textContent = nama;
    if (profNama2El) profNama2El.textContent = nama;
    if (inputNamaEl) inputNamaEl.value = nama;
  }
  if (prodi) {
    if (profProdiEl) profProdiEl.textContent = prodi;
    if (inputProdiEl) inputProdiEl.value = prodi;
  }
  if (jurusan) {
    if (profJurusanEl) profJurusanEl.textContent = jurusan;
    if (inputJurusanEl) inputJurusanEl.value = jurusan;
  }
}

// ── Toast Notification ─────────────────────────────────────────────────────
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Scroll Animation Observer ──────────────────────────────────────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.materi-card, .misi-item, .nilai-card, .stat-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  animObserver.observe(el);
});

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  
  // Back to Top Button init
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ── ScrollSpy for Materi Page ──────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.materi-section-detail');
  const navLinks = document.querySelectorAll('.materi-sidebar-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  let currentId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      currentId = section.getAttribute('id') || '';
    }
  });

  if (currentId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }
});
