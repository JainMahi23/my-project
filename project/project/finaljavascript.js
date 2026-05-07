/* ═══════════════════════════════════════════════════════════
   FOLIO — main.js
   Book-only data: real Open Library cover images,
   book-focused social posts, chat about books.
═══════════════════════════════════════════════════════════ */
document.getElementById('alsoLike').innerHTML = similar.map(b => `
  <a href="product.html?title=${encodeURIComponent(b.title)}&price=${b.price.replace('₹','')}&img=${b.cover}">
    <div class="mini-card">
      <div class="mini-card-img">
        <img src="${b.cover}" />
      </div>
      <div class="mini-card-body">
        <div class="mini-card-title">${b.title}</div>
        <div class="mini-card-price">${b.price}</div>
      </div>
    </div>
  </a>
`).join('');
'use strict';

/* ══════════════════════════════════════════════════════════
   DUMMY DATA
   coverUrl → Open Library Covers API (free, no auth)
   Format: https://covers.openlibrary.org/b/isbn/{ISBN}-M.jpg
   Sizes: -S (small) | -M (medium) | -L (large)
══════════════════════════════════════════════════════════ */

const PRODUCTS = [
  /* ── Fiction ── */
  {
    id: 1, cat: 'fiction',
    name: 'The Midnight Library',
    author: 'Matt Haig',
    price: 499, original: 599, rating: 4.8, reviews: 12483,
    badge: 'Hot',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg',
    fallback: '📚',
    coverBg: '#1a2744',
  },
  {
    id: 2, cat: 'fiction',
    name: 'Normal People',
    author: 'Sally Rooney',
    price: 399, original: null, rating: 4.6, reviews: 18320,
    badge: null,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780571334650-M.jpg',
    fallback: '📖',
    coverBg: '#1e1a2a',
  },
  {
    id: 3, cat: 'fiction',
    name: 'Anxious People',
    author: 'Fredrik Backman',
    price: 449, original: 549, rating: 4.7, reviews: 9240,
    badge: 'Sale',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781982137861-M.jpg',
    fallback: '📗',
    coverBg: '#1a2e1e',
  },

  /* ── Non-Fiction ── */
  {
    id: 4, cat: 'nonfiction',
    name: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 599, original: 799, rating: 4.8, reviews: 42100,
    badge: 'Hot',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg',
    fallback: '🌍',
    coverBg: '#2a2414',
  },
  {
    id: 5, cat: 'nonfiction',
    name: 'Educated',
    author: 'Tara Westover',
    price: 499, original: null, rating: 4.7, reviews: 18900,
    badge: null,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780399590504-M.jpg',
    fallback: '🎓',
    coverBg: '#231a2a',
  },

  /* ── Academic ── */
  {
    id: 6, cat: 'academic',
    name: 'A Brief History of Time',
    author: 'Stephen Hawking',
    price: 449, original: null, rating: 4.8, reviews: 22000,
    badge: null,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780553380163-M.jpg',
    fallback: '🔭',
    coverBg: '#0a1428',
  },
  {
    id: 7, cat: 'academic',
    name: 'The Selfish Gene',
    author: 'Richard Dawkins',
    price: 499, original: 649, rating: 4.6, reviews: 9200,
    badge: 'Sale',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780192860927-M.jpg',
    fallback: '🧬',
    coverBg: '#1a1a14',
  },

  /* ── Comics ── */
  {
    id: 8, cat: 'comics',
    name: 'Maus',
    author: 'Art Spiegelman',
    price: 799, original: null, rating: 4.9, reviews: 7200,
    badge: 'New',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780679748403-M.jpg',
    fallback: '🐭',
    coverBg: '#281414',
  },
  {
    id: 9, cat: 'comics',
    name: 'Watchmen',
    author: 'Alan Moore',
    price: 699, original: 899, rating: 4.8, reviews: 11300,
    badge: 'Sale',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780930289232-M.jpg',
    fallback: '🦉',
    coverBg: '#1e1428',
  },

  /* ── Self-Help ── */
  {
    id: 10, cat: 'selfhelp',
    name: 'Atomic Habits',
    author: 'James Clear',
    price: 499, original: 599, rating: 4.9, reviews: 48210,
    badge: 'Hot',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg',
    fallback: '⚡',
    coverBg: '#2a1a14',
  },
  {
    id: 11, cat: 'selfhelp',
    name: 'Deep Work',
    author: 'Cal Newport',
    price: 449, original: 549, rating: 4.7, reviews: 21300,
    badge: 'Sale',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg',
    fallback: '🎯',
    coverBg: '#141e28',
  },

  /* ── Accessories ── */
  {
    id: 12, cat: 'extras',
    name: 'Leather Bookmark Set',
    author: 'Folio Studio',
    price: 299, original: 399, rating: 4.6, reviews: 2100,
    badge: 'New',
    coverUrl: null,   /* no book cover — uses emoji */
    fallback: '🔖',
    coverBg: '#2a1a0a',
  },
  {
    id: 13, cat: 'extras',
    name: 'Dot-Grid Notebook A5',
    author: 'Rhodia',
    price: 449, original: null, rating: 4.7, reviews: 3400,
    badge: null,
    coverUrl: null,
    fallback: '📓',
    coverBg: '#1a2a1a',
  },
  {
    id: 14, cat: 'extras',
    name: 'LED Reading Lamp',
    author: 'Lumio',
    price: 1299, original: 1599, rating: 4.8, reviews: 1850,
    badge: 'Sale',
    coverUrl: null,
    fallback: '💡',
    coverBg: '#1a1a2a',
  },
  {
    id: 15, cat: 'extras',
    name: 'Hardcover Reading Journal',
    author: 'Leuchtturm1917',
    price: 799, original: 999, rating: 4.9, reviews: 5600,
    badge: 'Hot',
    coverUrl: null,
    fallback: '📒',
    coverBg: '#0a1a2a',
  },
  {
    id: 16, cat: 'extras',
    name: 'Folding Book Stand',
    author: 'ReadRight',
    price: 599, original: null, rating: 4.6, reviews: 2900,
    badge: 'New',
    coverUrl: null,
    fallback: '📐',
    coverBg: '#1a2a0a',
  },
];

