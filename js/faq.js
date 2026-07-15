 // ── FAQ ACCORDION ───────────────────────────────────────────────────
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(open => {
          if (open !== item) {
            open.classList.remove('open');
            open.querySelector('.faq-answer').style.maxHeight = null;
          }
        });
        item.classList.toggle('open', !isOpen);
        answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
      });
    });