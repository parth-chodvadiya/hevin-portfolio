// Animation utilities
class AnimationUtils {
    constructor() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupTypingEffect();
    }

    setupScrollAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        // Counter animation for stats
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', ''));
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 40);
            });
        };

        // Trigger counter animation when hero section is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 1000);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    }

    setupTypingEffect() {
        // Dynamic typing effect
        const typeWriter = (element, text, speed = 80) => {
            let i = 0;
            element.innerHTML = '';
            
            const type = () => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            };
            type();
        };

        // Start typing effect for hero subtitle
        setTimeout(() => {
            const subtitle = document.querySelector('.hero-subtitle');
            if (subtitle) {
                const originalText = subtitle.textContent;
                typeWriter(subtitle, originalText);
            }
        }, 2000);
    }

    // Particle effect on mouse move
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = 'var(--primary-gold)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'particle-fade 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Export for use in main.js
window.AnimationUtils = AnimationUtils;
