   (function () {
    /**************** 1. SCROLL‑REVEAL ****************/
    const revealEls = document.querySelectorAll('[class*="reveal"]');
    const revIO = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-visible');
            revIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(el => revIO.observe(el));
  
    /**************** 2. CARD TILT ********************/
    const tiltEls = document.querySelectorAll('.tilt');
    tiltEls.forEach(card => {
      const damp = parseFloat(card.dataset.tiltDamp || 20); // customise speed with data-tilt-damp="30"
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform .18s ease-out';
  
      card.addEventListener('mousemove', e => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const x = (e.clientX - left) - width / 2;
        const y = (e.clientY - top) - height / 2;
        card.style.transform = `rotateX(${(-y / damp).toFixed(2)}deg) rotateY(${(x / damp).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    });
  
    /**************** 3. RIPPLE EFFECT ****************/
    document.addEventListener('click', e => {
      const target = e.target.closest('.ripple');
      if (!target) return;
  
      const rect   = target.getBoundingClientRect();
      const circle = document.createElement('span');
      const size   = Math.max(rect.width, rect.height);
  
      circle.className = 'ripple-circle';
      Object.assign(circle.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        left: `${e.clientX - rect.left - size / 2}px`,
        top: `${e.clientY - rect.top - size / 2}px`,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.35)',
        transform: 'scale(0)',
        animation: 'ripple 0.6s linear',
        pointerEvents: 'none'
      });
      target.style.position = 'relative';
      target.style.overflow = 'hidden';
      target.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  
    /**************** 4. PARALLAX *********************/
    const parallaxEls = document.querySelectorAll('.parallax');
    const pxRatio = 0.2; // depth (lower = slower)
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed || pxRatio);
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  
    /**************** 5. HOVER GLOW *******************/
    const glowEls = document.querySelectorAll('.hover-glow');
    glowEls.forEach(el => {
      el.style.transition = 'box-shadow .3s';
      el.addEventListener('mouseenter', () => {
        el.style.boxShadow = '0 0 12px 4px rgba(0,188,212,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.boxShadow = 'none';
      });
    });
  
    /**************** 6. KEYFRAMES (auto‑inject) *****/
    const styleTag = document.createElement('style');
    styleTag.textContent = `
    .reveal{opacity:0;transform:translateY(40px);}
    .reveal-up   {transform:translateY(40px);}  .reveal-down {transform:translateY(-40px);}  .reveal-left {transform:translateX(-40px);}  .reveal-right{transform:translateX(40px);}  .reveal-scale{transform:scale(.8);}  
    .reveal-visible{opacity:1;transform:none;transition:all .7s ease-out;}
    @keyframes ripple{to{transform:scale(2.2);opacity:0;}}
    `;
    document.head.appendChild(styleTag);
  })();
  