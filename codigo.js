document.getElementById("year").textContent = new Date().getFullYear();

      // mobile nav toggle
      const toggle = document.querySelector(".nav-toggle");
      const nav = document.querySelector(".main-nav");
      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          const isOpen = nav.classList.toggle("open");
          toggle.setAttribute("aria-expanded", isOpen);
        });
        nav.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
          });
        });
      }

      // scroll reveal (progressive enhancement)
      const revealEls = document.querySelectorAll("[data-reveal]");
      if ("IntersectionObserver" in window && revealEls.length) {
        document.body.classList.add("js-ready");
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        revealEls.forEach((el) => io.observe(el));
      }
