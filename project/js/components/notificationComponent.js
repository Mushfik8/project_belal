

class NotificationComponent {
    constructor(container) {
        this.container = typeof container === 'string' ? $(container) : container;
        this.notifications = [];
        this.loading = false;
        this.render();
        this.loadNotifications();
        this.setupEventListeners();
    }

    async loadNotifications() {
        this.loading = true;
        this.showLoading();

        try {

            this.notifications = [
                {
                    id: '1',
                    type: 'event',
                    title: 'New Event Registration',
                    message: 'Sarah Johnson registered for your Tech Conference 2024',
                    read: false,
                    timestamp: '2024-01-15T14:30:00Z',
                    actionUrl: '/event/1',
                    metadata: {
                        eventId: '1',
                        userId: '2'
                    }
                },
                {
                    id: '2',
                    type: 'message',
                    title: 'New Message',
                    message: 'Mike Chen sent you a message about event details',
                    read: false,
                    timestamp: '2024-01-15T12:15:00Z',
                    actionUrl: '/messages',
                    metadata: {
                        conversationId: '2'
                    }
                },
                {
                    id: '3',
                    type: 'follow',
                    title: 'New Follower',
                    message: 'Emily Davis started following you',
                    read: true,
                    timestamp: '2024-01-15T10:45:00Z',
                    actionUrl: '/user/4',
                    metadata: {
                        userId: '4'
                    }
                },
                {
                    id: '4',
                    type: 'event',
                    title: 'Event Reminder',
                    message: 'Your Art Gallery Opening event is tomorrow',
                    read: true,
                    timestamp: '2024-01-14T09:00:00Z',
                    actionUrl: '/event/2',
                    metadata: {
                        eventId: '2'
                    }
                },
                {
                    id: '5',
                    type: 'system',
                    title: 'Profile Updated',
                    message: 'Your profile has been successfully updated',
                    read: true,
                    timestamp: '2024-01-13T16:20:00Z',
                    actionUrl: '/profile',
                    metadata: {}
                }
            ];

            this.renderNotifications();
        } catch (error) {
            console.error('Error loading notifications:', error);
            this.showError();
        } finally {
            this.loading = false;
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                            <div class="flex items-center space-x-3">
                                <button
                                    id="mark-all-read-btn"
                                    class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                                >
                                    Mark all as read
                                </button>
                                <button
                                    id="clear-all-btn"
                                    class="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="notifications-content">
                        <!-- Notifications will be rendered here -->
                    </div>
                </div>
            </div>
        `;
    }

    renderNotifications() {
        const content = $('#notifications-content');

        if (this.notifications.length === 0) {
            content.innerHTML = `
                <div class="text-center py-16">
                    <i data-lucide="bell" class="h-16 w-16 text-gray-400 mx-auto mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No notifications</h3>
                    <p class="text-gray-600 dark:text-gray-400">You're all caught up!</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        content.innerHTML = `
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
                ${this.notifications.map(notification => this.getNotificationHTML(notification)).join('')}
            </div>
        `;

        lucide.createIcons();
    }

    getNotificationHTML(notification) {
        const iconMap = {
            event: 'calendar',
            message: 'message-circle',
            follow: 'user-plus',
            payment: 'credit-card',
            system: 'settings'
        };

        const colorMap = {
            event: 'text-blue-600 dark:text-blue-400',
            message: 'text-green-600 dark:text-green-400',
            follow: 'text-purple-600 dark:text-purple-400',
            payment: 'text-yellow-600 dark:text-yellow-400',
            system: 'text-gray-600 dark:text-gray-400'
        };

        return `
            <div class="notification-item p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}" 
                 data-notification-id="${notification.id}"
                 onclick="this.handleNotificationClick('${notification.id}')">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                            <i data-lucide="${iconMap[notification.type]}" class="h-5 w-5 ${colorMap[notification.type]}"></i>
                        </div>
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                                ${notification.title}
                            </h3>
                            <div class="flex items-center space-x-2">
                                <span class="text-xs text-gray-500 dark:text-gray-400">
                                    ${this.formatNotificationTime(notification.timestamp)}
                                </span>
                                ${!notification.read ? `
                                    <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                                ` : ''}
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            ${notification.message}
                        </p>
                    </div>

                    <div class="flex-shrink-0">
                        <button
                            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onclick="event.stopPropagation(); this.removeNotification('${notification.id}')"
                        >
                            <i data-lucide="x" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {

        on('#mark-all-read-btn', 'click', () => {
            this.markAllAsRead();
        });

        on('#clear-all-btn', 'click', () => {
            this.clearAllNotifications();
        });


        window.handleNotificationClick = (notificationId) => {
            this.handleNotificationClick(notificationId);
        };

        window.removeNotification = (notificationId) => {
            this.removeNotification(notificationId);
        };
    }

    handleNotificationClick(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (!notification) return;

        if (!notification.read) {
            notification.read = true;
            this.renderNotifications();
            this.updateNotificationCount();
        }

        if (notification.actionUrl) {
            const path = notification.actionUrl.startsWith('/') ? notification.actionUrl.slice(1) : notification.actionUrl;
            router.navigate(path);
        }
    }

    removeNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.renderNotifications();
        this.updateNotificationCount();
        app.showNotification('Notification removed', 'success');
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.renderNotifications();
        this.updateNotificationCount();
        app.showNotification('All notifications marked as read', 'success');
    }

    clearAllNotifications() {
        if (confirm('Are you sure you want to clear all notifications?')) {
            this.notifications = [];
            this.renderNotifications();
            this.updateNotificationCount();
            app.showNotification('All notifications cleared', 'success');
        }
    }

    updateNotificationCount() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        if (window.app && app.updateNotificationCount) {
            app.updateNotificationCount(unreadCount);
        }
    }

    showLoading() {
        const content = $('#notifications-content');
        content.innerHTML = `
            <div class="text-center py-16">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading notifications...</p>
            </div>
        `;
    }

    showError() {
        const content = $('#notifications-content');
        content.innerHTML = `
            <div class="text-center py-16">
                <i data-lucide="alert-circle" class="h-16 w-16 text-red-400 mx-auto mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error loading notifications</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">Please try again later</p>
                <button
                    onclick="this.loadNotifications()"
                    class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Retry
                </button>
            </div>
        `;
        lucide.createIcons();
    }

    formatNotificationTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = (now - date) / (1000 * 60);
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;

        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${Math.floor(diffInMinutes)}m ago`;
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else if (diffInDays < 7) {
            return `${Math.floor(diffInDays)}d ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    }
}

window.NotificationComponent = NotificationComponent;