// Navegación móvil
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animación de contadores
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 20);
        } else {
            counter.innerText = target;
        }
    });
};

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animar contadores cuando la sección sea visible
            if (entry.target.classList.contains('about')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observar secciones para animaciones
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Filtros de proyectos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Modal de proyectos
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const viewProjectButtons = document.querySelectorAll('.view-project');

// Datos de proyectos (simulados)
const projectsData = {
    1: {
        title: "Identidad Corporativa - TechStart",
        category: "Branding",
        description: "Desarrollo completo de identidad visual para una startup tecnológica, incluyendo logotipo, paleta de colores, tipografía y aplicaciones.",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        details: "Este proyecto involucró la creación de una identidad visual moderna y tecnológica que reflejara los valores de innovación y confiabilidad de la empresa."
    },
    2: {
        title: "Revista Digital - Lifestyle",
        category: "Editorial",
        description: "Diseño editorial completo para revista digital mensual, incluyendo layout, tipografía y sistema de grillas.",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        details: "Desarrollo de un sistema editorial coherente que facilita la lectura digital y mantiene la atención del usuario."
    },
    3: {
        title: "App Móvil - FitTracker",
        category: "Digital",
        description: "Diseño de interfaz de usuario para aplicación móvil de fitness, enfocada en usabilidad y experiencia del usuario.",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        details: "Creación de una interfaz intuitiva que motiva a los usuarios a mantener sus rutinas de ejercicio."
    },
    4: {
        title: "Branding Restaurante - Sabores",
        category: "Branding",
        description: "Identidad visual completa para cadena de restaurantes, incluyendo menús, señalética y material promocional.",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        details: "Desarrollo de una identidad que transmite calidad gastronómica y crea una experiencia memorable para los comensales."
    },
    5: {
        title: "Portada de Libro - Novela",
        category: "Editorial",
        description: "Diseño de portada para novela contemporánea, balanceando elementos tipográficos y visuales.",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        details: "Creación de una portada que captura la esencia de la historia y atrae al público objetivo."
    },
    6: {
        title: "Landing Page - Marketing Agency",
        category: "Digital",
        description: "Diseño web responsive para agencia de marketing, optimizada para conversión y experiencia de usuario.",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        details: "Desarrollo de una página web que comunica efectivamente los servicios de la agencia y genera leads cualificados."
    }
};

viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = button.getAttribute('data-project');
        const project = projectsData[projectId];
        
        if (project) {
            modalBody.innerHTML = `
                <div class="project-detail">
                    <h2>${project.title}</h2>
                    <p class="project-category">${project.category}</p>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-images">
                        ${project.images.map(img => `
                            <img src="${img}" alt="${project.title}" class="project-detail-img">
                        `).join('')}
                    </div>
                    
                    <div class="project-details">
                        <h3>Detalles del Proyecto</h3>
                        <p>${project.details}</p>
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envío de formulario
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    
    // Mostrar mensaje de éxito
    alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. Te contactaré pronto.`);
    
    // Limpiar formulario
    contactForm.reset();
});

// Efecto parallax suave en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Lazy loading para imágenes
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
});

// Agregar estilos CSS adicionales para el modal
const additionalStyles = `
    .project-detail {
        max-width: 100%;
    }
    
    .project-detail h2 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        font-size: 2rem;
    }
    
    .project-category {
        color: var(--primary-color);
        font-weight: 600;
        margin-bottom: 1rem;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }
    
    .project-description {
        color: var(--text-secondary);
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .project-images {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .project-detail-img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: var(--shadow);
    }
    
    .project-details h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .project-details p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
`;

// Agregar estilos al head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Activar primer filtro
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    // Mostrar todos los proyectos inicialmente
    projectItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
});
