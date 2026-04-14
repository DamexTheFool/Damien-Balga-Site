
// =========================
// 0. INTRO NETFLIX FLICKER (AUTO REMOVE)
// =========================
window.addEventListener("load", () => {
    const intro = document.querySelector(".intro");
  
    if (intro) {
      setTimeout(() => {
        intro.style.opacity = "0";
        intro.style.transition = "opacity 0.8s ease";
  
        setTimeout(() => {
          intro.remove();
        }, 800);
  
      }, 2500);
    }
  });
  
  
  // =========================
  // 1. FADE IN SCROLL (PRO + STABLE)
  // =========================
  const revealItems = document.querySelectorAll(
    '.project, .about, .compare, .contact, .showcase'
  );
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.15 });
  
  revealItems.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 1s ease";
    revealObserver.observe(el);
  });
  
  
  // =========================
  // 2. SMOOTH SCROLL NAV (CLEAN)
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const target = document.querySelector(this.getAttribute('href'));
  
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  
  // =========================
  // 3. BEFORE / AFTER (AUTO + CONTROL PRO)
  // =========================
  const compares = document.querySelectorAll('.compare');
  
  compares.forEach(container => {
  
    const slider = container.querySelector('.slider');
    const after = container.querySelector('.img-after');
  
    let isHover = false;
    let auto = 50;
    let dir = 1;
  
    const set = (percent) => {
      after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      slider.style.left = percent + "%";
    };
  
    container.addEventListener('mousemove', (e) => {
      isHover = true;
  
      const rect = container.getBoundingClientRect();
      let x = e.clientX - rect.left;
  
      x = Math.max(0, Math.min(x, rect.width));
  
      set((x / rect.width) * 100);
    });
  
    container.addEventListener('mouseleave', () => {
      isHover = false;
    });
  
    function loop() {
      if (!isHover) {
        auto += dir * 0.25;
  
        if (auto >= 100) dir = -1;
        if (auto <= 0) dir = 1;
  
        set(auto);
      }
  
      requestAnimationFrame(loop);
    }
  
    loop();
  });
  
  
  // =========================
  // 4. LOGO → SCROLL TOP (SAFE)
  // =========================
  const logo = document.getElementById("logo");
  
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
  
  
  // =========================
  // 5. VIMEO LAZY LOAD (SAFE)
  // =========================
  const videos = document.querySelectorAll('.project iframe');
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iframe = entry.target;
  
      if (entry.isIntersecting && iframe.dataset.src && !iframe.src) {
        iframe.src = iframe.dataset.src;
      }
    });
  }, { threshold: 0.5 });
  
  videos.forEach(v => videoObserver.observe(v));
  

const footer = document.querySelector(".linktree");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footer.classList.add("show");
    }
  });
});

observer.observe(footer);

const projects = document.querySelectorAll(".project");

projects.forEach(project => {
  const iframe = project.querySelector("iframe");

  // charge la vidéo
  iframe.src = iframe.dataset.src;

  // quand iframe est prêt
  iframe.onload = () => {
    project.classList.add("loaded");
  };
});
