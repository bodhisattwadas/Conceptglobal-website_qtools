/**
 * Quantum Tools and Services (QTS) — Dynamic Site Interactions
 * Cleanroom & Reticle Precision Standard (Pure Vanilla JS)
 */

function initQTS() {
  // ============================================================
  // 1. Mobile Menu Drawer Toggle
  // ============================================================
  const mobileBtn = document.querySelector('.qts-mobile-btn');
  const navMenu = document.querySelector('.qts-nav');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============================================================
  // 2. Hardware Stage Tab Switcher & Dynamic Hotspots
  // ============================================================
  const stageTabs = document.querySelectorAll('.qts-stage-tab');
  const stageImg = document.getElementById('qts-hero-img');
  const stageTitle = document.getElementById('qts-stage-title');
  const stageMeta = document.getElementById('qts-stage-meta');
  const hotspotsContainer = document.getElementById('qts-hotspots-container');

  const hardwareData = {
    'dac': {
      src: 'images/dactools_front.jpg',
      alt: 'Diamond Anvil Cell systems for high-pressure research',
      title: 'DIAMOND ANVIL CELLS & IN-SITU OPTICS',
      meta: 'UP TO 100+ GPa // CRYOGENIC & PPMS COMPATIBLE',
      hotspots: [
        {
          x: '28%', y: '42%',
          title: 'Piston-Cylinder Drive',
          desc: 'High-thrust guide pins ensuring precise uniaxial alignment under extreme loads.'
        },
        {
          x: '49%', y: '50%',
          title: 'Diamond Culet Anvils',
          desc: 'Type Ia/IIa gem-quality anvils (100–300 µm culets) generating static 100+ GPa.'
        },
        {
          x: '78%', y: '32%',
          title: 'Optical In-Situ Port',
          desc: 'Wide-angle conical aperture for Raman, infrared, and synchrotron X-ray probes.'
        },
        {
          x: '78%', y: '68%',
          title: 'Hardened Gasket Chamber',
          desc: 'Pre-indented rhenium/BeCu micro-chamber confining hydrostatic pressure medium.'
        }
      ]
    },
    'strain': {
      src: 'images/cryogenic_uniaxial_strain_cells.jpg',
      alt: 'Cryogenic uniaxial strain and stress cells',
      title: 'CRYOGENIC UNIAXIAL STRAIN CELLS',
      meta: 'SUB-MICRON PIEZO RESOLUTION // T < 4.2 K',
      hotspots: [
        {
          x: '30%', y: '35%',
          title: 'Piezoelectric Stack',
          desc: 'Precision actuators enabling continuous bidirectional compressive/tensile deformation.'
        },
        {
          x: '55%', y: '60%',
          title: 'Symmetric Flexure Springs',
          desc: 'Balanced mechanical flexures preventing sample buckling and parasitic shear forces.'
        },
        {
          x: '75%', y: '40%',
          title: 'Capacitive Displacement Sensor',
          desc: 'Integrated sub-nanometer capacitive gauge providing real-time calibrated load readouts.'
        }
      ]
    }
  };

  function renderHotspots(key) {
    if (!hotspotsContainer || !hardwareData[key]) return;
    hotspotsContainer.innerHTML = '';

    hardwareData[key].hotspots.forEach(spot => {
      const spotEl = document.createElement('div');
      spotEl.className = 'qts-hotspot';
      spotEl.style.left = spot.x;
      spotEl.style.top = spot.y;
      spotEl.setAttribute('tabindex', '0');
      spotEl.setAttribute('role', 'button');
      spotEl.setAttribute('aria-label', spot.title);

      spotEl.innerHTML = `
        <div class="qts-hotspot-ring"></div>
        <div class="qts-hotspot-pin"></div>
        <div class="qts-hotspot-tooltip">
          <strong>${spot.title}</strong>
          <p>${spot.desc}</p>
        </div>
      `;
      hotspotsContainer.appendChild(spotEl);
    });
  }

  if (stageTabs.length && stageImg) {
    // Initial hotspots render
    renderHotspots('dac');

    stageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        if (!target || !hardwareData[target]) return;

        stageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Smooth transition
        stageImg.style.opacity = '0.2';
        if (hotspotsContainer) hotspotsContainer.style.opacity = '0';

        setTimeout(() => {
          stageImg.src = hardwareData[target].src;
          stageImg.alt = hardwareData[target].alt;
          if (stageTitle) stageTitle.textContent = hardwareData[target].title;
          if (stageMeta) stageMeta.textContent = hardwareData[target].meta;
          renderHotspots(target);
          stageImg.style.opacity = '1';
          if (hotspotsContainer) hotspotsContainer.style.opacity = '1';
        }, 150);
      });
    });
  }

  // ============================================================
  // 3. Dynamic Cursor Reticle Coordinate Tracker (Hero Stage)
  // ============================================================
  const heroStage = document.querySelector('.qts-hero-stage');
  const coordDisplay = document.getElementById('qts-reticle-coords');

  if (heroStage && coordDisplay) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 200 - 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 200 - 100).toFixed(1);
      coordDisplay.textContent = `X: ${x > 0 ? '+' + x : x}µm · Y: ${y > 0 ? '+' + y : y}µm`;
    });

    heroStage.addEventListener('mouseleave', () => {
      coordDisplay.textContent = `ALIGN: 0.00µm · 0.00µm`;
    });
  }

  // ============================================================
  // 4. Interactive Wafer-Die Platform Filter (Homepage)
  // ============================================================
  const filterBtns = document.querySelectorAll('.qts-filter-btn');
  const productCards = document.querySelectorAll('.qts-product-grid .qts-card');

  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          card.classList.remove('is-filtering');

          if (filter === 'all' || category === filter) {
            card.classList.remove('is-hidden');
            void card.offsetWidth; // Trigger reflow for animation
            card.classList.add('is-filtering');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ============================================================
  // 5. Scroll-Triggered Metric Counter Animation
  // ============================================================
  const counterElements = document.querySelectorAll('.qts-counter');

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    const isFloat = (el.getAttribute('data-target') || '').includes('.');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1600;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (target - start) * ease;

      el.textContent = `${prefix}${isFloat ? current.toFixed(1) : Math.round(current)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  if (counterElements.length) {
    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      counterElements.forEach(el => counterObserver.observe(el));
    } else {
      counterElements.forEach(el => animateCounter(el));
    }
  }

  // ============================================================
  // 6. Scroll-Triggered Reveal Animations
  // ============================================================
  const revealElements = document.querySelectorAll('.qts-reveal');

  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ============================================================
  // 7. Accessible Dropdown for Mobile / Touch
  // ============================================================
  const dropdownTrigger = document.querySelector('.qts-dropdown-trigger > .qts-nav-link');
  const dropdownPanel = document.querySelector('.qts-dropdown-panel');
  if (dropdownTrigger && dropdownPanel) {
    dropdownTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownPanel.style.display = dropdownPanel.style.display === 'block' ? 'none' : 'block';
      }
    });
  }
}

// Support both early and late loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQTS);
} else {
  initQTS();
}

window.initQTS = initQTS;
