// Theme management for EventShare platform

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        // Load theme from storage or system preference
        const savedTheme = storage.get('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }

        this.applyTheme();
        this.setupEventListeners();
    }

    applyTheme() {
        // Apply theme to document
        if (this.currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Save to storage
        storage.set('theme', this.currentTheme);

        // Update theme toggle button
        this.updateToggleButton();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.currentTheme = theme;
            this.applyTheme();
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    updateToggleButton() {
        const themeToggle = $('#theme-toggle');
        if (themeToggle) {
            // Update icons based on current theme
            const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
            const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');
            
            if (this.currentTheme === 'dark') {
                if (sunIcon) sunIcon.classList.remove('hidden');
                if (moonIcon) moonIcon.classList.add('hidden');
            } else {
                if (sunIcon) sunIcon.classList.add('hidden');
                if (moonIcon) moonIcon.classList.remove('hidden');
            }
        }
    }

    setupEventListeners() {
        // Theme toggle button
        on('#theme-toggle', 'click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only update if user hasn't manually set a theme
            if (!storage.get('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }

    // Utility methods for theme-aware styling
    getThemeColors() {
        return {
            primary: {
                50: '#eff6ff',
                100: '#dbeafe',
                200: '#bfdbfe',
                300: '#93c5fd',
                400: '#60a5fa',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
                800: '#1e40af',
                900: '#1e3a8a',
            },
            secondary: {
                50: '#faf5ff',
                100: '#f3e8ff',
                200: '#e9d5ff',
                300: '#d8b4fe',
                400: '#c084fc',
                500: '#a855f7',
                600: '#9333ea',
                700: '#7c3aed',
                800: '#6b21a8',
                900: '#581c87',
            },
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
            }
        };
    }

    getThemeClass(baseClass) {
        const isDark = this.currentTheme === 'dark';
        
        const themeClasses = {
            // Background classes
            'bg-white': isDark ? 'bg-gray-800' : 'bg-white',
            'bg-gray-50': isDark ? 'bg-gray-900' : 'bg-gray-50',
            'bg-gray-100': isDark ? 'bg-gray-800' : 'bg-gray-100',
            
            // Text classes
            'text-gray-900': isDark ? 'text-white' : 'text-gray-900',
            'text-gray-700': isDark ? 'text-gray-300' : 'text-gray-700',
            'text-gray-600': isDark ? 'text-gray-400' : 'text-gray-600',
            'text-gray-500': isDark ? 'text-gray-400' : 'text-gray-500',
            
            // Border classes
            'border-gray-200': isDark ? 'border-gray-700' : 'border-gray-200',
            'border-gray-300': isDark ? 'border-gray-600' : 'border-gray-300',
            
            // Hover classes
            'hover:bg-gray-50': isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
            'hover:bg-gray-100': isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
        };

        return themeClasses[baseClass] || baseClass;
    }

    // CSS custom properties for dynamic theming
    updateCSSVariables() {
        const root = document.documentElement;
        const colors = this.getThemeColors();
        
        // Set CSS custom properties
        Object.entries(colors).forEach(([colorName, shades]) => {
            Object.entries(shades).forEach(([shade, value]) => {
                root.style.setProperty(`--color-${colorName}-${shade}`, value);
            });
        });
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for global use
window.themeManager = themeManager;