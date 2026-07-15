// ── SCROLL REVEAL ───────────────────────────────────────────────────
    const revealEls = document.querySelectorAll('.reveal');
    const counterEls = document.querySelectorAll('.stat-num[data-target]');
    const counterTriggered = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterTriggered.has(entry.target)) {
          counterTriggered.add(entry.target);
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    revealEls.forEach(el => observer.observe(el));
    counterEls.forEach(el => counterObserver.observe(el));