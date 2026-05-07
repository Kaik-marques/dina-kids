document.addEventListener('DOMContentLoaded', () => {
    // Infinite Marquee is handled via CSS animations in style.css

    // FAQ Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';

            // Close all other FAQs
            faqItems.forEach(i => {
                i.querySelector('.faq-answer').style.display = 'none';
                i.querySelector('i').className = 'fas fa-plus';
            });

            if (!isOpen) {
                answer.style.display = 'block';
                icon.className = 'fas fa-minus';
            }
        });
    });

    // Custom Fast Smooth Scroll
    function fastSmoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target !== '#') {
                fastSmoothScroll(target, 800); // 800ms for a fast but visible descent
            }
        });
    });
    // Countdown Timer Logic
    function startTimer(duration) {
        let timer = duration, hours, minutes, seconds;
        const displayHours = document.querySelectorAll('.timer-unit span')[0];
        const displayMinutes = document.querySelectorAll('.timer-unit span')[1];
        const displaySeconds = document.querySelectorAll('.timer-unit span')[2];

        setInterval(function () {
            hours = parseInt(timer / 3600, 10);
            minutes = parseInt((timer % 3600) / 60, 10);
            seconds = parseInt(timer % 60, 10);

            displayHours.textContent = hours < 10 ? "0" + hours : hours;
            displayMinutes.textContent = minutes < 10 ? "0" + minutes : minutes;
            displaySeconds.textContent = seconds < 10 ? "0" + seconds : seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    // Start a 2.5-hour countdown (in seconds)
    startTimer((2 * 60 * 60) + (30 * 60));

    // Tracking Logic
    function trackInitiateCheckout(planName) {
        if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
                content_name: planName,
                currency: 'BRL'
            });
        }
    }

    // Attach tracking to buttons
    document.querySelectorAll('.track-checkout-premium').forEach(btn => {
        btn.addEventListener('click', () => trackInitiateCheckout('Plano Premium'));
    });

    document.querySelectorAll('.track-checkout-basic').forEach(btn => {
        btn.addEventListener('click', () => trackInitiateCheckout('Plano Básico'));
    });
});
