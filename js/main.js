/**
 * Funcionalidades principales del sitio
 * - Navegación móvil
 * - Validación de formulario
 * - Año dinámico en footer
 * - Smooth scroll para anclas
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== AÑO DINÁMICO EN FOOTER =====
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // ===== MENÚ MÓVIL =====
  const headerToggle = document.querySelector('.header__toggle');
  const headerNav = document.querySelector('.header__nav');
  
  if (headerToggle && headerNav) {
    headerToggle.addEventListener('click', () => {
      const isExpanded = headerToggle.getAttribute('aria-expanded') === 'true';
      headerToggle.setAttribute('aria-expanded', !isExpanded);
      headerNav.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('active');
        headerToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // ===== SMOOTH SCROLL PARA ANCLAS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== VALIDACIÓN DE FORMULARIO =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validación básica
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Por favor complete los campos obligatorios (*)');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Por favor ingrese un email válido');
        return;
      }
      
      // Simular envío (reemplazar con integración real)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      try {
        // 🔧 REEMPLAZAR CON TU SERVICIO DE FORMULARIO:
        // - Formspree: https://formspree.io/
        // - Netlify Forms: https://www.netlify.com/products/forms/
        // - EmailJS: https://www.emailjs.com/
        
        await simulateFormSubmission();
        
        alert('¡Gracias por su consulta! Le responderé en menos de 24 horas hábiles.');
        contactForm.reset();
        
      } catch (error) {
        console.error('Error al enviar:', error);
        alert('Ocurrió un error al enviar. Por favor intente nuevamente o contacte directamente por email.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
  
  // ===== UTILIDADES =====
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function simulateFormSubmission() {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }
});