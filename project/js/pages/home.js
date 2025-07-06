class HomePage {
    constructor() {
        this.events = [];
        this.categories = [];
        this.featuredEvents = [];
        this.loading = false;
    }

    async render() {
        const mainContent = $('#main-content');

        showLoading(mainContent);

        try {

            await this.loadData();

            mainContent.innerHTML = this.getHTML();

            this.setupEventListeners();
            this.renderEventCards();

            lucide.createIcons();

        } catch (error) {
            console.error('Error loading home page:', error);
            showError('Failed to load home page');
        }
    }

    async loadData() {

        await Promise.all([
            this.loadEvents(),
            this.loadCategories(),
            this.loadFeaturedEvents()
        ]);
    }

    async loadEvents() {

        this.events = [
            {
                id: '1',
                title: 'Event 1',
                description: 'lorem10..................................................................................................',
                shortDescription: 'short bio.............................',
                images: ['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'tech', name: 'Technology', color: '#3B82F6' },
                date: '2027-03-15',
                time: '09:00',
                location: {
                    name: 'Pizza',
                    address: '123 mirpur',
                    city: 'Mirpur',
                    state: 'Dhaka',
                    country: 'BD'
                },
                organizer: {
                    id: '1',
                    name: 'Tech Events Inc',
                    verified: true
                },
                pricing: { type: 'paid', price: 299, currency: 'bdt' },
                capacity: 500,
                attendees: 342,
                featured: true,
                savedBy: [],
                createdAt: '2026-01-15T10:00:00Z'
            },
            {
                id: '2',
                title: 'event 2',
                description: 'avnwcojncoerwncmeocmomcorwemwveojvnsjvnerojnvjenvejnvejnvjenvenvvnjevnej.',
                shortDescription: 'ovoiernvernvoenvdjnvenjrinvnevn',
                images: ['https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'art', name: 'Arts & Culture', color: '#8B5CF6' },
                date: '2026-03-20',
                time: '18:00',
                location: {
                    name: 'AIUB',
                    address: 'Kuratoli',
                    city: 'dhaka',
                    state: 'dhaka',
                    country: 'BD'
                },
                organizer: {
                    id: '2',
                    name: 'Art Collective',
                    verified: false
                },
                pricing: { type: 'free' },
                capacity: 100,
                attendees: 67,
                featured: false,
                savedBy: [],
                createdAt: '2026-01-15T10:00:00Z'
            },
            {
                id: '3',
                title: 'Burger',
                description: '.dcds.cvrv.vre..........rve..vrr.........erv.',
                shortDescription: 'hello world hello world',
                images: ['https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'food', name: 'Food & Drink', color: '#10B981' },
                date: '2024-03-25',
                time: '12:00',
                location: {
                    name: 'Chilox',
                    address: 'Mirpur',
                    city: 'Mirpur',
                    state: 'Dhaka',
                    country: 'BD'
                },
                organizer: {
                    id: '3',
                    name: 'Foodie Events',
                    verified: true
                },
                pricing: { type: 'paid', price: 25, currency: 'bdt' },
                capacity: 1000,
                attendees: 756,
                featured: true,
                savedBy: [],
                createdAt: '2026-01-15T10:00:00Z'
            }
        ];
    }

    async loadCategories() {

        this.categories = [
            { id: 'tech', name: 'Technology', icon: 'laptop', color: '#3B82F6' },
            { id: 'art', name: 'Arts & Culture', icon: 'palette', color: '#8B5CF6' },
            { id: 'food', name: 'Food & Drink', icon: 'utensils', color: '#10B981' },
            { id: 'music', name: 'Music', icon: 'music', color: '#F59E0B' },
            { id: 'sports', name: 'Sports', icon: 'activity', color: '#EF4444' },
            { id: 'business', name: 'Business', icon: 'briefcase', color: '#6366F1' }
        ];
    }

    async loadFeaturedEvents() {
        this.featuredEvents = this.events.filter(event => event.featured);
    }

    getHTML() {
        return `
        
            <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
                <div class="absolute inset-0 bg-black opacity-20"></div>
                <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div class="text-center max-w-4xl mx-auto">
                        <h1 class="text-4xl md:text-6xl font-bold mb-6">
                            Discover Amazing
                            <span class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Events
                            </span>
                        </h1>
                        <p class="text-xl md:text-2xl mb-8 text-gray-200">
                            Find, create, and share unforgettable experiences with your community
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onclick="router.navigate('events')" class="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                                Explore Events
                            </button>
                            <button onclick="router.navigate('create-event')" class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-white dark:bg-gray-900 py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-w-3xl mx-auto">
                        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <div class="flex flex-col md:flex-row gap-4">
                                <div class="flex-1">
                                    <div class="relative">
                                        <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"></i>
                                        <input 
                                            type="text" 
                                            id="hero-search"
                                            placeholder="Search for events..." 
                                            class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div class="relative">
                                        <i data-lucide="map-pin" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"></i>
                                        <input 
                                            type="text" 
                                            id="hero-location"
                                            placeholder="Location..." 
                                            class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                    </div>
                                </div>
                                <button class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-16 bg-gray-50 dark:bg-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Browse by Category
                        </h2>
                        <p class="text-lg text-gray-600 dark:text-gray-400">
                            Find events that match your interests
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        ${this.categories.map(category => `
                            <div class="bg-white dark:bg-gray-900 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                                <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style="background-color: ${category.color}20;">
                                    <i data-lucide="${category.icon}" class="h-8 w-8" style="color: ${category.color};"></i>
                                </div>
                                <h3 class="font-semibold text-gray-900 dark:text-white">${category.name}</h3>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="py-16 bg-white dark:bg-gray-900">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Featured Events
                        </h2>
                        <p class="text-lg text-gray-600 dark:text-gray-400">
                            Don't miss these popular events
                        </p>
                    </div>
                    
                    <div id="featured-events" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Featured events will be rendered here -->
                    </div>
                </div>
            </section>

            <section class="py-16 bg-gray-50 dark:bg-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between mb-12">
                        <div>
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Upcoming Events
                            </h2>
                            <p class="text-lg text-gray-600 dark:text-gray-400">
                                Latest events in your area
                            </p>
                        </div>
                        <button onclick="router.navigate('events')" class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            View All Events
                        </button>
                    </div>
                    
                    <div id="upcoming-events" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Upcoming events will be rendered here -->
                    </div>
                </div>
            </section>

            <section class="py-16 bg-primary-600">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
                        <div>
                            <div class="text-4xl font-bold mb-2">50K+</div>
                            <div class="text-primary-200">Events Created</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold mb-2">1M+</div>
                            <div class="text-primary-200">Active Users</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold mb-2">100+</div>
                            <div class="text-primary-200">Cities</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold mb-2">5M+</div>
                            <div class="text-primary-200">Tickets Sold</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    setupEventListeners() {

        on('#hero-search', 'keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });


        this.categories.forEach(category => {
            on(`[data-category="${category.id}"]`, 'click', () => {
                router.navigate(`events?category=${category.id}`);
            });
        });
    }

    renderEventCards() {

        const featuredContainer = $('#featured-events');
        if (featuredContainer) {
            featuredContainer.innerHTML = this.featuredEvents.map(event => this.getEventCardHTML(event)).join('');
        }


        const upcomingContainer = $('#upcoming-events');
        if (upcomingContainer) {
            upcomingContainer.innerHTML = this.events.slice(0, 6).map(event => this.getEventCardHTML(event)).join('');
        }

        this.setupEventCardListeners();
    }

    getEventCardHTML(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const formattedTime = formatTime(event.time);

        return `
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer" onclick="router.navigate('event/${event.id}')">
                <div class="relative">
                    <img 
                        src="${event.images[0]}" 
                        alt="${event.title}"
                        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    >
                    <div class="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm font-medium">
                        <div class="text-primary-600 dark:text-primary-400">${formattedDate}</div>
                        <div class="text-gray-600 dark:text-gray-400">${formattedTime}</div>
                    </div>
                    ${event.featured ? `
                        <div class="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                        </div>
                    ` : ''}
                </div>
                
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style="background-color: ${event.category.color}20; color: ${event.category.color};">
                            ${event.category.name}
                        </span>
                        <div class="flex items-center space-x-2">
                            <button class="text-gray-400 hover:text-red-500 transition-colors" onclick="event.stopPropagation(); toggleSaveEvent('${event.id}')">
                                <i data-lucide="heart" class="h-5 w-5"></i>
                            </button>
                            <button class="text-gray-400 hover:text-primary-600 transition-colors" onclick="event.stopPropagation(); shareEvent('${event.id}')">
                                <i data-lucide="share-2" class="h-5 w-5"></i>
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                        ${event.title}
                    </h3>
                    
                    <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        ${event.shortDescription}
                    </p>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <i data-lucide="map-pin" class="h-4 w-4"></i>
                            <span>${event.location.city}, ${event.location.state}</span>
                        </div>
                        <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <i data-lucide="users" class="h-4 w-4"></i>
                            <span>${event.attendees} attending</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                                <i data-lucide="user" class="h-4 w-4 text-white"></i>
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    ${event.organizer.name}
                                    ${event.organizer.verified ? '<i data-lucide="check-circle" class="h-4 w-4 text-blue-500 inline"></i>' : ''}
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            ${event.pricing.type === 'free' ?
                '<span class="text-green-600 font-semibold">Free</span>' :
                `<span class="text-gray-900 dark:text-white font-semibold">$${event.pricing.price}</span>`
            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventCardListeners() {

        window.toggleSaveEvent = (eventId) => {

            console.log('Toggle save event:', eventId);
        };


        window.shareEvent = (eventId) => {

            console.log('Share event:', eventId);
        };
    }

    performSearch() {
        const searchQuery = $('#hero-search').value.trim();
        const location = $('#hero-location').value.trim();

        if (searchQuery || location) {
            const params = new URLSearchParams();
            if (searchQuery) params.append('search', searchQuery);
            if (location) params.append('location', location);

            router.navigate(`events?${params.toString()}`);
        }
    }
}

window.HomePage = HomePage;