/* ── Recommended Books ─────────────────────────────────── */
const BOOKS = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg',
    fallback: '📚',
    coverBg: '#1a2744',
    rating: 4.8,
    reviews: 12483,
    desc: 'Between life and death there is a library. Nora finds it at midnight — and inside, every book represents a life she could have lived. A dazzling story about regret, hope, and second chances.',
    featured: true
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg',
    fallback: '⚡',
    coverBg: '#2a1a14',
    rating: 4.9,
    reviews: 48210
  },
  {
    id: 3,
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441013593-M.jpg',
    fallback: '🌌',
    coverBg: '#2a2414',
    rating: 4.9,
    reviews: 29840
  },
  {
    id: 4,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg',
    fallback: '🌍',
    coverBg: '#2a2414',
    rating: 4.8,
    reviews: 42100
  },
  {
    id: 5,
    title: 'Maus',
    author: 'Art Spiegelman',
    genre: 'Comics',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780679748403-M.jpg',
    fallback: '🐭',
    coverBg: '#281414',
    rating: 4.9,
    reviews: 7200
  },
];

/* ── Social Posts — all book reading themed ─────────────── */
const POSTS = [
  {
    id: 1,
    user: 'Ayesha R.',   handle: '@ayeshar', avatar: '🧕', avatarBg: '#f0d5c8',
    text: 'Just finished The Midnight Library and I haven't stopped thinking about it. Matt Haig writes like he understands exactly what keeps you up at 2am. ✨',
    bookTitle: 'The Midnight Library',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg',
    imgBg: '#e8eef5',
    postEmoji: '📚',
    likes: 248, comments: 32, time: '2h ago', liked: false
  },
  {
    id: 2,
    user: 'Luca M.',     handle: '@lucam',   avatar: '👨‍💻', avatarBg: '#c8d8f0',
    text: 'Atomic Habits for the third time — every re-read hits differently depending on where you are in life. If you haven't started yet, start today. 🔥',
    bookTitle: 'Atomic Habits',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg',
    imgBg: '#f5ece0',
    postEmoji: '⚡',
    likes: 183, comments: 47, time: '4h ago', liked: false
  },
  {
    id: 3,
    user: 'Priya S.',    handle: '@priyas',  avatar: '👩‍🎨', avatarBg: '#d8c8f0',
    text: 'Dune is one of those books that physically changes how you think. Read it once you like it. Read it twice you understand it. Third time you live it. 🌌',
    bookTitle: 'Dune',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441013593-M.jpg',
    imgBg: '#f0ede0',
    postEmoji: '🌌',
    likes: 412, comments: 63, time: '6h ago', liked: false
  },
  {
    id: 4,
    user: 'Omar K.',     handle: '@omark',   avatar: '🧑‍🚀', avatarBg: '#c8f0d8',
    text: 'Sapiens will rearrange your brain in the best possible way. Read chapter 2 again once you're done with the whole book — you'll see what I mean. 🌍',
    bookTitle: 'Sapiens',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg',
    imgBg: '#eef5e8',
    postEmoji: '🌍',
    likes: 576, comments: 88, time: '8h ago', liked: false
  },
  {
    id: 5,
    user: 'Zeynep A.',   handle: '@zeynep',  avatar: '👩‍🍳', avatarBg: '#f0e8c8',
    text: 'Normal People was not what I expected at all — it's quieter and more devastating than any thriller. Sally Rooney writes silence better than anyone. 💌',
    bookTitle: 'Normal People',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780571334650-M.jpg',
    imgBg: '#f5e8f0',
    postEmoji: '💌',
    likes: 294, comments: 41, time: '1d ago', liked: false
  },
  {
    id: 6,
    user: 'Dev P.',      handle: '@devp',    avatar: '🧑‍🎤', avatarBg: '#f0c8c8',
    text: 'Maus is gut-punching and essential. Every panel is exactly as dense as it needs to be. Art Spiegelman gave the world something irreplaceable. 🐭',
    bookTitle: 'Maus',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780679748403-M.jpg',
    imgBg: '#f5eaea',
    postEmoji: '🐭',
    likes: 731, comments: 112, time: '1d ago', liked: false
  },
];

