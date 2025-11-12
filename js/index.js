document.addEventListener('DOMContentLoaded', function () {
  // --- REFERENCIAS A ELEMENTOS ---
  const header = document.querySelector('header');
  // CORRECCIÓN 2: Añadimos la referencia al footer global
  const footer = document.querySelector('.footer');
  const allPages = document.querySelectorAll('.page-section');

  // Referencias a los botones de navegación
  const navHome = document.getElementById('nav-link-home');
  const navComunidad = document.getElementById('nav-link-comunidad');
  const btnsUnete = document.querySelectorAll('.btn-unete');
  const btnExploraRetos = document.querySelector('.btn-primario');
  const btnRegresar = document.getElementById('btnRegresar');

  // ---FUNCIÓN PRINCIPAL DE NAVEGACIÓN---
  function showPage(pageIdToShow) {
    allPages.forEach((page) => {
      page.classList.remove('active');
    });

    // Mostrar la página solicitada
    const pageToShow = document.getElementById(pageIdToShow);
    if (pageToShow) {
      pageToShow.classList.add('active');
    }

    // lógica para mostrar/ocultar el footer
    if (pageIdToShow === 'signup-page') {
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none'; 
    } else {
      if (header) header.style.display = 'block';
      if (footer) footer.style.display = 'block';
    }

    // Guardar estado en sessionStorage
    sessionStorage.setItem('ecomind_page', pageIdToShow);

    // Si es la página de comunidad, inicializar su slider
    if (pageIdToShow === 'comunidad-page') {
      initComunidadSlider();
    }

    // Subir al inicio de la página
    window.scrollTo(0, 0);
  }

  // --- TERCERA SECCION - COMUNIDAD ---
  // Función del slider de comunidad
  function initComunidadSlider() {
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');

    if (nextBtn && prevBtn && slide1 && slide2) {
      const newNextBtn = nextBtn.cloneNode(true);
      const newPrevBtn = prevBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
      prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);

      newNextBtn.addEventListener('click', function () {
        slide1.style.display = 'none';
        slide2.style.display = 'flex';
        newNextBtn.style.display = 'none';
        newPrevBtn.style.display = 'block';
      });

      newPrevBtn.addEventListener('click', function () {
        slide2.style.display = 'none';
        slide1.style.display = 'flex';
        newPrevBtn.style.display = 'none';
        newNextBtn.style.display = 'block';
      });
    }
  }

  // --- RESTAURAR ESTADO AL CARGAR ---
  const savedPage =
    sessionStorage.getItem('ecomind_page') || 'landing-page';
  showPage(savedPage);

  // --- EVENT LISTENERS PARA NAVEGACIÓN ---

  // 1. Clic en el Logo
  if (navHome) {
    navHome.addEventListener('click', function (e) {
      e.preventDefault();
      showPage('landing-page');
    });
  }

  // 2. Clic en "COMUNIDAD"
  if (navComunidad) {
    navComunidad.addEventListener('click', function (e) {
      e.preventDefault();
      showPage('comunidad-page');
    });
  }

  // 3. Clic en "ÚNETE AHORA"
  btnsUnete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('signup-page');
    });
  });

  // 4. Clic en "Explorar retos"
  if (btnExploraRetos) {
    btnExploraRetos.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('signup-page');
    });
  } 

  // 5. Clic en "Regresar"
  if (btnRegresar) {
    btnRegresar.addEventListener('click', function (e) {
      e.preventDefault();
      showPage('landing-page');
    });
  }

  // 6. Smooth scroll para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (
        [
          '#comunidad',
          '#unete.html',
          '#retos',
          '#',
          '#signup-page',
          '#landing-page',
          '#comunidad-page',
        ].includes(targetId) ||
        this.id === 'nav-link-home' ||
        this.classList.contains('link-back') ||
        this.classList.contains('link-signin')
      ) {
        return;
      }

      // Tu lógica de smooth scroll
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // --- MANEJO DEL FORMULARIO DE SIGN UP ---
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]').value;
      const email = this.querySelector('input[name="email"]').value;
      const password = this.querySelector('input[name="password"]').value;
      const terms = document.getElementById('terms');

      if (terms && !terms.checked) {
        alert('Debes aceptar los términos y condiciones');
        return;
      }
      if (!name || !email || !password) {
        alert('Por favor completa todos los campos');
        return;
      }
      alert(`¡Bienvenido a EcoMind, ${name}!\nTu registro ha sido exitoso.`);
      this.reset();
    });
  }

  // --- MANEJO DE BOTONES SOCIALES ---
  const btnGoogle = document.querySelector('.btn-google');
  const btnApple = document.querySelector('.btn-apple');

  if (btnGoogle) {
    btnGoogle.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Funcionalidad de Sign in with Google en desarrollo');
    });
  }

  if (btnApple) {
    btnApple.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Funcionalidad de Sign in with Apple en desarrollo');
    });
  }

  // Manejo del enlace "Sign In"
  const linkSignIn = document.querySelector('.link-signin');
  if (linkSignIn) {
    linkSignIn.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Funcionalidad de Sign In en desarrollo');
    });
  }
}); 

