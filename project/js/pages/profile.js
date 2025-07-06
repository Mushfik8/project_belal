class ProfilePage {
    constructor() {
        this.user = auth.getCurrentUser();
        this.userEvents = [];
        this.savedEvents = [];
        this.activeTab = 'events';
        this.loading = false;
    }

    async render() {
        const mainContent = $('#main-content');

        showLoading(mainContent);

        try {
            await this.loadData();

            mainContent.innerHTML = this.getHTML();

            this.setupEventListeners();
            this.renderTabContent();

            lucide.createIcons();

        } catch (error) {
            console.error('Error loading profile page:', error);
            showError('Failed to load profile page');
        }
    }

    async loadData() {

        await Promise.all([
            this.loadUserEvents(),
            this.loadSavedEvents()
        ]);
    }

    async loadUserEvents() {

        const allEvents = storage.get('events') || [];
        this.userEvents = allEvents.filter(event => event.organizer.id === this.user.id);
    }

    async loadSavedEvents() {

        this.savedEvents = [
            {
                id: '4',
                title: 'Music Festival',
                shortDescription: 'Outdoor music festival',
                images: ['https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'music', name: 'Music', color: '#F59E0B' },
                date: '2024-04-01',
                time: '14:00',
                location: {
                    city: 'Austin',
                    state: 'TX'
                },
                organizer: {
                    name: 'Music Collective',
                    verified: true
                },
                pricing: { type: 'paid', price: 75 },
                attendees: 1543
            }
        ];
    }

    getHTML() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Profile Header -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
                    <div class="relative h-48 bg-gradient-to-r from-primary-600 to-secondary-600">
                        ${this.user.coverPhoto ? `
                            <img src="${this.user.coverPhoto}" alt="Cover" class="w-full h-full object-cover">
                        ` : ''}
                        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                    
                    <div class="relative px-6 pb-6">
                        <div class="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                            <div class="relative -mt-16">
                                <div class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    ${this.user.avatar ? `
                                        <img src="${this.user.avatar}" alt="${this.user.displayName}" class="w-full h-full object-cover">
                                    ` : `
                                        <div class="w-full h-full flex items-center justify-center">
                                            <i data-lucide="user" class="h-12 w-12 text-gray-400"></i>
                                        </div>
                                    `}
                                </div>
                                ${this.user.isOnline ? `
                                    <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                                ` : ''}
                            </div>
                            
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center space-x-2 mb-2">
                                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">${this.user.displayName}</h1>
                                    ${this.user.verified ? `
                                        <i data-lucide="check-circle" class="h-6 w-6 text-blue-500"></i>
                                    ` : ''}
                                </div>
                                <p class="text-gray-600 dark:text-gray-400 mb-2">@${this.user.username}</p>
                                ${this.user.bio ? `
                                    <p class="text-gray-700 dark:text-gray-300 mb-4">${this.user.bio}</p>
                                ` : ''}
                                
                                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    ${this.user.location ? `
                                        <div class="flex items-center space-x-1">
                                            <i data-lucide="map-pin" class="h-4 w-4"></i>
                                            <span>${this.user.location}</span>
                                        </div>
                                    ` : ''}
                                    <div class="flex items-center space-x-1">
                                        <i data-lucide="calendar" class="h-4 w-4"></i>
                                        <span>Joined ${formatDate(this.user.joinDate)}</span>
                                    </div>
                                    ${this.user.website ? `
                                        <div class="flex items-center space-x-1">
                                            <i data-lucide="link" class="h-4 w-4"></i>
                                            <a href="${this.user.website}" target="_blank" class="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                                                Website
                                            </a>
                                        </div>
                                    ` : ''}
                                </div>

                                <div class="flex items-center space-x-6 text-sm">
                                    <div>
                                        <span class="font-semibold text-gray-900 dark:text-white">${this.user.followers}</span>
                                        <span class="text-gray-600 dark:text-gray-400">followers</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-900 dark:text-white">${this.user.following}</span>
                                        <span class="text-gray-600 dark:text-gray-400">following</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-900 dark:text-white">${this.user.eventsCreated}</span>
                                        <span class="text-gray-600 dark:text-gray-400">events created</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-900 dark:text-white">${this.user.eventsAttended}</span>
                                        <span class="text-gray-600 dark:text-gray-400">events attended</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex flex-col sm:flex-row gap-3">
                                <button
                                    onclick="router.navigate('settings')"
                                    class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                >
                                    <i data-lucide="settings" class="h-4 w-4"></i>
                                    <span>Edit Profile</span>
                                </button>
                                <button
                                    onclick="router.navigate('create-event')"
                                    class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                >
                                    <i data-lucide="plus" class="h-4 w-4"></i>
                                    <span>Create Event</span>
                                </button>
                            </div>
                        </div>

                        <!-- Social Link -->
                        ${this.user.socialLinks && Object.keys(this.user.socialLinks).length > 0 ? `
                            <div class="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                ${this.user.socialLinks.twitter ? `
                                    <a href="${this.user.socialLinks.twitter}" target="_blank" class="text-gray-400 hover:text-blue-500 transition-colors">
                                        <i data-lucide="twitter" class="h-5 w-5"></i>
                                    </a>
                                ` : ''}
                                ${this.user.socialLinks.instagram ? `
                                    <a href="${this.user.socialLinks.instagram}" target="_blank" class="text-gray-400 hover:text-pink-500 transition-colors">
                                        <i data-lucide="instagram" class="h-5 w-5"></i>
                                    </a>
                                ` : ''}
                                ${this.user.socialLinks.facebook ? `
                                    <a href="${this.user.socialLinks.facebook}" target="_blank" class="text-gray-400 hover:text-blue-600 transition-colors">
                                        <i data-lucide="facebook" class="h-5 w-5"></i>
                                    </a>
                                ` : ''}
                                ${this.user.socialLinks.linkedin ? `
                                    <a href="${this.user.socialLinks.linkedin}" target="_blank" class="text-gray-400 hover:text-blue-700 transition-colors">
                                        <i data-lucide="linkedin" class="h-5 w-5"></i>
                                    </a>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Tabs -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <div class="border-b border-gray-200 dark:border-gray-700">
                        <nav class="flex space-x-8 px-6">
                            <button
                                class="tab-btn py-4 text-sm font-medium border-b-2 transition-colors ${this.activeTab === 'events' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}"
                                data-tab="events"
                            >
                                My Events (${this.userEvents.length})
                            </button>
                            <button
                                class="tab-btn py-4 text-sm font-medium border-b-2 transition-colors ${this.activeTab === 'saved' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}"
                                data-tab="saved"
                            >
                                Saved Events (${this.savedEvents.length})
                            </button>
                            <button
                                class="tab-btn py-4 text-sm font-medium border-b-2 transition-colors ${this.activeTab === 'activity' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}"
                                data-tab="activity"
                            >
                                Activity
                            </button>
                        </nav>
                    </div>

                    <div id="tab-content" class="p-6">
                        <!-- Tab content will be rendered here -->
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {

        $$('.tab-btn').forEach(btn => {
            on(btn, 'click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tab) {
        this.activeTab = tab;

        $$('.tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === tab;
            btn.className = `tab-btn py-4 text-sm font-medium border-b-2 transition-colors ${isActive
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`;
        });

        this.renderTabContent();
    }

    renderTabContent() {
        const tabContent = $('#tab-content');

        switch (this.activeTab) {
            case 'events':
                this.renderEventsTab(tabContent);
                break;
            case 'saved':
                this.renderSavedTab(tabContent);
                break;
            case 'activity':
                this.renderActivityTab(tabContent);
                break;
        }

        lucide.createIcons();
    }

    renderEventsTab(container) {
        if (this.userEvents.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16">
                    <i data-lucide="calendar-plus" class="h-16 w-16 text-gray-400 mx-auto mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events created yet</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">Start sharing your amazing events with the community</p>
                    <button
                        onclick="router.navigate('create-event')"
                        class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Create Your First Event
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${this.userEvents.map(event => this.getEventCardHTML(event)).join('')}
            </div>
        `;
    }

    renderSavedTab(container) {
        if (this.savedEvents.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16">
                    <i data-lucide="bookmark" class="h-16 w-16 text-gray-400 mx-auto mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No saved events</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">Save events you're interested in to view them later</p>
                    <button
                        onclick="router.navigate('events')"
                        class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Discover Events
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${this.savedEvents.map(event => this.getEventCardHTML(event)).join('')}
            </div>
        `;
    }

    renderActivityTab(container) {
        const activities = [
            {
                type: 'event_created',
                title: 'Created Tech Conference 2024',
                timestamp: '2024-01-15T10:00:00Z',
                icon: 'calendar-plus',
                color: 'text-blue-600'
            },
            {
                type: 'event_attended',
                title: 'Attended Food Festival',
                timestamp: '2024-01-10T14:30:00Z',
                icon: 'check-circle',
                color: 'text-green-600'
            },
            {
                type: 'profile_updated',
                title: 'Updated profile information',
                timestamp: '2024-01-08T16:20:00Z',
                icon: 'user',
                color: 'text-purple-600'
            }
        ];

        container.innerHTML = `
            <div class="space-y-4">
                ${activities.map(activity => `
                    <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center">
                                <i data-lucide="${activity.icon}" class="h-5 w-5 ${activity.color}"></i>
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">${activity.title}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${formatDate(activity.timestamp)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getEventCardHTML(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const formattedTime = formatTime(event.time);

        return `
            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden group cursor-pointer" onclick="router.navigate('event/${event.id}')">
                <div class="relative">
                    <img 
                        src="${event.images[0]}" 
                        alt="${event.title}"
                        class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    >
                    <div class="absolute top-3 left-3 bg-white dark:bg-gray-800 rounded-lg px-2 py-1 text-xs font-medium">
                        <div class="text-primary-600 dark:text-primary-400">${formattedDate}</div>
                    </div>
                </div>
                
                <div class="p-4">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2" style="background-color: ${event.category.color}20; color: ${event.category.color};">
                        ${event.category.name}
                    </span>
                    
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                        ${event.title}
                    </h3>
                    
                    <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div class="flex items-center space-x-1">
                            <i data-lucide="map-pin" class="h-3 w-3"></i>
                            <span>${event.location.city}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <i data-lucide="users" class="h-3 w-3"></i>
                            <span>${event.attendees}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.ProfilePage = ProfilePage;