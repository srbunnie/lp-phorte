(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollBehavior = () => reduceMotion.matches ? "auto" : "smooth";

  const hero = document.querySelector("[data-hero-carousel]");
  if (hero) {
    const slides = [...hero.querySelectorAll("[data-hero-slide]")];
    let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    let timer = 0;
    let pointerStartX = null;
    let paused = document.hidden;

    const showSlide = (index) => {
      if (!slides.length) return;
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => {
        const isActive = position === active;
        slide.classList.toggle("is-active", position === active);
        slide.classList.toggle("is-prev", position === (active - 1 + slides.length) % slides.length);
        slide.classList.toggle("is-next", position === (active + 1) % slides.length);
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "slide");
        slide.setAttribute("aria-label", `${position + 1} de ${slides.length}`);
        slide.inert = !isActive;
      });
    };

    const stopAutoplay = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const startAutoplay = () => {
      stopAutoplay();
      if (paused || reduceMotion.matches || slides.length < 2) return;
      timer = window.setInterval(() => showSlide(active + 1), 5000);
    };
    const move = (direction) => {
      showSlide(active + direction);
      startAutoplay();
    };

    hero.querySelector("[data-hero-prev]")?.addEventListener("click", () => move(-1));
    hero.querySelector("[data-hero-next]")?.addEventListener("click", () => move(1));
    hero.addEventListener("pointerenter", () => { paused = true; stopAutoplay(); });
    hero.addEventListener("pointerleave", () => { paused = document.hidden; startAutoplay(); });
    hero.addEventListener("focusin", () => { paused = true; stopAutoplay(); });
    hero.addEventListener("focusout", (event) => {
      if (!hero.contains(event.relatedTarget)) { paused = document.hidden; startAutoplay(); }
    });
    hero.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    });
    hero.addEventListener("pointerdown", (event) => {
      if (event.target.closest("a, button")) return;
      pointerStartX = event.clientX;
    });
    hero.addEventListener("pointerup", (event) => {
      if (pointerStartX === null) return;
      const deltaX = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(deltaX) > 44) move(deltaX < 0 ? 1 : -1);
    });
    hero.addEventListener("pointercancel", () => { pointerStartX = null; });
    document.addEventListener("visibilitychange", () => {
      paused = document.hidden || hero.matches(":hover") || hero.contains(document.activeElement);
      startAutoplay();
    });
    reduceMotion.addEventListener?.("change", startAutoplay);
    showSlide(active);
    startAutoplay();
  }

  document.querySelectorAll("[data-scroll-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    if (!track) return;
    const cards = [...track.children];
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dots = [...(carousel.querySelector("[data-carousel-dots]")?.querySelectorAll("button") ?? [])];
    let autoplayTimer = 0;
    let hovering = carousel.matches(":hover");
    let focused = carousel.contains(document.activeElement);
    let pointerDown = false;
    const gap = () => Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = () => {
      const first = cards[0];
      if (!first) return track.clientWidth;
      return first.getBoundingClientRect().width + gap();
    };
    const lastStart = () => Math.max(0, Math.ceil((track.scrollWidth - track.clientWidth) / Math.max(step(), 1) - 0.01));
    const goTo = (index) => {
      const boundedIndex = Math.max(0, Math.min(lastStart(), index));
      track.scrollTo({ left: boundedIndex * step(), behavior: scrollBehavior() });
    };
    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    };
    const startAutoplay = () => {
      stopAutoplay();
      if (document.hidden || hovering || focused || pointerDown || reduceMotion.matches || lastStart() === 0) return;
      autoplayTimer = window.setInterval(() => {
        const end = lastStart();
        const current = Math.min(end, Math.round(track.scrollLeft / Math.max(step(), 1)));
        goTo(current >= end ? 0 : current + 1);
      }, 4800);
    };
    let frame = 0;
    const updateDots = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const end = lastStart();
        const index = Math.min(end, Math.round(track.scrollLeft / Math.max(step(), 1)));
        dots.forEach((dot, dotIndex) => { dot.hidden = dotIndex > end; });
        dots.forEach((dot, dotIndex) => {
          if (dotIndex === index) dot.setAttribute("aria-current", "true");
          else dot.removeAttribute("aria-current");
        });
        if (previous) previous.disabled = index <= 0;
        if (next) next.disabled = index >= end;
        carousel.classList.toggle("is-static", end === 0);
      });
    };
    carousel.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") return;
      hovering = true;
      stopAutoplay();
    });
    carousel.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "touch") return;
      hovering = false;
      startAutoplay();
    });
    carousel.addEventListener("focusin", () => { focused = true; stopAutoplay(); });
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) { focused = false; startAutoplay(); }
    });
    carousel.addEventListener("pointerdown", () => { pointerDown = true; stopAutoplay(); });
    const releasePointer = () => {
      if (!pointerDown) return;
      pointerDown = false;
      startAutoplay();
    };
    window.addEventListener("pointerup", releasePointer, true);
    window.addEventListener("pointercancel", releasePointer, true);
    previous?.addEventListener("click", () => goTo(Math.round(track.scrollLeft / Math.max(step(), 1)) - 1));
    next?.addEventListener("click", () => goTo(Math.round(track.scrollLeft / Math.max(step(), 1)) + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => goTo(index)));
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); goTo(Math.round(track.scrollLeft / Math.max(step(), 1)) - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); goTo(Math.round(track.scrollLeft / Math.max(step(), 1)) + 1); }
    });
    track.addEventListener("scroll", updateDots, { passive: true });
    window.addEventListener("resize", () => { updateDots(); startAutoplay(); });
    document.addEventListener("visibilitychange", startAutoplay);
    reduceMotion.addEventListener?.("change", startAutoplay);
    const observer = new ResizeObserver(() => { updateDots(); startAutoplay(); });
    observer.observe(track);
    updateDots();
    startAutoplay();
  });

  const gallery = document.querySelector("[data-structure-gallery]");
  if (gallery) {
    const mainImage = gallery.querySelector("[data-gallery-main]");
    const thumbs = [...gallery.querySelectorAll("[data-gallery-thumb]")];
    let active = Math.max(0, thumbs.findIndex((thumb) => thumb.classList.contains("is-active")));
    let autoplayTimer = 0;
    let hovering = gallery.matches(":hover");
    let focused = gallery.contains(document.activeElement);
    let pointerDown = false;
    const showImage = (index) => {
      if (!thumbs.length || !mainImage) return;
      active = (index + thumbs.length) % thumbs.length;
      const thumb = thumbs[active];
      mainImage.src = thumb.dataset.src;
      mainImage.alt = thumb.dataset.alt || "";
      thumbs.forEach((item, position) => {
        const selected = position === active;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    };
    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    };
    const startAutoplay = () => {
      stopAutoplay();
      if (document.hidden || hovering || focused || pointerDown || reduceMotion.matches || thumbs.length < 2) return;
      autoplayTimer = window.setInterval(() => showImage(active + 1), 4200);
    };
    gallery.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") return;
      hovering = true;
      stopAutoplay();
    });
    gallery.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "touch") return;
      hovering = false;
      startAutoplay();
    });
    gallery.addEventListener("focusin", () => { focused = true; stopAutoplay(); });
    gallery.addEventListener("focusout", (event) => {
      if (!gallery.contains(event.relatedTarget)) { focused = false; startAutoplay(); }
    });
    gallery.addEventListener("pointerdown", () => { pointerDown = true; stopAutoplay(); });
    const releasePointer = () => {
      if (!pointerDown) return;
      pointerDown = false;
      startAutoplay();
    };
    window.addEventListener("pointerup", releasePointer, true);
    window.addEventListener("pointercancel", releasePointer, true);
    gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => showImage(active - 1));
    gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => showImage(active + 1));
    thumbs.forEach((thumb, index) => thumb.addEventListener("click", () => showImage(index)));
    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); showImage(active - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showImage(active + 1); }
    });
    document.addEventListener("visibilitychange", startAutoplay);
    reduceMotion.addEventListener?.("change", startAutoplay);
    startAutoplay();
  }

  document.querySelectorAll("[data-typewriter]").forEach((writer) => {
    const words = [...writer.querySelectorAll("[data-typewriter-word]")];
    if (!words.length || reduceMotion.matches) return;
    const fullWords = words.map((word) => word.textContent.trim());
    let started = false;
    const typeWords = () => {
      if (started) return;
      started = true;
      writer.dataset.typing = "true";
      words.forEach((word) => { word.textContent = ""; });
      let wordIndex = 0;
      let characterIndex = 0;
      const typeNext = () => {
        const word = words[wordIndex];
        word.textContent = fullWords[wordIndex].slice(0, characterIndex + 1);
        characterIndex += 1;
        if (characterIndex >= fullWords[wordIndex].length) {
          wordIndex += 1;
          characterIndex = 0;
          if (wordIndex >= words.length) {
            delete writer.dataset.typing;
            return;
          }
          window.setTimeout(typeNext, 180);
          return;
        }
        window.setTimeout(typeNext, 34);
      };
      typeNext();
    };
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          typeWords();
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(writer);
    } else {
      typeWords();
    }
  });

  const phone = document.querySelector('input[name="telefone"]');
  phone?.addEventListener("input", () => {
    const digits = phone.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    phone.value = formatted;
  });

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector("[data-form-note]");
      if (note) {
        note.hidden = false;
        note.focus?.();
      }
    });
  });
})();
