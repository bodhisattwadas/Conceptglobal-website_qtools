document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('[data-toggle-id]');

  toggles.forEach(toggle => {
    const toggleId = toggle.getAttribute('data-toggle-id');
    const dropdownId = toggleId.replace('toggle', 'dropdown');
    const dropdown = document.getElementById(dropdownId);
    let hideTimeout;
    let isManuallyToggled = false;

    if (!dropdown) return;

    function showDropdown() {
      clearTimeout(hideTimeout);
      dropdown.classList.remove('hidden', 'opacity-0', 'invisible');
      dropdown.classList.add('opacity-100', 'visible');
    }

    function hideDropdown() {
      if (isManuallyToggled) return;
      hideTimeout = setTimeout(() => {
        dropdown.classList.remove('opacity-100', 'visible');
        dropdown.classList.add('opacity-0', 'invisible', 'hidden');
      }, 500);
    }

    function closeFlaggedDropdowns() {
      const flaggedDropdowns = document.querySelectorAll('[data-nested-menu-flag="true"]');
      flaggedDropdowns.forEach(dd => {
        dd.classList.remove('opacity-100', 'visible');
        dd.classList.add('opacity-0', 'invisible', 'hidden');
      });
    }

    function toggleDropdown() {
      const isVisible = !dropdown.classList.contains('hidden');
      if (isVisible) {
        dropdown.classList.remove('opacity-100', 'visible');
        dropdown.classList.add('opacity-0', 'invisible', 'hidden');
        isManuallyToggled = false;
      } else {
        closeFlaggedDropdowns();  // 👈 close only those with data-nested-menu-flag="true"
        showDropdown();
        isManuallyToggled = true;
      }
    }

    toggle.addEventListener('mouseenter', showDropdown); 
    toggle.addEventListener('mouseleave', hideDropdown);
    dropdown.addEventListener('mouseenter', showDropdown);
    dropdown.addEventListener('mouseleave', hideDropdown);
    toggle.addEventListener('click', toggleDropdown);
  });
});
