// ==========================================================================
// Portfolio Script - Nadil Havindu (Nexiz_v2)
// Clean, reliable functionality: Mobile menu, active nav, typewriter effect
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking any nav item
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Active Section Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // 3. Clean Subtitle Typing Effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = [
            'Minecraft Server Development',
            'Coding & Scripting Solutions',
            'Network Architecture & Proxying',
            'Java, SQL & JVM Optimization',
            'Staff & Community Moderation',
            'CeylonEsports MC Network'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 75;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; // Pause before new word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // 4. AJAX Form Submission to Gmail via FormSubmit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formsubmit.co/ajax/nexizv2dev@gmail.com', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });

                if (response.ok) {
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#2ed573';
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully to Nexiz_v2!';
                    contactForm.reset();
                } else {
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#e62828';
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Failed to send. Please email nexizv2dev@gmail.com directly.';
                }
            } catch (err) {
                formStatus.style.display = 'block';
                formStatus.style.color = '#e62828';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Error sending message. Please try again.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
            }
        });
    }
});
