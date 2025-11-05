document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    //        AOS - Animate On Scroll
    // ------------------------------------
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // ------------------------------------
    //        Navbar Scroll & Hamburger Menu
    // ------------------------------------
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#navbar nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll Effect
    window.addEventListener('scroll', () => {
        // Header always keeps a slight dark background when scrolling for contrast
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.backgroundColor = 'var(--header-bg-dark)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Hamburger Toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu on link click (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // ------------------------------------
    //        Theme Toggle (Light/Dark Mode)
    // ------------------------------------
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // ------------------------------------
    //        Typewriter Effect
    // ------------------------------------
    const typewriterElement = document.querySelector('.typewriter-text');
    // يمكنك تعديل هذه النصوص كما تشاء، "مطور ويب" تعمل بشكل جيد مع ملفك الشخصي
    const textToType = ["مطور ويب", "مصمم واجهات"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 60;
    let delayBetweenTexts = 1500;

    function type() {
        const currentText = textToType[textIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex++);
        }

        let currentTypingSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length + 1) {
            currentTypingSpeed = delayBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textToType.length;
            currentTypingSpeed = 200;
        }

        setTimeout(type, currentTypingSpeed);
    }
    setTimeout(type, 1000);

    // ------------------------------------
    //        Contact Form Submission (Placeholder)
    // ------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            formMessage.textContent = 'تم إرسال رسالتك بنجاح! شكراً لك.';
            formMessage.className = 'form-message success';
            contactForm.reset();
        } else {
            formMessage.textContent = 'الرجاء ملء جميع الحقول المطلوبة.';
            formMessage.className = 'form-message error';
        }
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    });
});