// Inicialização das bibliotecas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
        
        // Garantir que elementos sejam visíveis após AOS
        setTimeout(() => {
            ensureContentVisibility();
            ensureTimelineVisibility();
        }, 2000);
    }

    // Inicializar GSAP (sem ScrollTrigger para evitar conflitos)
    if (typeof gsap !== 'undefined') {
        // GSAP disponível para animações básicas
    }

    // Cursor personalizado
    initCustomCursor();
    
    // Navegação responsiva
    initMobileNav();
    
    // Animações GSAP
    initGSAPAnimations();
    
    // Efeitos de hover
    initHoverEffects();
    
    // Smooth scroll para links internos
    initSmoothScroll();
    
    // Formulário de contato
    initContactForm();
    
    // Efeitos de parallax (simplificados)
    // initParallaxEffects(); // Removido para evitar conflitos
    
    // Animações de entrada
    initEntranceAnimations();
    
    // Garantir que o conteúdo seja visível
    ensureContentVisibility();
});

// Cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animar cursor
    function animateCursor() {
        // Cursor principal
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Cursor follower
        followerX += (mouseX - followerX) * 0.3;
        followerY += (mouseY - followerY) * 0.3;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Efeitos de hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .timeline-content');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#00ccff';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#0066ff';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Navegação responsiva
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Animações GSAP
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Animação do hero (simplificada)
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from('.hero-visual', {
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });
    
    // Animação dos elementos flutuantes
    gsap.to('.floating-element', {
        y: -20,
        rotation: 360,
        duration: 6,
        ease: 'power2.inOut',
        stagger: 2,
        repeat: -1,
        yoyo: true
    });
    
    // Animação do scroll indicator
    gsap.to('.scroll-arrow', {
        y: -10,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
    });
}

// Efeitos de hover
function initHoverEffects() {
    // Efeito de tilt nos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Efeito de glow nos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        });
    });
    
    // Efeito de partículas nos skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            createParticles(item);
        });
    });
}

// Criar partículas
function createParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#0066ff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        element.appendChild(particle);
        
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                particle.remove();
            }
        });
    }
}

// Smooth scroll
function initSmoothScroll() {
    // Função para fazer scroll
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            
            // Usar scroll nativo (mais confiável)
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            return true;
        } else {
            return false;
        }
    }
    
    // Adicionar eventos para todos os links de navegação
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            scrollToSection(targetId);
        });
    });
    
    // Adicionar eventos para botões específicos
    const buttonLinks = document.querySelectorAll('.btn[href^="#"]');
    
    buttonLinks.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            scrollToSection(targetId);
        });
    });
    
    // Adicionar eventos para links de navegação específicos
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = navLink.getAttribute('href');
            scrollToSection(targetId);
        });
    });
}

// Formulário de contato
function initContactForm() {
    const form = document.querySelector('.form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)';
            
            // Reset do formulário
            form.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
    
    // Efeito de foco nos inputs
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Efeitos de parallax (removidos para evitar conflitos)
function initParallaxEffects() {
    // Parallax removido para evitar conflitos
}

// Animações de entrada (simplificadas)
function initEntranceAnimations() {
    // Garantir que todos os elementos sejam visíveis
    const elements = document.querySelectorAll('.project-card, .skill-item, .timeline-item');
    elements.forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.transform = 'none';
    });
}

// Efeitos de partículas de fundo
function initBackgroundParticles() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Criar partículas de fundo
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#0066ff';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.3';
        particle.style.pointerEvents = 'none';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        hero.appendChild(particle);
        
        // Animar partícula
        gsap.to(particle, {
            y: -100,
            opacity: 0,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 2
        });
    }
}

// Inicializar partículas de fundo
initBackgroundParticles();

// Efeito de digitação no título
function initTypewriterEffect() {
    const title = document.querySelector('.hero-title .gradient-text');
    
    if (!title) return;
    
    // Verificar se o texto já está visível
    if (title.textContent.trim() === '') {
        const originalText = 'Gabriel de Almeida Castro';
        title.textContent = originalText;
    }
    
    // Opcional: efeito de digitação
    const text = title.textContent;
    if (text && text.length > 0) {
        title.textContent = '';
        
        let i = 0;
        const typewriter = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typewriter);
                
                // Adicionar cursor piscante
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                title.appendChild(cursor);
            }
        }, 100);
    }
}

