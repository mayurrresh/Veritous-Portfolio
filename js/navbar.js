 // ── SCROLL PROGRESS + NAV STATE ──────────────────────────────────────
    const progress = document.getElementById('progress');
    const navEl = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = scrolled + '%';
      navEl.classList.toggle('scrolled', h.scrollTop > 40);
    }, { passive: true });