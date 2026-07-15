
    // ── TECH TICKER ─────────────────────────────────────────────────────
    const techs = [
      { icon: '⚛️', name: 'React' },
      { icon: '▲', name: 'Next.js' },
      { icon: '🐍', name: 'Python' },
      { icon: '🟢', name: 'Node.js' },
      { icon: '🤖', name: 'OpenAI' },
      { icon: '🦜', name: 'LangChain' },
      { icon: '💾', name: 'PostgreSQL' },
      { icon: '⚡', name: 'Redis' },
      { icon: '🔷', name: 'TypeScript' },
      { icon: '🏗️', name: 'NestJS' },
      { icon: '🌩️', name: 'AWS' },
      { icon: '🐳', name: 'Docker' },
      { icon: '🔷', name: 'Prisma' },
      { icon: '💨', name: 'Tailwind CSS' },
      { icon: '📦', name: 'Stripe' },
      { icon: '🔍', name: 'Elasticsearch' },
    ];
    const ticker = document.getElementById('ticker');
    const doubleTechs = [...techs, ...techs];
    doubleTechs.forEach(t => {
      const item = document.createElement('div');
      item.className = 'ticker-item';
      item.innerHTML = `<span>${t.icon}</span>${t.name}`;
      ticker.appendChild(item);
    });