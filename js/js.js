let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.2s';

        setTimeout(() => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
            el.style.opacity = '1';
        }, 200);
    });

    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLang === 'en' ? 'AR' : 'EN';
    }

    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = currentLang;

    document.title = currentLang === 'en' 
        ? 'Ahmed Shawky | Frontend Developer' 
        : 'أحمد شوقي | مطور واجهات أمامية';

    localStorage.setItem('lang', currentLang);
}

function loadLanguage() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
}

const header = document.querySelector('header');
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('show');
    } else {
        header.classList.remove('show');
    }

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';

    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

const navLinks = document.getElementById('links');

function closeMenuOnNav() {
    // Only close menu and restore scroll if menu is actually open (mobile)
    if (navLinks.classList.contains('Acteve')) {
        navLinks.classList.remove('Acteve');
        document.body.style.overflow = '';
    }
}

function toggleMenu() {
    navLinks.classList.toggle('Acteve');
    // Only lock scroll when opening menu on mobile, not when clicking nav links
    if (window.innerWidth <= 1024) {
        document.body.style.overflow = navLinks.classList.contains('Acteve') ? 'hidden' : '';
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const texts = {
        en: ['Frontend Developer', 'React Developer', 'Web Developer'],
        ar: ['مطور واجهات أمامية', 'مطور React', 'مطور ويب']
    };

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTexts = texts[currentLang];
        const currentText = currentTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % currentTexts.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(bar);
    });
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 80;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

function handleSubmit(e) {
    e.preventDefault();

    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = currentLang === 'en' 
        ? 'Message sent successfully!' 
        : 'تم إرسال الرسالة بنجاح!';

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);

    e.target.reset();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage();
    animateSkillBars();
    revealOnScroll();

    document.querySelectorAll('section').forEach((section, index) => {
        if (!section.classList.contains('hero')) {
            section.classList.add('reveal');
            section.style.transitionDelay = `${index * 0.1}s`;
        }
    });
});

window.addEventListener('scroll', revealOnScroll);
