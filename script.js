// ============================================================
// Portfolio Interactive Scripts
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------
    // 1. Dark / Light Theme Toggle (Bootstrap 5.3 data-bs-theme)
    // ------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Retrieve saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill text-warning';
        } else {
            themeIcon.className = 'bi bi-moon-stars-fill text-secondary';
        }
    };

    setTheme(initialTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    // ------------------------------------------------------------
    // 2. Navbar Styling on Scroll
    // ------------------------------------------------------------
    const navbar = document.getElementById('mainNav');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.getElementById('navMenu');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.bootstrap && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // ------------------------------------------------------------
    // 3. Animated Skill Progress Bars (Trigger on scroll into view)
    // ------------------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const animateSkills = () => {
        skillBars.forEach((container) => {
            const target = container.getAttribute('data-skill') || '0';
            const progressBar = container.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = target + '%';
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !skillsAnimated) {
                        animateSkills();
                        skillsAnimated = true;
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(skillsSection);
        }
    } else {
        // Fallback for older browsers
        animateSkills();
    }

    // ------------------------------------------------------------
    // 4. Contact Form Handling (Sends directly via Mailto)
    // ------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            const recipient = 'janhaviiee97@gmail.com';
            const mailSubject = encodeURIComponent(subject ? `${subject} [Portfolio Contact: ${name}]` : `Portfolio Message from ${name}`);
            const mailBody = encodeURIComponent(
                `Hello Janhavi,\n\n${message}\n\n` +
                `------------------------------------\n` +
                `Sender Name: ${name}\n` +
                `Sender Email: ${email}\n` +
                `Sent via Portfolio Website`
            );

            const mailtoUrl = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

            // Visual feedback on the button
            submitBtn.disabled = true;
            submitBtn.className = 'btn btn-success rounded-pill px-4 py-2 w-100 fw-semibold';
            submitBtn.innerHTML = '<i class="bi bi-envelope-check-fill me-2"></i>Opening Email Client...';

            // Launch mail client
            window.location.href = mailtoUrl;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.className = 'btn btn-primary rounded-pill px-4 py-2 w-100 fw-semibold';
                submitBtn.innerHTML = originalText;
            }, 3000);
        });
    }
});
