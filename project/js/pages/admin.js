class AdminPage {
    constructor() {
        this.analytics = {};
        this.loading = false;
    }

    async render() {
        const mainContent = $('#main-content');


        const user = auth.getCurrentUser();
        if (!user || user.id !== '1') {
            mainContent.innerHTML = `
                <div class="min-h-screen flex items-center justify-center">
                    <div class="text-center">
                        <i data-lucide="shield-x" class="h-16 w-16 text-red-400 mx-auto mb-4"></i>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
                        <p class="text-gray-600 dark:text-gray-400 mb-8">
                            You don't have permission to access this page.
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
            lucide.createIcons();
            return;
        }

        showLoading(mainContent);

        try {

            await this.loadAnalytics();


            mainContent.innerHTML = this.getHTML();


            this.setupEventListeners();


            lucide.createIcons();

        } catch (error) {
            console.error('Error loading admin page:', error);
            showError('Failed to load admin page');
        }
    }

    async loadAnalytics() {

        this.analytics = {
            totalUsers: 12543,
            totalEvents: 1876,
            totalRevenue: 89750,
            userGrowth: 12.5,
            eventGrowth: 8.3,
            revenueGrowth: 15.7,
            topCategories: [
                { category: 'Technology', count: 456 },
                { category: 'Music', count: 342 },
                { category: 'Food & Drink', count: 298 },
                { category: 'Arts & Culture', count: 234 },
                { category: 'Sports', count: 187 }
            ],
            recentActivity: [
                {
                    type: 'user_registered',
                    description: 'New user registration: sarah.johnson@email.com',
                    timestamp: '2024-01-15T14:30:00Z'
                },
                {
                    type: 'event_created',
                    description: 'New event created: Tech Conference 2024',
                    timestamp: '2024-01-15T13:45:00Z'
                },
                {
                    type: 'payment_processed',
                    description: 'Payment processed: $299.00 for event ticket',
                    timestamp: '2024-01-15T12:20:00Z'
                },
                {
                    type: 'event_reported',
                    description: 'Event reported for inappropriate content',
                    timestamp: '2024-01-15T11:15:00Z'
                }
            ]
        };
    }

    getHTML() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your platform and monitor performance</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <i data-lucide="users" class="h-6 w-6 text-blue-600 dark:text-blue-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">${this.analytics.totalUsers.toLocaleString()}</p>
                                <p class="text-sm text-green-600 dark:text-green-400">+${this.analytics.userGrowth}% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                <i data-lucide="calendar" class="h-6 w-6 text-green-600 dark:text-green-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Events</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">${this.analytics.totalEvents.toLocaleString()}</p>
                                <p class="text-sm text-green-600 dark:text-green-400">+${this.analytics.eventGrowth}% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                <i data-lucide="dollar-sign" class="h-6 w-6 text-yellow-600 dark:text-yellow-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">$${this.analytics.totalRevenue.toLocaleString()}</p>
                                <p class="text-sm text-green-600 dark:text-green-400">+${this.analytics.revenueGrowth}% from last month</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <i data-lucide="trending-up" class="h-6 w-6 text-purple-600 dark:text-purple-400"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Growth Rate</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">${this.analytics.userGrowth}%</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Monthly average</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Top Categories -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Top Event Categories</h2>
                        <div class="space-y-4">
                            ${this.analytics.topCategories.map((category, index) => `
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                            <span class="text-sm font-medium text-primary-600 dark:text-primary-400">${index + 1}</span>
                                        </div>
                                        <span class="font-medium text-gray-900 dark:text-white">${category.category}</span>
                                    </div>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">${category.count} events</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
                        <div class="space-y-4">
                            ${this.analytics.recentActivity.map(activity => `
                                <div class="flex items-start space-x-3">
                                    <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                        <i data-lucide="${this.getActivityIcon(activity.type)}" class="h-4 w-4 text-gray-600 dark:text-gray-400"></i>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm text-gray-900 dark:text-white">${activity.description}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">${this.formatActivityTime(activity.timestamp)}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button
                            onclick="router.navigate('admin/users')"
                            class="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <i data-lucide="users" class="h-6 w-6 text-blue-600 dark:text-blue-400"></i>
                            <div class="text-left">
                                <p class="font-medium text-gray-900 dark:text-white">Manage Users</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">View and manage users</p>
                            </div>
                        </button>

                        <button
                            onclick="router.navigate('admin/events')"
                            class="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                            <i data-lucide="calendar" class="h-6 w-6 text-green-600 dark:text-green-400"></i>
                            <div class="text-left">
                                <p class="font-medium text-gray-900 dark:text-white">Manage Events</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Review and moderate events</p>
                            </div>
                        </button>

                        <button
                            onclick="router.navigate('admin/reports')"
                            class="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                        >
                            <i data-lucide="bar-chart" class="h-6 w-6 text-yellow-600 dark:text-yellow-400"></i>
                            <div class="text-left">
                                <p class="font-medium text-gray-900 dark:text-white">View Reports</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Analytics and reports</p>
                            </div>
                        </button>

                        <button
                            onclick="this.exportData()"
                            class="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                            <i data-lucide="download" class="h-6 w-6 text-purple-600 dark:text-purple-400"></i>
                            <div class="text-left">
                                <p class="font-medium text-gray-900 dark:text-white">Export Data</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Download platform data</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {

        window.exportData = () => {
            this.exportData();
        };
    }

    getActivityIcon(type) {
        const iconMap = {
            user_registered: 'user-plus',
            event_created: 'calendar-plus',
            payment_processed: 'credit-card',
            event_reported: 'flag'
        };
        return iconMap[type] || 'activity';
    }

    formatActivityTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = (now - date) / (1000 * 60);
        const diffInHours = diffInMinutes / 60;

        if (diffInMinutes < 60) {
            return `${Math.floor(diffInMinutes)} minutes ago`;
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hours ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
        }
    }

    exportData() {

        const data = {
            users: this.analytics.totalUsers,
            events: this.analytics.totalEvents,
            revenue: this.analytics.totalRevenue,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eventshare-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        app.showNotification('Data exported successfully!', 'success');
    }
}


window.AdminPage = AdminPage;