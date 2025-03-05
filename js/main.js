// Script pour la navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navigation = document.getElementById('navigation');
    const backdrop = document.getElementById('backdrop');
    
    navToggle.addEventListener('click', function() {
        navigation.classList.toggle('active');
        backdrop.classList.toggle('active');
        
        if (navigation.classList.contains('active')) {
            navToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    backdrop.addEventListener('click', function() {
        navigation.classList.remove('active');
        backdrop.classList.remove('active');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
    
    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fermer le menu mobile si ouvert
            navigation.classList.remove('active');
            backdrop.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animation des éléments au scroll
    const animateOnScroll = function() {
        const elementsLeft = document.querySelectorAll('.product-card:nth-child(odd), .info-box, .benefit-card:nth-child(odd), .gallery-item:nth-child(odd)');
        const elementsRight = document.querySelectorAll('.product-card:nth-child(even), .benefit-card:nth-child(even), .gallery-item:nth-child(even)');
        
        elementsLeft.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
        
        elementsRight.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
    };
    
    // Initialiser les éléments
    const initElements = function() {
        const elementsLeft = document.querySelectorAll('.product-card:nth-child(odd), .info-box, .benefit-card:nth-child(odd), .gallery-item:nth-child(odd)');
        const elementsRight = document.querySelectorAll('.product-card:nth-child(even), .benefit-card:nth-child(even), .gallery-item:nth-child(even)');
        
        elementsLeft.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(-50px)';
            element.style.transition = 'all 0.8s ease';
        });
        
        elementsRight.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(50px)';
            element.style.transition = 'all 0.8s ease';
        });
    };
    
    initElements();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Animer les éléments visibles au chargement
    
    // Compte à rebours pour l'offre spéciale
    const countdown = function() {
        // Date de fin de l'offre (à personnaliser)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 14); // 14 jours à partir d'aujourd'hui
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
        
        const updateCountdown = function() {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            if (distance < 0) {
                daysEl.innerHTML = "00";
                hoursEl.innerHTML = "00";
                minutesEl.innerHTML = "00";
                secondsEl.innerHTML = "00";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysEl.innerHTML = days < 10 ? `0${days}` : days;
            hoursEl.innerHTML = hours < 10 ? `0${hours}` : hours;
            minutesEl.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
            secondsEl.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    };
    
    countdown();
    
    // Animation d'apparition pour le header au chargement
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'all 1s ease';
        
        setTimeout(function() {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Effet de parallaxe sur le héros
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = 50 + (scrollPosition * 0.1) + 'px';
        });
    }
});