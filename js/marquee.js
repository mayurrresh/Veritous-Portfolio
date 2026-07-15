 // ── LOGO MARQUEE ─────────────────────────────────────────────────────
    const clients = ['QuickGPT', 'Managekaro', 'Volunteer Action Foundation'];
    const logoMarquee = document.getElementById('logoMarquee');
    [...clients, ...clients].forEach(name => {
      const item = document.createElement('div');
      item.className = 'logo-item';
      item.textContent = name;
      logoMarquee.appendChild(item);
    });