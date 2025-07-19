// Main JavaScript file
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupFormHandling();
        this.setupInteractions();
        this.setupAnimations();
        this.setupScrollProgress();
        this.setupFileShowcase();
        
        // Initialize theme manager
        this.themeManager = new ThemeManager();
        
        // Initialize animations after page load
        window.addEventListener('load', () => {
            this.handlePageLoad();
        });
    }

    setupLoadingScreen() {
        // Hide loading screen immediately if already loaded
        if (document.readyState === 'complete') {
            this.hideLoadingScreen();
        } else {
            // Hide loading screen when page loads
            window.addEventListener('load', () => {
                this.hideLoadingScreen();
            });
        }
    }

    hideLoadingScreen() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 500);
        }
    }

    setupNavigation() {
        // Navigation scroll effect
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Smooth scrolling for navigation links
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

    setupFormHandling() {
        // Form submission to open email client
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const name = formData.get('name') || '';
                const email = formData.get('email') || '';
                const subject = formData.get('subject') || '';
                const message = formData.get('message') || '';
                
                // Create email body
                const emailBody = `Hello Hevin,

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`;
                
                // Create mailto link
                const mailtoLink = `mailto:hevingadhiya12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success feedback
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Email Client Opened!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 3000);
                }
            });
        }
    }

    setupInteractions() {
        // Smooth scrolling for navigation links
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

        // Portfolio card interactions
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateX(2deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0)';
            });
        });

        // Skill cards interactions
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add click ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for animations
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

        // Animate portfolio cards
        document.querySelectorAll('.portfolio-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Animate contact cards
        document.querySelectorAll('.contact-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Animate stats
        this.animateStats();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    if (numericValue) {
                        this.animateNumber(target, 0, numericValue, finalValue);
                    }
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateNumber(element, start, end, suffix) {
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + suffix.replace(/\d+/g, '');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    setupScrollProgress() {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                scrollProgress.style.width = progress + '%';
            });
        }
    }

    handlePageLoad() {
        // Start animations and interactions after page load
        console.log('Portfolio loaded successfully!');
    }

    // File showcase functionality
    setupFileShowcase() {
        // Create file showcase data
        const fileCategories = {
            autocad: [
                'Second Page Data/Detailed Millwork Drawings/Detailed Millwork Sample -1.pdf',
                'Second Page Data/Detailed Millwork Drawings/Detailed Millwork Sample -2.pdf',
                'Second Page Data/Detailed Millwork Drawings/Detailed Millwork Sample -3.pdf',
                'Second Page Data/Detailed Millwork Drawings/Detailed Millwork Sample -4.pdf'
            ],
            solidworks: [
                'Second Page Data/Solidworks Drawings/SolidWorks Drawings - 1.pdf',
                'Second Page Data/Solidworks Drawings/SolidWorks Drawings - 2.pdf',
                'Second Page Data/Solidworks Drawings/SolidWorks Drawings - 3.pdf'
            ],
            cnc: [
                'Second Page Data/CNC Drawings/CNC Sample - 1.pdf',
                'Second Page Data/CNC Drawings/CNC Sample - 2.pdf',
                'Second Page Data/CNC Drawings/CNC Sample - 3.pdf',
                'Second Page Data/CNC Drawings/CNC Sample - 4.pdf'
            ],
            rendering: [
                'Second Page Data/Rendering Images/BAR FINAL RENDER.pdf',
                'Second Page Data/Rendering Images/Study Room.pdf',
                'Second Page Data/Rendering Images/Bedroom.jpg',
                'Second Page Data/Rendering Images/Fireplace.png',
                'Second Page Data/Rendering Images/Book Shelves.jpg'
            ],
            submittal: [
                'Second Page Data/Shop Drawing Submittal/Casework Sample - 1.pdf',
                'Second Page Data/Shop Drawing Submittal/Casework Sample - 2.pdf',
                'Second Page Data/Shop Drawing Submittal/Counter Sample.pdf',
                'Second Page Data/Shop Drawing Submittal/Reception Sample.pdf'
            ]
        };

        // Add click handlers for skill and portfolio cards
        document.querySelectorAll('.skill-card, .portfolio-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const href = card.getAttribute('href');
                if (href && href.includes('Second Page Data')) {
                    // Determine category based on the link
                    let category = '';
                    if (href.includes('Detailed Millwork')) category = 'autocad';
                    else if (href.includes('Solidworks')) category = 'solidworks';
                    else if (href.includes('CNC')) category = 'cnc';
                    else if (href.includes('Rendering')) category = 'rendering';
                    else if (href.includes('Shop Drawing')) category = 'submittal';
                    
                    if (category) {
                        this.showFileModal(category, fileCategories[category]);
                    } else {
                        window.open(href, '_blank');
                    }
                } else {
                    window.open(href, '_blank');
                }
            });
        });
    }

    showFileModal(category, files) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'file-modal';
        modal.innerHTML = `
            <div class="file-modal-content">
                <div class="file-modal-header">
                    <h3>${this.getCategoryTitle(category)} Samples</h3>
                    <button class="file-modal-close">&times;</button>
                </div>
                <div class="file-modal-body">
                    <div class="file-grid">
                        ${files.map((file, index) => `
                            <a href="${file}" target="_blank" class="file-card">
                                <div class="file-icon">
                                    <i class="fas ${this.getFileIcon(file)}"></i>
                                </div>
                                <div class="file-name">${this.getFileName(file)}</div>
                                <div class="file-type">${this.getFileType(file)}</div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add close functionality
        modal.querySelector('.file-modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Animate in
        setTimeout(() => modal.classList.add('show'), 10);
    }

    getCategoryTitle(category) {
        const titles = {
            autocad: 'AutoCAD Technical Drawings',
            solidworks: 'SolidWorks 3D Models',
            cnc: 'CNC Programming',
            rendering: '3D Renderings & Visualizations',
            submittal: 'Submittal Documentation'
        };
        return titles[category] || category;
    }

    getFileIcon(file) {
        if (file.includes('.pdf')) return 'fa-file-pdf';
        if (file.includes('.jpg') || file.includes('.png')) return 'fa-image';
        return 'fa-file';
    }

    getFileName(file) {
        return file.split('/').pop().replace(/\.[^/.]+$/, "");
    }

    getFileType(file) {
        const ext = file.split('.').pop().toUpperCase();
        return ext === 'JPG' ? 'JPEG' : ext;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Also hide loading screen immediately if script loads after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
            }, 500);
        }
    });
} else {
    // DOM is already loaded
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 500);
    }
}
