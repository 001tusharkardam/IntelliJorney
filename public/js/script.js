(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener(
        "submit",
         (event) => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, 
    false
);
  });

  // Theme Toggler functionality
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggleBtn && themeIcon) {
    const updateIcon = () => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme');
      if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-moon', 'fa-regular');
        themeIcon.classList.add('fa-sun', 'fa-solid');
      } else {
        themeIcon.classList.remove('fa-sun', 'fa-solid');
        themeIcon.classList.add('fa-moon', 'fa-regular');
      }
    };

    updateIcon();

    themeToggleBtn.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-bs-theme');
      let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon();
    });
  }

  // Active state indicator for Mobile Bottom Navigation
  const currentPath = window.location.pathname;
  const navExplore = document.getElementById('nav-explore');
  const navPlan = document.getElementById('nav-plan');
  const navHost = document.getElementById('nav-host');
  const navProfile = document.getElementById('nav-profile');
  const navLogin = document.getElementById('nav-login');

  if (navExplore || navPlan || navHost || navProfile || navLogin) {
    if (currentPath.startsWith('/ai')) {
      if (navPlan) navPlan.classList.add('active');
    } else if (currentPath.startsWith('/listings/new')) {
      if (navHost) navHost.classList.add('active');
    } else if (currentPath.startsWith('/profile')) {
      if (navProfile) navProfile.classList.add('active');
    } else if (currentPath.startsWith('/login') || currentPath.startsWith('/signup')) {
      if (navLogin) navLogin.classList.add('active');
    } else if (currentPath === '/' || currentPath.startsWith('/listings')) {
      if (navExplore) navExplore.classList.add('active');
    }
  }
})();