/* ── Chat — book club themed ────────────────────────────── */
const CHAT_MESSAGES = [
  { id: 1, user: 'Ayesha',  avatar: '🧕', avatarBg: '#f0d5c8', text: 'Anyone else on chapter 18 of Dune right now? 👀',            own: false },
  { id: 2, user: 'Me',      avatar: '🙋',  avatarBg: '#c8f0d8', text: 'Yes! The Stilgar scenes are incredible',                     own: true  },
  { id: 3, user: 'Luca',    avatar: '👨‍💻', avatarBg: '#c8d8f0', text: 'Do NOT read ahead I was spoiled last time 😤📚',              own: false },
  { id: 4, user: 'Priya',   avatar: '👩‍🎨', avatarBg: '#d8c8f0', text: 'Midnight Library next month for book club? 🗳️',              own: false },
  { id: 5, user: 'Me',      avatar: '🙋',  avatarBg: '#c8f0d8', text: 'Yes vote! Already have it on my shelf 📖',                   own: true  },
];

/* ══════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════ */
let cartCount    = 0;
let activeFilter = 'all';

/* ══════════════════════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════════════════════ */
const navbar        = document.getElementById('navbar');
const hamburger     = document.getElementById('hamburger');
const navLinks      = document.getElementById('navLinks');
const searchBtn     = document.getElementById('searchBtn');
const searchClose   = document.getElementById('searchClose');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput   = document.getElementById('searchInput');
const cartBadge     = document.getElementById('cartBadge');
const productsGrid  = document.getElementById('productsGrid');
const bookFeatured  = document.getElementById('bookFeatured');
const booksList     = document.getElementById('booksList');
const socialGrid    = document.getElementById('socialGrid');
const chatPreview   = document.getElementById('chatPreview');
const toast         = document.getElementById('toast');
const filterBtns    = document.querySelectorAll('.filter-btn');

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
function stars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= .5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* Cover image element with emoji fallback */
function coverImgHTML(coverUrl, fallbackEmoji, alt = '') {
  if (!coverUrl) {
    /* No URL — render emoji immediately */
    return `<span class="cover-fallback">${fallbackEmoji}</span>`;
  }
  return `<img
    src="${coverUrl}"
    alt="${alt}"
    loading="lazy"
    onerror="
      this.style.display='none';
      this.parentNode.classList.add('no-cover');
    "
  />
  <span class="cover-fallback">${fallbackEmoji}</span>`;
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* Active nav link tracking via IntersectionObserver */
const SECTION_IDS = ['hero', 'products', 'books', 'social', 'chat-cta'];
const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const id = entry.target.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`) ||
                 (id === 'hero' ? document.querySelector('.nav-link') : null);
    if (link) link.classList.add('active');
  });
}, { threshold: 0.35 });

SECTION_IDS.forEach(id => {
  const el = document.getElementById(id);
  if (el) secObserver.observe(el);
});

/* Search */
searchBtn.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  searchInput.focus();
});
searchClose.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  searchInput.value = '';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') searchOverlay.classList.remove('active');
});

/* ══════════════════════════════════════════════════════════
   RENDER: PRODUCTS (books + accessories)
══════════════════════════════════════════════════════════ */
function catLabel(cat) {
  const m = { fiction:'Fiction', nonfiction:'Non-Fiction', academic:'Academic', comics:'Comics', selfhelp:'Self-Help', extras:'Accessory' };
  return m[cat] || cat;
}

function renderProducts(filter = 'all') {
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  productsGrid.innerHTML = filtered.map(p => {
    const isExtra   = p.cat === 'extras';
    const hasImg    = !!p.coverUrl;
    const badgeCls  = p.badge === 'New' ? 'badge-new' : p.badge === 'Hot' ? 'badge-hot' : 'badge-sale';

    return `
      <div class="product-card ${isExtra ? 'is-extra' : ''}" data-id="${p.id}">
        <div class="product-img ${!hasImg ? 'no-cover' : ''}">
          ${p.badge ? `<span class="product-badge ${badgeCls}">${p.badge}</span>` : ''}
          ${coverImgHTML(p.coverUrl, p.fallback, p.name)}
        </div>
        <div class="product-body">
          <p class="product-cat">${catLabel(p.cat)}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-author">${isExtra ? p.author : 'by ' + p.author}</p>
          <p class="product-stars">${stars(p.rating)}
            <span style="color:var(--ink-3);font-size:.7rem">(${p.reviews.toLocaleString()})</span>
          </p>
          <div class="product-foot">
            <div class="product-price">
              ${p.original ? `<span class="original">₹${p.original}</span>` : ''}
              ₹${p.price}
            </div>
            <button class="add-to-cart-btn" data-id="${p.id}" aria-label="Add to cart">+</button>
          </div>
        </div>
      </div>`;
  }).join('');

  /* Cart listeners */
  productsGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      cartCount++;
      cartBadge.textContent = cartCount;
      cartBadge.style.transform = 'scale(1.45)';
      setTimeout(() => cartBadge.style.transform = '', 220);
      const prod = PRODUCTS.find(p => p.id === parseInt(btn.dataset.id));
      showToast(`🛒 "${prod.name}" added to bag`);
    });
  });
}

/* Category filter buttons */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    renderProducts(activeFilter);
  });
});

/* ══════════════════════════════════════════════════════════
   RENDER: RECOMMENDED BOOKS
══════════════════════════════════════════════════════════ */
function renderBooks() {
  const featured = BOOKS.find(b => b.featured);

  bookFeatured.innerHTML = `
    <div class="book-featured-cover ${!featured.coverUrl ? 'no-cover' : ''}"
         style="background:linear-gradient(135deg, ${featured.coverBg} 0%, #0a0a0a 100%)">
      ${featured.coverUrl
        ? `<img src="${featured.coverUrl}" alt="${featured.title}"
               loading="lazy"
               onerror="this.style.display='none';this.parentNode.classList.add('no-cover')" />`
        : ''}
      <span class="cover-emoji">${featured.fallback}</span>
    </div>
    <div class="book-featured-body">
      <span class="genre-tag">${featured.genre}</span>
      <h3>${featured.title}</h3>
      <p class="author">by ${featured.author}</p>
      <p>${featured.desc}</p>
      <div class="book-rating">
        <span class="stars">${'★'.repeat(Math.floor(featured.rating))}</span>
        <strong>${featured.rating}</strong>
        <span class="rating-count">(${featured.reviews.toLocaleString()} reviews)</span>
      </div>
      <a href="#" class="btn-primary" style="display:inline-flex;margin-top:20px">Read More →</a>
    </div>`;

  booksList.innerHTML = BOOKS.filter(b => !b.featured).map(b => `
    <div class="book-item">
      <div class="book-cover-sm">
        ${b.coverUrl
          ? `<img src="${b.coverUrl}" alt="${b.title}" loading="lazy"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>`
          : ''}
        <span class="cover-emoji" style="${b.coverUrl ? 'display:none' : ''}">${b.fallback}</span>
      </div>
      <div class="book-item-body">
        <p class="book-item-title">${b.title}</p>
        <p class="book-item-author">by ${b.author}</p>
        <div class="book-meta">
          <span class="genre-pill">${b.genre}</span>
          <span class="book-rating-sm">★ ${b.rating}</span>
          <span style="font-size:.7rem;color:var(--ink-3)">${(b.reviews/1000).toFixed(1)}k reviews</span>
        </div>
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════════════════
   RENDER: SOCIAL FEED (book reviews / reading posts)
══════════════════════════════════════════════════════════ */
function renderSocial() {
  socialGrid.innerHTML = POSTS.map(p => `
    <div class="social-card" data-id="${p.id}">
      <div class="social-post-img ${!p.coverUrl ? 'no-cover' : ''}" style="background:${p.imgBg}">
        ${p.coverUrl
          ? `<img src="${p.coverUrl}" alt="${p.bookTitle}" loading="lazy"
                  onerror="this.style.display='none';this.parentNode.classList.add('no-cover')" />`
          : ''}
        <span class="post-emoji">${p.postEmoji}</span>
      </div>
      <div class="social-body">
        <div class="social-user">
          <div class="avatar" style="background:${p.avatarBg}">${p.avatar}</div>
          <div class="user-info">
            <strong>${p.user}</strong>
            <span>${p.handle} · ${p.time}</span>
          </div>
        </div>
        <span class="book-tag">📖 ${p.bookTitle}</span>
        <p class="social-text">${p.text}</p>
        <div class="social-actions">
          <button class="social-action-btn like-btn ${p.liked ? 'liked' : ''}" data-id="${p.id}">
            <svg viewBox="0 0 24 24" fill="${p.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span class="like-count">${p.likes}</span>
          </button>
          <button class="social-action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>${p.comments}</span>
          </button>
          <button class="social-action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>`).join('');

  /* Like interactions */
  socialGrid.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const post    = POSTS.find(p => p.id === parseInt(btn.dataset.id));
      const countEl = btn.querySelector('.like-count');
      const heart   = btn.querySelector('path');
      post.liked    = !post.liked;
      post.likes   += post.liked ? 1 : -1;
      countEl.textContent = post.likes;
      btn.classList.toggle('liked', post.liked);
      heart.setAttribute('fill', post.liked ? 'currentColor' : 'none');
      if (post.liked) {
        btn.style.transform = 'scale(1.28)';
        setTimeout(() => btn.style.transform = '', 250);
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════
   RENDER: CHAT PREVIEW (book club)
══════════════════════════════════════════════════════════ */
function renderChat() {
  chatPreview.innerHTML = CHAT_MESSAGES.map((msg, i) => `
    <div class="chat-msg ${msg.own ? 'own' : ''}" style="animation-delay:${i * .12}s">
      <div class="chat-avatar" style="background:${msg.avatarBg}">${msg.avatar}</div>
      <div class="chat-bubble">${msg.text}</div>
    </div>`).join('');

  setTimeout(simulateChatTyping, 2000);
}

function simulateChatTyping() {
  const dots = document.createElement('div');
  dots.className = 'chat-msg';
  dots.innerHTML = `
    <div class="chat-avatar" style="background:#f0e8c8">📖</div>
    <div class="chat-bubble" style="display:flex;gap:5px;align-items:center;font-size:1.2rem;letter-spacing:2px">
      <span style="animation:fadeUp .3s .0s both;display:inline-block">·</span>
      <span style="animation:fadeUp .3s .1s both;display:inline-block">·</span>
      <span style="animation:fadeUp .3s .2s both;display:inline-block">·</span>
    </div>`;
  chatPreview.appendChild(dots);
  chatPreview.scrollTop = chatPreview.scrollHeight;

  setTimeout(() => {
    dots.remove();
    const msg = document.createElement('div');
    msg.className = 'chat-msg';
    msg.innerHTML = `
      <div class="chat-avatar" style="background:#f0e8c8">📖</div>
      <div class="chat-bubble">Omar — just ordered Dune from Folio 🚀 finally joining!</div>`;
    chatPreview.appendChild(msg);
    chatPreview.scrollTop = chatPreview.scrollHeight;
  }, 1500);
}

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

function setupReveal() {
  document.querySelectorAll('.section-header, .books-featured, .book-item, .chat-cta-text').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    revealObserver.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
function init() {
  renderProducts();
  renderBooks();
  renderSocial();
  renderChat();
  setupReveal();
}

document.addEventListener('DOMContentLoaded', init);