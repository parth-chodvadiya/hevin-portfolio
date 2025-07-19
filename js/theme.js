// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.body = document.body;
        this.init();
    }

    init() {
        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
        
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Export for use in main.js
window.ThemeManager = ThemeManager;
