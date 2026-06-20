document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INYECCIÓN DE ICONOS FLOTANTES
    injectIcons();

    // 2. LÓGICA DE SCROLL (Animaciones Fade-in) 
    const fadeElements = document.querySelectorAll(".fade-in-element");

    function checkScroll() {
        const triggerBottom = (window.innerHeight / 5) * 4; 

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add("is-visible");
            }
        });
    }

    window.addEventListener("scroll", checkScroll, { passive: true });
    // Disparo inicial por si la sección ya está a la vista
    setTimeout(checkScroll, 150); 

    // --- 3. MOTOR DE CARRUSEL HERO ---
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Cambia de imagen cada 4 segundos
        setInterval(nextSlide, 4000);
    }
});

// Función externa que genera e inyecta los iconos flotantes
function injectIcons() {
    const container = document.querySelector('.interactive-circle-container');
    
    // Verificación de seguridad por si el contenedor no existe en alguna página
    if (!container) return; 

    // Iconos en formato SVG
    const icons = [
        { 
            class: 'icon-top-right', 
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>` 
        },
        { 
            class: 'icon-bottom-right', 
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>` 
        },
        { 
            class: 'icon-top-left', 
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/><path d="M12 4v8"/></svg>` 
        },
        { 
            class: 'icon-bottom-left', 
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` 
        }
    ];

    icons.forEach(iconData => {
        const div = document.createElement('div');
        div.className = `mini-float-icon ${iconData.class}`;
        div.innerHTML = iconData.svg;
        container.appendChild(div);
    });
}

// ==========================================================================
// CONTROLADOR GLOBAL DE MODO OSCURO (REGISTRO ANIMAL)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. COMPROBACIÓN INMEDIATA (Afecta a todas las páginas que tengan este JS)
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // 2. BUSCAR EL BOTÓN INTERRUPTOR (Solo estará en el Index)
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Si la página actual no tiene el botón (como el Login), el script se detiene aquí limpiamente
    if (!themeToggleBtn) return;

    // 3. ESCUCHAR EL CLIC (Solo en la página donde exista el botón)
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });
});