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
})();