/* ============================================================
   Blossom Out Coaching & Consulting � Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -- NAVBAR: scroll shadow + active link -- */
  const navbar    = document.getElementById('navbar');
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('#navLinks a, #mobileDrawer a');

  function onScroll() {
    /* shadow */
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    /* active link */
    let current = 'home';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  


  /* -- HAMBURGER / MOBILE DRAWER -- */
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  /* Close drawer on link click */
  mobileDrawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });


  /* -- SCROLL REVEAL -- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* stagger siblings inside the same parent */
          const siblings = entry.target.parentElement
            ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
            : [];
          const delay = siblings.indexOf(entry.target) * 80;

          setTimeout(() => entry.target.classList.add('visible'), Math.max(0, delay));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* -- SERVICE MODAL -- */
  const serviceData = {
    school: {
      title: 'School Transformation Program',
      body: `
        <p>A comprehensive service designed to empower educational institutions and promote holistic growth. The program caters to all stakeholders within the school community.</p>
        <ul>
          <li><strong>School Directors</strong> � Strategic leadership, visionary planning, governance strategies</li>
          <li><strong>Management</strong> � Team management, performance evaluation, financial management</li>
          <li><strong>Teachers</strong> � Pedagogical excellence, classroom management, differentiated instruction</li>
          <li><strong>Support Staff</strong> � Teamwork and service training</li>
          <li><strong>PTA & Parents</strong> � Parent-school partnerships, parenting skills</li>
          <li><strong>Students</strong> � Character development, life skills, personal well-being</li>
        </ul>
      `
    },
    growing: {
      title: 'Growing and Loving It',
      body: `
        <p>A Christian-based program supporting children and teenagers in flourishing spiritually, emotionally, and socially.</p>
        <ul>
          <li><strong>Spiritual Development</strong> � Biblical principles, prayer, identity in Christ</li>
          <li><strong>Character Formation</strong> � Honesty, kindness, integrity, compassion</li>
          <li><strong>Emotional Well-being</strong> � Resilience, stress management, healthy coping</li>
          <li><strong>Life Skills</strong> � Communication, goal-setting, time management</li>
          <li><strong>Positive Relationships</strong> � Friendships, conflict resolution, family bonds</li>
        </ul>
        <p style="margin-top:1rem;">Delivered via <em>one-on-one mentorship</em> and the annual <strong>"Growing and Loving It Camp"</strong> held every December (5 days).</p>
      `
    },
    journey: {
      title: 'Journey with Dr. Ruth',
      body: `
        <p>A one-year mentorship program tailored for young adults (18�24) and young professionals (24�35), led personally by Dr. Ruth Muthei.</p>
        <ul>
          <li>Personal Development & Self-Awareness</li>
          <li>Career Planning, Resume Building & Interview Skills</li>
          <li>Leadership & Professional Skills</li>
          <li>Personal Branding & Networking</li>
          <li>Financial Literacy & Budgeting</li>
          <li>Work-Life Balance & Self-care</li>
          <li>Emotional Intelligence & Interpersonal Skills</li>
          <li>Mental Health & Stress Resilience</li>
          <li>Life Transitions & Decision Making</li>
        </ul>
      `
    },
    transition: {
      title: 'Transition Coaching',
      body: `
        <p>Personalized support through all of life's significant transitions � from childhood through retirement.</p>
        <ul>
          <li><strong>Childhood</strong> � Starting school, moving grade levels</li>
          <li><strong>Adolescence</strong> � Puberty, physical & emotional changes</li>
          <li><strong>Education</strong> � High school, college/university, graduation</li>
          <li><strong>Relationships</strong> � Marriage, parenthood, divorce/separation</li>
          <li><strong>Midlife</strong> � Career shifts, empty nest syndrome</li>
          <li><strong>Career</strong> � Job loss, resignation, relocation</li>
          <li><strong>Retirement</strong> � Pre-retirement planning, post-retirement life adjustment</li>
          <li><strong>Celebrity Status</strong> � Public figures & high-profile individuals</li>
        </ul>
      `
    },
    corporate: {
      title: 'Corporate Consulting Services',
      body: `
        <p>Comprehensive corporate consulting designed to enhance organizational effectiveness, productivity, and success.</p>
        <ul>
          <li><strong>Leadership Development</strong> � Customized programs for executives and managers</li>
          <li><strong>Team Building & Collaboration</strong> � Workshops to strengthen trust and communication</li>
          <li><strong>Organizational Effectiveness</strong> � Assessments, streamlined workflows, continuous improvement</li>
          <li><strong>Change Management</strong> � Guiding organizations through transitions</li>
          <li><strong>Talent Development & Succession Planning</strong> � Career paths, mentorship, training</li>
          <li><strong>Employee Engagement & Well-being</strong> � Motivation, work-life balance, positive culture</li>
        </ul>
      `
    }
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalIcon    = document.getElementById('modalIcon');
  const modalTitle   = document.getElementById('modalTitle');
  const modalBody    = document.getElementById('modalBody');
  const modalClose   = document.getElementById('modalClose');
  

  function openModal(key) {
    const data = serviceData[key];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML    = data.body;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-service]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.service));
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

 


  /* -- PACKAGES SUB-NAVBAR TABS -- */
  const pkgTabs   = document.querySelectorAll('.pkg-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(targetKey) {
    pkgTabs.forEach(t => {
      const isActive = t.dataset.tab === targetKey;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive);
    });

    tabPanels.forEach(p => {
      const isActive = p.id === 'tab-' + targetKey;
      p.classList.toggle('active', isActive);
    });

    /* animate pkg-cards inside newly active panel */
    const activePanel = document.getElementById('tab-' + targetKey);
    if (activePanel) {
      activePanel.querySelectorAll('.pkg-card').forEach((card, i) => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(18px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        }, i * 60);
      });
    }
  }

  pkgTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);

      /* scroll pkg-nav so active tab is visible */
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  /* Allow tab switching from main nav "Services" link � always opens first tab */
  document.querySelectorAll('a[href="#services"]').forEach(a => {
    a.addEventListener('click', () => {
      setTimeout(() => switchTab('school'), 400);
    });
  });

  /* keyboard arrow navigation on tabs */
  const pkgNav = document.getElementById('pkgNav');
  if (pkgNav) {
    pkgNav.addEventListener('keydown', e => {
      const tabs  = [...pkgTabs];
      const cur   = tabs.findIndex(t => t.classList.contains('active'));
      let next    = cur;
      if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
      if (next !== cur) {
        tabs[next].focus();
        switchTab(tabs[next].dataset.tab);
      }
    });
  }

  /* run once to animate initial tab cards */
  switchTab('school');

  /* -- CHAT LINKS: switch to correct service tab -- */
  document.querySelectorAll('.chat-link[data-tab]').forEach(link => {
    link.addEventListener('click', () => {
      const tab = link.dataset.tab;
      setTimeout(() => switchTab(tab), 400);
    });
  });


  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;

      /* Simulate sending */
      btn.innerHTML = '<span>Sending�</span>';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        contactForm.reset();
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1800);
    });
  }


  /* -- SOCIAL LINKS: open in new tab -- */
  document.querySelectorAll('.social-btn[data-url]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.open(btn.dataset.url, '_blank', 'noopener,noreferrer');
    });
  });


  /* -- SMOOTH SCROLL for all internal anchors -- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* -- FOUNDER IMAGE UPLOAD (click to replace placeholder) -- */
  document.querySelectorAll('.photo-hint').forEach(hint => {
    hint.addEventListener('click', () => {
      const input    = document.createElement('input');
      input.type     = 'file';
      input.accept   = 'image/*';
      const wrap     = hint.closest('.founder-photo-wrap');
      const placeholder = wrap.querySelector('.avatar-placeholder');

      input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        let img = wrap.querySelector('img');
        if (!img) {
          img = document.createElement('img');
          img.alt = 'Founder photo';
          if (placeholder) placeholder.style.display = 'none';
          wrap.insertBefore(img, hint);
        }
        img.src = url;
        img.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
      });

      input.click();
    });
  });


  /* -- CHAT POPUP -- */
  const chatFloat = document.getElementById('chatFloat');
  const chatFab   = document.getElementById('chatFab');
  const chatPopup = document.getElementById('chatPopup');
  const chatClose = document.getElementById('chatClose');

  if (chatFab && chatPopup) {
    chatFab.addEventListener('click', () => {
      chatPopup.classList.toggle('open');
    });
  }

  if (chatClose && chatPopup) {
    chatClose.addEventListener('click', () => {
      chatPopup.classList.remove('open');
    });
  }

  // close when clicking outside the whole chat widget
  document.addEventListener('click', (e) => {
    if (chatPopup && chatPopup.classList.contains('open') &&
        chatFloat && !chatFloat.contains(e.target)) {
      chatPopup.classList.remove('open');
    }
  });

});

