document.addEventListener("DOMContentLoaded", () => {

    if (typeof initNavbar === "function") initNavbar();
    if (typeof initCursor === "function") initCursor();
    if (typeof initMagneticButtons === "function") initMagneticButtons();
    if (typeof initThreeBackground === "function") initThreeBackground();
    if (typeof initCounters === "function") initCounters();
    if (typeof initReveal === "function") initReveal();
    if (typeof initTicker === "function") initTicker();
    if (typeof initMarquee === "function") initMarquee();
    if (typeof initTilt === "function") initTilt();
    if (typeof initFAQ === "function") initFAQ();

});