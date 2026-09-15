document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar-guia");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const initAOS = (typeof AOS !== "undefined");
  if (initAOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }

  document.querySelectorAll("[data-bs-toggle='tooltip']").forEach(el => {
    if (typeof bootstrap !== "undefined" && bootstrap.Tooltip) {
      new bootstrap.Tooltip(el);
    }
  });

  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          const duration = 1600;
          const start = performance.now();
          const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(target * progress).toLocaleString("es");
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString("es");
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => observer.observe(el));
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const onScrollBt = () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    };
    window.addEventListener("scroll", onScrollBt, { passive: true });
    onScrollBt();
    backToTop.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});