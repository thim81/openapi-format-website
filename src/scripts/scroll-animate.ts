const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1 },
);

document.querySelectorAll('[data-animate]').forEach((el) => {
  observer.observe(el);
});
