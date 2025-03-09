// Vérification d'âge
document.addEventListener('DOMContentLoaded', function() {
    const ageVerification = document.getElementById('age-verification');
    const ageYesBtn = document.getElementById('age-yes');
    const ageNoBtn = document.getElementById('age-no');
    
    // Vérifier si l'utilisateur a déjà confirmé son âge
    const ageVerified = localStorage.getItem('age-verified');
    
    if (!ageVerified) {
        ageVerification.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Empêcher le défilement
    } else {
        ageVerification.style.display = 'none';
    }
    
    ageYesBtn.addEventListener('click', function() {
        localStorage.setItem('age-verified', 'true');
        ageVerification.style.opacity = '0';
        document.body.style.overflow = 'auto'; // Permettre le défilement
        
        setTimeout(function() {
            ageVerification.style.display = 'none';
        }, 500);
    });
    
    ageNoBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
    
    // Script pour la navigation mobile
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
    
    // Animation des icônes sociales
    const socialIcons = document.querySelectorAll('.social-icon, .social-links a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(8deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
    
    // Effet de hover sur les produits
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Animation pour le bouton CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.03)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
        });
    }
    
    // Animation pour les badges "Populaire" et "Nouveau"
    const badges = document.querySelectorAll('.product-badge');
    badges.forEach(badge => {
        setInterval(() => {
            badge.style.transform = 'rotate(45deg) scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'rotate(45deg) scale(1)';
            }, 500);
        }, 3000);
    });
    
    // Effet de zoom au survol des images de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
});
