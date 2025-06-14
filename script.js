/* --------------  script.js -------------- */
document.addEventListener('DOMContentLoaded', () => {

    /* ===== 1. NAVBAR ACTIVE LINK ===== */
    const currentFile = (() => {
      // e.g. "/portfolio/about.html?foo=1" → "about.html"
      const path = window.location.pathname.split('/').pop() || 'index.html';
      return path.split('?')[0].split('#')[0];
    })();
  
    document.querySelectorAll('.navbar a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentFile || (href === 'index.html' && currentFile === '')) {
        link.classList.add('active');
      }
    });
  
    /* ===== 2. MOBILE‑MENU TOGGLE ===== */
    const menuBtn   = document.getElementById('menu-toggle');
    const navBar    = document.querySelector('.navbar');
    if (menuBtn && navBar) {
      menuBtn.addEventListener('click', () => {
        navBar.classList.toggle('active');
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
      });
    }
  
    /* ===== 3. TYPING EFFECT (Home only) ===== */
    const typingSpan = document.querySelector('.text');
    if (typingSpan) {
      const roles   = ['Data Scientist', 'Software Developer', 'Tech Enthusiast', 'Lifelong Learner'];
      let idx = 0, char = 0, typing = true;
  
      const tick = () => {
        if (typing) {
          if (char <= roles[idx].length) {
            typingSpan.textContent = roles[idx].slice(0, char++);
            setTimeout(tick, 100);
          } else {
            typing = false;
            setTimeout(tick, 2000);           // pause before erasing
          }
        } else {
          if (char >= 0) {
            typingSpan.textContent = roles[idx].slice(0, char--);
            setTimeout(tick, 50);
          } else {
            typing = true;
            idx = (idx + 1) % roles.length;
            setTimeout(tick, 250);
          }
        }
      };
      tick();
    }
  
    /* ===== 4. CONTACT FORM VALIDATION ===== */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      const name    = contactForm.elements['name'];
      const email   = contactForm.elements['email'];
      const message = contactForm.elements['message'];
  
      const emailOK = e => /^[\w-.]+@[\w-]+\.[\w-]{2,}$/.test(e);
      const showErr = (input, msg) => {
        let box = input.nextElementSibling;
        if (!box || !box.classList.contains('error-message')) {
          box = document.createElement('div');
          box.className = 'error-message';
          box.style.color = '#ff5252';
          box.style.fontSize = '0.9rem';
          box.style.marginTop = '4px';
          input.after(box);
        }
        box.textContent = msg;
      };
  
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        [...contactForm.querySelectorAll('.error-message')].forEach(el => (el.textContent = ''));
  
        let bad = false;
        if (!name.value.trim())        { showErr(name,    'Please enter your name.');        bad = true; }
        if (!email.value.trim())       { showErr(email,   'Please enter your email.');       bad = true; }
        else if (!emailOK(email.value)){ showErr(email,   'Enter a valid email address.');   bad = true; }
        if (!message.value.trim())     { showErr(message, 'Please enter your message.');     bad = true; }
  
        if (!bad) {
          toast('Thank you for reaching out! Your message has been sent.');
          contactForm.reset();
        }
      });
    }
  
    /* helper: success toast */
    function toast(text) {
      const div = document.createElement('div');
      div.textContent = text;
      Object.assign(div.style, {
        position:'fixed', top:'20px', right:'20px',
        background:'#4BB543', color:'#fff', padding:'15px 20px',
        borderRadius:'8px', boxShadow:'0 2px 10px rgba(0,0,0,.2)',
        zIndex:9999, opacity:0, transition:'opacity .5s'
      });
      document.body.appendChild(div);
      requestAnimationFrame(() => { div.style.opacity = 1; });
      setTimeout(() => { div.style.opacity = 0; setTimeout(() => div.remove(), 600); }, 3000);
    }
  
    /* ===== 5. SMOOTH SCROLL FOR #LINKS ===== */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior:'smooth', block:'start' });
          history.pushState(null, '', a.getAttribute('href'));
        }
      });
    });
  });
  /* ------------ end of script.js ------------ */
  