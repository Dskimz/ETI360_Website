/* ═══════════════════════════════════════════════════════════════════
   ETI360 User Guide System — shared behavior for all four guides.
   One file so the guides never drift apart.
   Adapted from the Hearts of Patriots guide system (Emerge Inc.).
   ═══════════════════════════════════════════════════════════════════ */

/* ── Section expand / collapse ── */
function toggle(headerEl) {
  headerEl.parentElement.classList.toggle('open');
}
function toggleAll(open) {
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('open', open));
}

/* ── Screenshots not yet captured ──
   Show a labelled placeholder rather than a broken image icon. Once the
   capture script produces the file it simply renders. */
document.querySelectorAll('.img-wrap img').forEach(img => {
  img.addEventListener('error', () => {
    img.classList.add('pending');
    const next = img.nextElementSibling;
    if (!next || !next.classList.contains('pending-note')) {
      const note = document.createElement('span');
      note.className = 'pending-note';
      note.textContent = 'Screenshot pending — run the capture script to generate it';
      img.after(note);
    }
  });
  img.addEventListener('load', () => img.classList.remove('pending'));
});

/* ── Mobile drawer ── */
const sidebar = document.querySelector('.sidebar');
const scrim = document.querySelector('.nav-scrim');
function openNav()  { sidebar?.classList.add('open');  scrim?.classList.add('open'); }
function closeNav() { sidebar?.classList.remove('open'); scrim?.classList.remove('open'); }
function toggleNav() { sidebar?.classList.contains('open') ? closeNav() : openNav(); }
scrim?.addEventListener('click', closeNav);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

/* ── Sidebar links ──
   Only in-page links are hijacked; cross-guide links carry an href and
   no data-target, and must navigate normally. */
document.querySelectorAll('.nav-link[data-target]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const el = document.getElementById(link.dataset.target);
    if (!el) return;
    el.classList.add('open');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    closeNav();
  });
});

/* ── Search ──
   Filters the sidebar and the sections, highlights matches. Plain
   substring matching — the guides are small enough that anything
   cleverer is harder to predict than it is useful. */
const searchInput = document.getElementById('guide-search');
const searchCount = document.getElementById('search-count');
const sections = [...document.querySelectorAll('.section')];

const originalHTML = new Map();
sections.forEach(s => {
  const body = s.querySelector('.section-body');
  if (body) originalHTML.set(s.id, body.innerHTML);
});

function clearHighlights() {
  sections.forEach(s => {
    const body = s.querySelector('.section-body');
    if (body && originalHTML.has(s.id)) body.innerHTML = originalHTML.get(s.id);
  });
  document.querySelectorAll('.img-wrap img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) img.classList.add('pending');
  });
}

function escapeRe(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function highlightIn(node, re) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = n.parentElement;
      if (!p || p.closest('script, style, mark')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const targets = [];
  let n;
  while ((n = walker.nextNode())) if (re.test(n.nodeValue)) targets.push(n);
  targets.forEach(textNode => {
    const span = document.createElement('span');
    span.innerHTML = textNode.nodeValue.replace(re, m => `<mark class="hit">${m}</mark>`);
    textNode.replaceWith(span);
  });
}

function runSearch(qRaw) {
  const q = qRaw.trim();
  clearHighlights();
  document.querySelector('.no-results')?.remove();

  if (q.length < 2) {
    sections.forEach(s => s.classList.remove('search-hidden'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('search-hidden'));
    if (searchCount) searchCount.textContent = '';
    return;
  }

  const re = new RegExp(escapeRe(q), 'gi');
  let hits = 0;

  sections.forEach(s => {
    const match = new RegExp(escapeRe(q), 'i').test(s.textContent || '');
    s.classList.toggle('search-hidden', !match);
    const link = document.querySelector(`.nav-link[data-target="${s.id}"]`);
    link?.classList.toggle('search-hidden', !match);
    if (match) {
      hits++;
      s.classList.add('open');
      const body = s.querySelector('.section-body');
      if (body) highlightIn(body, re);
      const title = s.querySelector('.section-title');
      if (title) highlightIn(title, new RegExp(escapeRe(q), 'gi'));
    }
  });

  if (searchCount) {
    searchCount.textContent = hits ? `${hits} section${hits === 1 ? '' : 's'} match "${q}"` : '';
  }

  if (!hits) {
    const content = document.querySelector('.content');
    const msg = document.createElement('div');
    msg.className = 'no-results';
    msg.innerHTML = `<p>Nothing matches <strong>"${q.replace(/</g, '&lt;')}"</strong>.</p>
                     <p>Try a shorter word — searching is literal.</p>`;
    content?.appendChild(msg);
  }
}

let searchTimer;
searchInput?.addEventListener('input', e => {
  clearTimeout(searchTimer);
  const v = e.target.value;
  searchTimer = setTimeout(() => runSearch(v), 140);
});
searchInput?.addEventListener('keydown', e => {
  if (e.key === 'Escape') { e.target.value = ''; runSearch(''); }
});
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    openNav();
    searchInput?.focus();
  }
});

/* ── Deep links — #wf-start-trip opens and scrolls to that section ── */
{
  const target = location.hash.slice(1);
  const el = target && document.getElementById(target);
  if (el && el.classList.contains('section')) {
    el.classList.add('open');
    document.querySelector(`.nav-link[data-target="${target}"]`)?.classList.add('active');
    const jump = () => el.scrollIntoView({ block: 'start' });
    setTimeout(jump, 60);
    if (document.readyState === 'complete') setTimeout(jump, 250);
    else window.addEventListener('load', () => setTimeout(jump, 60), { once: true });
    if (document.hidden) {
      document.addEventListener('visibilitychange',
        () => { if (!document.hidden) setTimeout(jump, 60); }, { once: true });
    }
  }
}

/* ── Active section tracking on scroll ── */
const topTitle = document.getElementById('top-title');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.target === id);
    });
    const title = entry.target.querySelector('.section-title')?.textContent;
    if (title && topTitle) topTitle.textContent = title;
  });
}, { rootMargin: '-100px 0px -60% 0px' });
sections.forEach(s => observer.observe(s));
