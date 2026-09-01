document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationPresets = {
    "fade-in": {
      keyframes: [
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      options: { duration: 700, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "forwards" }
    },
    "slide-up": {
      keyframes: [
        { opacity: 0, transform: "translateY(40px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      options: { duration: 750, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "forwards" }
    },
    "zoom-in": {
      keyframes: [
        { opacity: 0, transform: "scale(0.95)" },
        { opacity: 1, transform: "scale(1)" }
      ],
      options: { duration: 650, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)", fill: "forwards" }
    },
    "slide-left": {
      keyframes: [
        { opacity: 0, transform: "translateX(40px)" },
        { opacity: 1, transform: "translateX(0)" }
      ],
      options: { duration: 700, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "forwards" }
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const presetName = element.dataset.animate || "fade-in";
      const delay = Number(element.dataset.animateDelay) || 0;
      const preset = animationPresets[presetName] || animationPresets["fade-in"];

      if (prefersReducedMotion) {
        element.style.opacity = "1";
        element.style.transform = "none";
      } else {
        element.animate(preset.keyframes, { ...preset.options, delay });
      }

      observer.unobserve(element);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll("[data-animate]").forEach((element) => {
    element.style.opacity = "0";
    element.style.willChange = "opacity, transform";
    observer.observe(element);
  });
});
