// Router system for EventShare platform

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Setup initial route
        this.setupRoutes();
        this.handleInitialRoute();
        this.setupEventListeners();
    }

    setupRoutes() {
        // Define all routes
        this.routes = {
            'login': () => this.loadPage('login'),
            'register': () => this.loadPage('register'),
            'home': () => this.loadPage('home'),
            'events': () => this.loadPage('events'),
            'discover': () => this.loadPage('discover'),
            'profile': () => this.loadPage('profile'),
            'settings': () => this.loadPage('settings'),
            'messages': () => this.loadPage('messages'),
            'notifications': () => this.loadPage('notifications'),
            'create-event': () => this.loadPage('create-event'),
            'event': (id) => this.loadPage('event', { id }),
            'user': (id) => this.loadPage('user', { id }),
            'admin': () => this.loadPage('admin'),
            'admin/users': () => this.loadPage('admin-users'),
            'admin/events': () => this.loadPage('admin-events'),
            'admin/reports': () => this.loadPage('admin-reports'),
            'help': () => this.loadPage('help'),
            'privacy': () => this.loadPage('privacy'),
            'terms': () => this.loadPage('terms'),
            '404': () => this.loadPage('404')
        };
    }

    handleInitialRoute() {
        // Get current path
        const path = window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1);
        
        // Check if user is authenticated
        if (!auth.isAuthenticated() && !['login', 'register'].includes(path)) {
            this.navigate('login');
            return;
        }
        
        // Navigate to initial route
        this.navigate(path);
    }

    navigate(path, params = {}) {
        // Check authentication for protected routes
        const publicRoutes = ['login', 'register', 'help', 'privacy', 'terms'];
        if (!auth.isAuthenticated() && !publicRoutes.includes(path)) {
            this.navigate('login');
            return;
        }

        // Update URL without triggering page reload
        const url = path === 'home' ? '/' : `/${path}`;
        history.pushState({ path, params }, '', url);

        // Load the page
        this.loadRoute(path, params);
    }

    loadRoute(path, params = {}) {
        // Check if route exists
        if (this.routes[path]) {
            this.currentRoute = path;
            this.routes[path](params);
        } else {
            // Check for parameterized routes
            const routeFound = this.checkParameterizedRoutes(path);
            if (!routeFound) {
                this.routes['404']();
            }
        }
    }

    checkParameterizedRoutes(path) {
        // Check for event route (e.g., /event/123)
        if (path.startsWith('event/')) {
            const id = path.split('/')[1];
            this.routes['event']({ id });
            return true;
        }
        
        // Check for user route (e.g., /user/123)
        if (path.startsWith('user/')) {
            const id = path.split('/')[1];
            this.routes['user']({ id });
            return true;
        }
        
        return false;
    }

    async loadPage(page, params = {}) {
        const mainContent = $('#main-content');
        
        // Show loading
        showLoading(mainContent);
        
        try {
            // Load page content based on route
            switch (page) {
                case 'login':
                    await this.loadLoginPage();
                    break;
                case 'register':
                    await this.loadRegisterPage();
                    break;
                case 'home':
                    await this.loadHomePage();
                    break;
                case 'events':
                    await this.loadEventsPage();
                    break;
                case 'discover':
                    await this.loadDiscoverPage();
                    break;
                case 'profile':
                    await this.loadProfilePage();
                    break;
                case 'settings':
                    await this.loadSettingsPage();
                    break;
                case 'messages':
                    await this.loadMessagesPage();
                    break;
                case 'notifications':
                    await this.loadNotificationsPage();
                    break;
                case 'create-event':
                    await this.loadCreateEventPage();
                    break;
                case 'event':
                    await this.loadEventPage(params.id);
                    break;
                case 'user':
                    await this.loadUserPage(params.id);
                    break;
                case 'admin':
                    await this.loadAdminPage();
                    break;
                case 'admin-users':
                    await this.loadAdminUsersPage();
                    break;
                case 'admin-events':
                    await this.loadAdminEventsPage();
                    break;
                case 'admin-reports':
                    await this.loadAdminReportsPage();
                    break;
                case '404':
                    await this.load404Page();
                    break;
                default:
                    await this.load404Page();
            }
        } catch (error) {
            console.error('Error loading page:', error);
            showError('Failed to load page. Please try again.');
        }
    }

    async loadLoginPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 px-4">
                <div id="login-form-container"></div>
            </div>
        `;
        
        // Load login form component
        if (window.LoginForm) {
            new LoginForm('#login-form-container');
        }
    }

    async loadRegisterPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 px-4">
                <div id="register-form-container"></div>
            </div>
        `;
        
        // Load register form component
        if (window.RegisterForm) {
            new RegisterForm('#register-form-container');
        }
    }

    async loadHomePage() {
        if (window.HomePage) {
            await new HomePage().render();
        }
    }

    async loadEventsPage() {
        if (window.EventsPage) {
            await new EventsPage().render();
        }
    }

    async loadDiscoverPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Discover Events
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Find amazing events happening near you
                    </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Event cards will be loaded here -->
                </div>
            </div>
        `;
    }

    async loadProfilePage() {
        if (window.ProfilePage) {
            await new ProfilePage().render();
        }
    }

    async loadSettingsPage() {
        if (window.SettingsPage) {
            await new SettingsPage().render();
        }
    }

    async loadMessagesPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div class="p-6 text-center">
                        <i data-lucide="message-circle" class="h-12 w-12 text-gray-400 mx-auto mb-4"></i>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Messages</h2>
                        <p class="text-gray-600 dark:text-gray-400">
                            Your conversations will appear here
                        </p>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    }

    async loadNotificationsPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div class="p-6 text-center">
                        <i data-lucide="bell" class="h-12 w-12 text-gray-400 mx-auto mb-4"></i>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notifications</h2>
                        <p class="text-gray-600 dark:text-gray-400">
                            You're all caught up!
                        </p>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    }

    async loadCreateEventPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Event</h1>
                        <p class="text-gray-600 dark:text-gray-400 mt-1">
                            Share your amazing event with the community
                        </p>
                    </div>
                    <div id="event-form-container" class="p-6"></div>
                </div>
            </div>
        `;
        
        // Load event form component
        if (window.EventForm) {
            new EventForm('#event-form-container');
        }
    }

    async loadEventPage(eventId) {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Event Details
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Event ID: ${eventId}
                    </p>
                </div>
            </div>
        `;
    }

    async loadUserPage(userId) {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        User Profile
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        User ID: ${userId}
                    </p>
                </div>
            </div>
        `;
    }

    async loadAdminPage() {
        if (window.AdminPage) {
            await new AdminPage().render();
        }
    }

    async loadAdminUsersPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        User Management
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Manage platform users
                    </p>
                </div>
            </div>
        `;
    }

    async loadAdminEventsPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Event Management
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Manage platform events
                    </p>
                </div>
            </div>
        `;
    }

    async loadAdminReportsPage() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Reports & Analytics
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        View platform analytics and reports
                    </p>
                </div>
            </div>
        `;
    }

    async load404Page() {
        const mainContent = $('#main-content');
        mainContent.innerHTML = `
            <div class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-9xl font-bold text-gray-400 mb-4">404</h1>
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
                    <p class="text-gray-600 dark:text-gray-400 mb-8">
                        The page you're looking for doesn't exist.
                    </p>
                    <button 
                        onclick="router.navigate('home')"
                        class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.path) {
                this.loadRoute(e.state.path, e.state.params);
            } else {
                this.handleInitialRoute();
            }
        });

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-nav]');
            if (link) {
                e.preventDefault();
                const path = link.getAttribute('data-nav');
                this.navigate(path);
            }
        });
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    back() {
        history.back();
    }

    forward() {
        history.forward();
    }
}

// Initialize router
const router = new Router();

// Export for global use
window.router = router;