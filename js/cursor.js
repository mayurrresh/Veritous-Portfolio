// ── CURSOR (disabled automatically over inputs / on touch) ───────────
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    const label = document.getElementById('cursor-label');
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
      ring.style.left = mx + 'px';
      ring.style.top = my + 'px';
      label.style.left = mx + 'px';
      label.style.top = my + 'px';
    });
    document.querySelectorAll('a, button, .service-card, .project-card, .testi-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'var(--indigo)';
        ring.style.width = '54px';
        ring.style.height = '54px';
        ring.style.borderColor = 'rgba(0,212,255,0.6)';
        const txt = el.getAttribute('data-cursor');
        if (txt) { label.textContent = txt; label.style.opacity = '1'; }
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.background = 'var(--cyan)';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(108,99,255,0.5)';
        label.style.opacity = '0';
      });
    });
    // Disable custom cursor over text inputs so it doesn't fight the I-beam
    document.querySelectorAll('input').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-disabled'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-disabled'));
    });