// ── COUNTER ANIMATION ───────────────────────────────────────────────
    function animateCounter(el) {
      const target = parseInt(el.dataset.target);
      const suffix = target === 100 ? '%' : '+';
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }