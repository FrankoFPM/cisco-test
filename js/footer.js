/**
 * FooterNavigation - Clase para manejar la funcionalidad del footer
 */
class FooterNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollToTopButton();
        this.addAnimationsOnScroll();
        this.handleExternalLinks();
    }

    /**
     * Agregar botón de scroll hacia arriba
     */
    addScrollToTopButton() {
        // Crear botón scroll to top
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollButton.className = 'fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50 opacity-0 invisible';
        scrollButton.id = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Volver al inicio');
        
        document.body.appendChild(scrollButton);

        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.remove('opacity-0', 'invisible');
                scrollButton.classList.add('opacity-100', 'visible');
            } else {
                scrollButton.classList.add('opacity-0', 'invisible');
                scrollButton.classList.remove('opacity-100', 'visible');
            }
        });

        // Funcionalidad del botón
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Agregar animaciones cuando el footer es visible
     */
    addAnimationsOnScroll() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animar elementos del footer cuando sea visible
                    const animatedElements = footer.querySelectorAll('[data-animate]');
                    animatedElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('animate-fadeInUp');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(footer);

        // Agregar data attributes para animación
        const footerColumns = footer.querySelectorAll('.space-y-4');
        footerColumns.forEach((column, index) => {
            column.setAttribute('data-animate', 'true');
            column.style.opacity = '0';
            column.style.transform = 'translateY(20px)';
            column.style.transition = 'all 0.6s ease-out';
        });
    }

    /**
     * Manejar enlaces externos
     */
    handleExternalLinks() {
        const externalLinks = document.querySelectorAll('footer a[target="_blank"]');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Agregar confirmación para números de WhatsApp
                if (link.href.includes('wa.me')) {
                    const phoneNumber = link.href.match(/\d{9,}/);
                    if (phoneNumber) {
                        // Opcional: agregar tracking o analytics aquí
                        console.log(`WhatsApp clicked: ${phoneNumber[0]}`);
                    }
                }
            });
        });
    }
}

// CSS para animaciones
const footerAnimationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Efectos hover adicionales */
    footer .group:hover i {
        transform: translateX(4px);
        transition: transform 0.3s ease;
    }

    footer .group:hover .fab {
        transform: scale(1.2) rotate(10deg);
        transition: all 0.3s ease;
    }

    /* Responsive mejoras */
    @media (max-width: 768px) {
        #scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            padding: 0.75rem;
        }
    }

    /* Efecto de pulsación para botones de WhatsApp */
    footer a[href*="wa.me"]:hover .bg-green-500 {
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;

// Insertar estilos en el documento
function addFooterStyles() {
    const style = document.createElement('style');
    style.textContent = footerAnimationStyles;
    document.head.appendChild(style);
}

// Auto-inicialización cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    addFooterStyles();
});

// Exportar para uso manual si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterNavigation;
}