// Inicializar efeito de digitação com delay menor
setTimeout(initTypewriterEffect, 500);

// Adicionar CSS para cursor piscante
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Efeito de loading
window.addEventListener('load', () => {
    // Garantir que o conteúdo seja visível
    ensureContentVisibility();
    
    // Animar se GSAP estiver disponível
    if (typeof gsap !== 'undefined') {
        gsap.to('.hero-content', {
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    // Garantir que os projetos sejam visíveis
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        project.style.opacity = '1';
        project.style.visibility = 'visible';
    });
    
    // Garantir que a timeline seja visível
    ensureTimelineVisibility();
    
    // Adicionar animação para a imagem de perfil
    initProfileImage();
    
    // Adicionar fallback para navegação nativa
    addNativeNavigationFallback();
});

// Função para garantir visibilidade do conteúdo
function ensureContentVisibility() {
    // Garantir que todos os elementos sejam visíveis
    const elements = document.querySelectorAll('.hero-content, .hero-visual, .project-card, .skill-item, .timeline-content');
    
    elements.forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.display = 'block';
    });
    
    // Garantir que o hero seja visível
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.visibility = 'visible';
    }
    
    // Garantir que os projetos sejam visíveis
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        project.style.opacity = '1';
        project.style.visibility = 'visible';
        project.style.transform = 'none';
        project.style.display = 'block';
    });
    
    // Garantir que o título seja visível
    const title = document.querySelector('.hero-title .gradient-text');
    if (title && title.textContent.trim() === '') {
        title.textContent = 'Gabriel de Almeida Castro';
    }
    
    // Garantir que os botões sejam visíveis
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
        button.style.display = 'inline-flex';
    });
    
    // Verificar se as seções existem (sem debug)
    const sections = ['#home', '#about', '#projects', '#skills', '#experience', '#contact'];
    sections.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        // Seção verificada
    });
}

// Função para garantir visibilidade da timeline
function ensureTimelineVisibility() {
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    if (timeline) {
        timeline.style.opacity = '1';
        timeline.style.visibility = 'visible';
    }
    
    timelineItems.forEach(item => {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.display = 'block';
    });
    
    timelineContents.forEach(content => {
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        content.style.display = 'block';
        content.style.background = 'var(--card-bg)';
        content.style.color = 'var(--text-primary)';
    });
    
    // Garantir que os textos sejam visíveis
    const titles = document.querySelectorAll('.timeline-title');
    const descriptions = document.querySelectorAll('.timeline-description');
    const dates = document.querySelectorAll('.timeline-date');
    const techs = document.querySelectorAll('.timeline-tech');
    
    titles.forEach(title => {
        title.style.color = 'var(--text-primary)';
        title.style.opacity = '1';
        title.style.visibility = 'visible';
    });
    
    descriptions.forEach(desc => {
        desc.style.color = 'var(--text-secondary)';
        desc.style.opacity = '1';
        desc.style.visibility = 'visible';
    });
    
    dates.forEach(date => {
        date.style.color = 'var(--primary-color)';
        date.style.opacity = '1';
        date.style.visibility = 'visible';
    });
    
    techs.forEach(tech => {
        tech.style.opacity = '1';
        tech.style.visibility = 'visible';
        tech.style.display = 'flex';
    });
}

// Função para animar a imagem de perfil
function initProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        // Adicionar efeito de carregamento
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'scale(0.8)';
        
        // Animar quando a imagem carregar
        profileImage.addEventListener('load', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(profileImage, {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out'
                });
            } else {
                profileImage.style.opacity = '1';
                profileImage.style.transform = 'scale(1)';
                profileImage.style.transition = 'all 1s ease';
            }
        });
        
        // Fallback se a imagem já estiver carregada
        if (profileImage.complete) {
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'scale(1)';
        }
    }
}

// Função de fallback para navegação nativa
function addNativeNavigationFallback() {
    // Adicionar navegação nativa como fallback
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        // Adicionar evento nativo como backup
        link.addEventListener('click', (e) => {
            // Se o JavaScript falhar, permitir navegação nativa
            setTimeout(() => {
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection && !targetSection.offsetTop) {
                    // Se o scroll não funcionou, tentar navegação nativa
                    window.location.hash = targetId;
                }
            }, 100);
        });
    });
}

// Otimização de performance
let ticking = false;

function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Atualizar efeitos baseados no scroll
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll, { passive: true }); 