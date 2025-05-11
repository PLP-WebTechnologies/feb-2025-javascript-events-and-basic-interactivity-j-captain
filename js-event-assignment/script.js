 document.addEventListener('DOMContentLoaded', () => {
    // Slideshow functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow img');
    const slideInterval = setInterval(nextSlide, 5000);

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Password visibility toggle
    document.querySelector('.toggle-password').addEventListener('click', (e) => {
        const passwordInput = document.querySelector('#loginPassword');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        e.target.classList.toggle('fa-eye-slash');
    });

    // Real-time validation
    const emailInput = document.querySelector('#loginEmail');
    const passwordInput = document.querySelector('#loginPassword');
    const loginForm = document.querySelector('#loginForm');

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailInput.value);
        toggleValidation(emailInput, isValid, 'Please enter a valid email address');
        return isValid;
    }

    function validatePassword() {
        const isValid = passwordInput.value.length >= 8;
        toggleValidation(passwordInput, isValid, 'Password must be at least 8 characters');
        return isValid;
    }

    function toggleValidation(input, isValid, message) {
        const container = input.closest('.form-group');
        container.querySelector('.validation-message')?.remove();
        
        if (!isValid) {
            const feedback = document.createElement('div');
            feedback.className = 'validation-message error';
            feedback.textContent = message;
            container.appendChild(feedback);
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.querySelector('#loginBtn');
        if (!validateEmail() || !validatePassword()) return;

        btn.disabled = true;
        btn.style.opacity = '0.8';
        btn.querySelector('.btn-text').textContent = 'Authenticating...';
        btn.querySelector('.loader').classList.remove('hidden');

        // Simulated API call
        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = 'Login Successful! 🎉';
            btn.querySelector('.loader').classList.add('hidden');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 2000);
    });

    // Secret action (long press on logo)
    const logo = document.querySelector('.logo');
    let pressTimer;

    logo.addEventListener('mousedown', startPress);
    logo.addEventListener('mouseup', cancelPress);
    logo.addEventListener('touchstart', startPress);
    logo.addEventListener('touchend', cancelPress);

    function startPress(e) {
        e.preventDefault();
        pressTimer = setTimeout(() => {
            const secretMessage = document.querySelector('#secretMessage');
            secretMessage.classList.remove('hidden');
            setTimeout(() => secretMessage.classList.add('hidden'), 5000);
        }, 2000);
    }

    function cancelPress() {
        clearTimeout(pressTimer);
    }

    // Enter key submission
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.querySelector('#loginBtn').click();
        }
    });

    // Dynamic year in footer
    document.getElementById('year').textContent = new Date().getFullYear();


    
});