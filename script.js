// ==========================================================================
// Portfolio Script - Nadil Havindu (Nexiz_v2)
// Clean, reliable functionality: Mobile menu, active nav, typewriter effect
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Toggle & Nav Item Active Handling
    const spatialSidebar = document.getElementById('spatialSidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebarItems = document.querySelectorAll('.sidebar-item, .nav-item');

    if (sidebarToggleBtn && spatialSidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            spatialSidebar.classList.toggle('expanded');
        });
    }

    // 2. Active Section Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sidebarItems.forEach(item => {
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

    // 5. Dynamic Live Calendar & Real-Time Date/Clock Widget
    function updateLiveCalendar() {
        const now = new Date();
        const calDayNum = document.getElementById('calDayNum');
        const calDayName = document.getElementById('calDayName');
        const calSubMeta = document.getElementById('calSubMeta');
        const calendarDaysStrip = document.getElementById('calendarDaysStrip');

        if (calDayNum && calDayName && calSubMeta) {
            const dayNum = String(now.getDate()).padStart(2, '0');
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            calDayNum.textContent = dayNum;
            calDayName.textContent = weekdays[now.getDay()];

            // Format real clock time
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            calSubMeta.innerHTML = `${months[now.getMonth()]} ${now.getFullYear()} • <span id="realTimeClock">${hours}:${minutes}:${seconds}</span> (GMT+5:30)`;

            // Dynamically generate current week (Monday to Sunday)
            if (calendarDaysStrip && (!calendarDaysStrip.dataset.generatedDate || calendarDaysStrip.dataset.generatedDate !== now.toDateString())) {
                calendarDaysStrip.dataset.generatedDate = now.toDateString();
                const currentDay = now.getDay();
                const distanceToMonday = (currentDay + 6) % 7;
                const monday = new Date(now);
                monday.setDate(now.getDate() - distanceToMonday);

                const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                let stripHtml = '';

                for (let i = 0; i < 7; i++) {
                    const d = new Date(monday);
                    d.setDate(monday.getDate() + i);
                    const isToday = d.toDateString() === now.toDateString();
                    const dNum = String(d.getDate()).padStart(2, '0');
                    stripHtml += `<div class="day-chip ${isToday ? 'active' : ''}"><span>${dayLetters[i]}</span><span>${dNum}</span></div>`;
                }
                calendarDaysStrip.innerHTML = stripHtml;
            }
        }
    }

    updateLiveCalendar();
    setInterval(updateLiveCalendar, 1000);
});
