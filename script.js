// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add smooth scrolling for any internal links
    addSmoothScrolling();
    
    // Add interactive hover effects
    addInteractiveEffects();
});

function initializeAnimations() {
    // Hero section fade-in animation
    const heroContent = document.getElementById('heroContent');
    if (heroContent) {
        // Small delay to ensure page is ready
        setTimeout(() => {
            heroContent.classList.add('loaded');
        }, 100);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections for scroll animations
    const animatedElements = document.querySelectorAll('.info-card, .fun-fact-card, .love-item');
    animatedElements.forEach((el, index) => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        // Observe for intersection
        observer.observe(el);
    });
}

function addSmoothScrolling() {
    // Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addInteractiveEffects() {
    // Add sparkle effect on card hover
    const cards = document.querySelectorAll('.info-card, .fun-fact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add gentle pulse to love items on hover
    const loveItems = document.querySelectorAll('.love-item');
    
    loveItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.love-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.love-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add floating animation to hero emoji
    const heroEmoji = document.querySelector('.hero-emoji');
    if (heroEmoji) {
        setInterval(() => {
            heroEmoji.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                heroEmoji.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
        
        heroEmoji.style.transition = 'transform 1s ease-in-out';
    }
    
    // Add click effect to fun fact cards
    const funFactCards = document.querySelectorAll('.fun-fact-card');
    
    funFactCards.forEach(card => {
        card.addEventListener('click', function() {
            const emoji = this.querySelector('.fun-fact-emoji');
            if (emoji) {
                emoji.style.transform = 'scale(1.2) rotate(10deg)';
                emoji.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    emoji.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }
        });
    });
}

// Add some Easter eggs
function addEasterEggs() {
    // Konami code easter egg (up, up, down, down, left, right, left, right, B, A)
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            
            // Add rainbow keyframes if not already present
            if (!document.querySelector('#rainbow-keyframes')) {
                const style = document.createElement('style');
                style.id = 'rainbow-keyframes';
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 4000);
            
            konamiCode = [];
        }
    });
}

// Initialize easter eggs
addEasterEggs();