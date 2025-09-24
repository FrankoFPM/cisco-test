/**
 * Header Navigation JavaScript
 * Maneja la funcionalidad del menú móvil y navegación responsiva
 */

class HeaderNavigation {
  constructor() {
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.init();
  }

  init() {
    if (!this.mobileMenuToggle || !this.mobileMenu) {
      console.warn('Header navigation elements not found');
      return;
    }

    this.bindEvents();
  }

  bindEvents() {
    // Toggle del menú móvil
    this.mobileMenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });

    // Cerrar menú móvil al hacer clic en enlaces
    this.mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Cerrar menú móvil con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen()) {
        this.closeMobileMenu();
      }
    });

    // Cerrar menú móvil al hacer clic fuera de él
    document.addEventListener('click', (e) => {
      if (this.isMobileMenuOpen() && 
          !this.mobileMenu.contains(e.target) && 
          !this.mobileMenuToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Responsivo: cerrar menú móvil al redimensionar ventana
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) { // md breakpoint
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const isOpen = this.isMobileMenuOpen();
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenu.classList.remove('hidden');
    this.updateToggleIcon(true);
    this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    this.mobileMenuToggle.setAttribute('aria-label', 'Cerrar menú');
    
    // Añadir clase para animación
    setTimeout(() => {
      this.mobileMenu.classList.add('menu-open');
    }, 10);
  }

  closeMobileMenu() {
    this.mobileMenu.classList.add('hidden');
    this.mobileMenu.classList.remove('menu-open');
    this.updateToggleIcon(false);
    this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    this.mobileMenuToggle.setAttribute('aria-label', 'Abrir menú');
  }

  isMobileMenuOpen() {
    return !this.mobileMenu.classList.contains('hidden');
  }

  updateToggleIcon(isOpen) {
    const icon = this.mobileMenuToggle.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new HeaderNavigation();
});

// Función para cargar el header en otras páginas
function loadHeader(containerId = 'header-container') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  fetch('./components/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      // Extraer solo el contenido del header
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const headerContent = doc.querySelector('header');
      
      if (headerContent) {
        container.innerHTML = headerContent.outerHTML;
        // Reinicializar la funcionalidad del header
        new HeaderNavigation();
      }
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });
}

// Exportar funciones para uso global
window.HeaderNavigation = HeaderNavigation;
window.loadHeader = loadHeader;