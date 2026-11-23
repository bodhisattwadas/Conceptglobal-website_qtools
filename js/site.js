/**
 * Quantum Tools and Services (QTS) — Site Interactions
 * Cleanroom & Reticle Precision Standard
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.qts-mobile-btn');
  const navMenu = document.querySelector('.qts-nav');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Hardware Stage Tab Switcher (Hero Section)
  const stageTabs = document.querySelectorAll('.qts-stage-tab');
  const stageImg = document.getElementById('qts-hero-img');
  const stageTitle = document.getElementById('qts-stage-title');
  const stageMeta = document.getElementById('qts-stage-meta');

  const hardwareData = {
    'dac': {
      src: 'images/dactools_front.jpg',
      alt: 'Diamond Anvil Cell systems for high-pressure research',
      title: 'DIAMOND ANVIL CELLS & IN-SITU OPTICS',
      meta: 'UP TO 100+ GPa // CRYOGENIC & PPMS COMPATIBLE'
    },
    'strain': {
      src: 'images/cryogenic_uniaxial_strain_cells.jpg',
      alt: 'Cryogenic uniaxial strain and stress cells',
      title: 'CRYOGENIC UNIAXIAL STRAIN CELLS',
      meta: 'SUB-MICRON PIEZO RESOLUTION // T < 4.2 K'
    }
  };

  if (stageTabs.length && stageImg) {
    stageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        if (!target || !hardwareData[target]) return;

        stageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Smooth transition
        stageImg.style.opacity = '0.3';
        setTimeout(() => {
          stageImg.src = hardwareData[target].src;
          stageImg.alt = hardwareData[target].alt;
          if (stageTitle) stageTitle.textContent = hardwareData[target].title;
          if (stageMeta) stageMeta.textContent = hardwareData[target].meta;
          stageImg.style.opacity = '1';
        }, 120);
      });
    });

    // Optional subtle auto-rotation if tab is idle
    let autoRotateIdx = 0;
    const tabKeys = ['dac', 'strain'];
    setInterval(() => {
      // only auto-rotate if hero is in viewport and user hasn't hovered recently
      if (document.hidden) return;
      autoRotateIdx = (autoRotateIdx + 1) % tabKeys.length;
      const targetTab = document.querySelector(`.qts-stage-tab[data-target="${tabKeys[autoRotateIdx]}"]`);
      if (targetTab && !targetTab.classList.contains('active') && !document.querySelector('.qts-hero-stage:hover')) {
        targetTab.click();
      }
    }, 7000);
  }

  // 3. Dropdown Click for Mobile/Touch
  const dropdownTrigger = document.querySelector('.qts-dropdown-trigger > .qts-nav-link');
  const dropdownPanel = document.querySelector('.qts-dropdown-panel');
  if (dropdownTrigger && dropdownPanel && window.innerWidth <= 768) {
    dropdownTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownPanel.style.display = dropdownPanel.style.display === 'block' ? 'none' : 'block';
      }
    });
  }
});
