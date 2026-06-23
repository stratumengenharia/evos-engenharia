// ==========================================
// EVOS ENGENHARIA — JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header shadow
        header.classList.toggle('scrolled', scrollY > 40);

        // Back to top button
        backToTop.classList.toggle('visible', scrollY > 600);

        // Active nav link based on scroll position
        updateActiveNav();
    });

    // --- Hero video slideshow ---
    const heroVideos = document.querySelectorAll('.hero-video');
    let currentVideo = 0;
    const videoDuration = 8000; // 8 seconds per video

    function switchVideo() {
        heroVideos[currentVideo].classList.remove('active');
        heroVideos[currentVideo].pause();
        heroVideos[currentVideo].currentTime = 0;

        currentVideo = (currentVideo + 1) % heroVideos.length;

        heroVideos[currentVideo].currentTime = 0;
        heroVideos[currentVideo].play();
        heroVideos[currentVideo].classList.add('active');
    }

    if (heroVideos.length > 1) {
        setInterval(switchVideo, videoDuration);
    }

    // --- Mobile menu toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close menu on nav link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // --- Active nav link on scroll ---
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // --- Service tabs ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById('tab-' + tab).classList.add('active');
        });
    });

    // --- Service accordion ---
    document.querySelectorAll('.categoria-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const grid = btn.nextElementSibling;
            const isOpen = btn.classList.contains('active');

            // Close all in same tab
            btn.closest('.tab-content').querySelectorAll('.categoria-header').forEach(b => {
                b.classList.remove('active');
                b.nextElementSibling.classList.remove('open');
            });

            // Toggle clicked one
            if (!isOpen) {
                btn.classList.add('active');
                grid.classList.add('open');
            }
        });
    });

    // --- Back to top ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Contact form ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value;

        // Build WhatsApp message
        let whatsappMsg = `Olá! Meu nome é *${nome}*.%0A`;
        if (email) whatsappMsg += `E-mail: ${email}%0A`;
        if (telefone) whatsappMsg += `Telefone: ${telefone}%0A`;
        if (servico) whatsappMsg += `Serviço de interesse: ${servico}%0A`;
        whatsappMsg += `%0A${mensagem}`;

        const whatsappURL = `https://wa.me/5531993157247?text=${whatsappMsg}`;
        window.open(whatsappURL, '_blank');

        // Show success feedback
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Redirecionando para o WhatsApp...';
        btn.style.background = '#25D366';
        btn.style.borderColor = '#25D366';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.borderColor = '';
            contactForm.reset();
        }, 3000);
    });

    // --- Animated counters ---
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-number');
                counters.forEach(counter => {
                    const target = +counter.dataset.target;
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const countersSection = document.querySelector('.counters');
    if (countersSection) counterObserver.observe(countersSection);

    // --- Smooth reveal on scroll (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal animation to elements
    const revealElements = document.querySelectorAll(
        '.servico-categoria, .diferencial-card, .info-card, .sobre-card, .blog-card'
    );

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.5s ease ${index % 6 * 0.08}s, transform 0.5s ease ${index % 6 * 0.08}s`;
        observer.observe(el);
    });

    // CSS class for revealed state
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // --- Phone mask ---
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0,2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        e.target.value = value;
    });

});
