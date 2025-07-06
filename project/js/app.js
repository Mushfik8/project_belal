// Main application entry point

class EventShareApp {
    constructor() {
        this.initialized = false;
        this.init();
    }

    async init() {
        if (this.initialized) return;

        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
        } catch (error) {
            console.error('Error initializing app:', error);
            this.handleInitError(error);
        }
    }

    start() {
        // Show loading screen
        this.showLoadingScreen();

        // Initialize app components
        this.initializeComponents();

        // Setup global event listeners
        this.setupGlobalEventListeners();

        // Setup error handling
        this.setupErrorHandling();

        // Initialize authentication
        this.initializeAuth();

        // Hide loading screen
        setTimeout(() => {
            this.hideLoadingScreen();
            this.initialized = true;
        }, 1000);
    }

    showLoadingScreen() {
        const loadingScreen = $('#loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = $('#loading-screen');
        if (loadingScreen) {
            fadeOut(loadingScreen, 500);
        }
    }

    initializeComponents() {
        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }

        // Initialize theme
        if (window.themeManager) {
            // Theme manager is already initialized
        }

        // Initialize router
        if (window.router) {
            // Router is already initialized
        }

        // Initialize authentication
        if (window.auth) {
            // Auth is already initialized
        }
    }

    setupGlobalEventListeners() {
        // Handle mobile menu toggle
        on('#mobile-menu-btn', 'click', () => {
            const mobileMenu = $('#mobile-menu');
            const menuIcon = $('#mobile-menu-btn i');
            
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Handle search functionality
        on('#search-input', 'keypress', (e) => {
            if (e.key === 'Enter') {
                this.performGlobalSearch();
            }
        });

        // Handle create event button
        on('#create-event-btn', 'click', () => {
            router.navigate('create-event');
        });

        on('#mobile-create-event', 'click', () => {
            router.navigate('create-event');
            // Hide mobile menu
            $('#mobile-menu').classList.add('hidden');
            $('#mobile-menu-btn i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });

        // Handle notifications
        on('#notifications-btn', 'click', () => {
            router.navigate('notifications');
        });

        // Handle messages
        on('#messages-btn', 'click', () => {
            router.navigate('messages');
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // CMD/Ctrl + K for search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = $('#search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // ESC to close modals
            if (e.key === 'Escape') {
                const modals = $$('.fixed.inset-0');
                modals.forEach(modal => {
                    if (modal.style.display !== 'none') {
                        modal.remove();
                    }
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('No internet connection', 'warning');
        });
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.handleError(e.error);
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleError(e.reason);
        });
    }

    initializeAuth() {
        // Check if user is already authenticated
        if (auth.isAuthenticated()) {
            auth.updateUI();
            
            // If on login/register page, redirect to home
            const currentPath = window.location.pathname;
            if (currentPath === '/login' || currentPath === '/register') {
                router.navigate('home');
            }
        } else {
            // Redirect to login if not authenticated
            router.navigate('login');
        }
    }

    performGlobalSearch() {
        const searchInput = $('#search-input');
        if (searchInput && searchInput.value.trim()) {
            router.navigate(`events?search=${encodeURIComponent(searchInput.value.trim())}`);
        }
    }

    handleResize() {
        // Handle mobile menu on resize
        if (window.innerWidth >= 768) {
            const mobileMenu = $('#mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const menuIcon = $('#mobile-menu-btn i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        }
    }

    handleError(error) {
        // Log error for debugging
        console.error('Application error:', error);

        // Show user-friendly error message
        this.showNotification('Something went wrong. Please try again.', 'error');

        // Optionally report to error tracking service
        // this.reportError(error);
    }

    handleInitError(error) {
        // Show initialization error
        document.body.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div class="text-center">
                        <div class="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Application Error
                        </h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">
                            Failed to initialize the application. Please refresh the page.
                        </p>
                        <button 
                            onclick="window.location.reload()"
                            class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 transform transition-all duration-300 translate-x-full opacity-0`;
        
        const colors = {
            success: 'text-green-600 dark:text-green-400',
            error: 'text-red-600 dark:text-red-400',
            warning: 'text-yellow-600 dark:text-yellow-400',
            info: 'text-blue-600 dark:text-blue-400'
        };

        const icons = {
            success: 'check-circle',
            error: 'x-circle',
            warning: 'alert-triangle',
            info: 'info'
        };

        notification.innerHTML = `
            <div class="flex items-center">
                <i data-lucide="${icons[type]}" class="h-5 w-5 ${colors[type]} mr-3"></i>
                <p class="text-sm font-medium text-gray-900 dark:text-white">${message}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <i data-lucide="x" class="h-4 w-4"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);
        lucide.createIcons();

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Method to update notification count
    updateNotificationCount(count) {
        const notificationBadge = $('#notification-count');
        if (notificationBadge) {
            if (count > 0) {
                notificationBadge.textContent = count > 9 ? '9+' : count.toString();
                notificationBadge.classList.remove('hidden');
            } else {
                notificationBadge.classList.add('hidden');
            }
        }
    }

    // Method to handle user logout
    handleLogout() {
        auth.logout();
        this.showNotification('You have been logged out', 'info');
    }

    // Method to check if user is authenticated
    isAuthenticated() {
        return auth.isAuthenticated();
    }

    // Method to get current user
    getCurrentUser() {
        return auth.getCurrentUser();
    }
}

// Initialize the application
const app = new EventShareApp();

// Export for global use
window.app = app;