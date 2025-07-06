class EventsPage {
    constructor() {
        this.events = [];
        this.categories = [];
        this.currentFilters = {
            search: '',
            category: '',
            date: '',
            price: '',
            location: ''
        };
        this.currentSort = 'date';
        this.currentView = 'grid';
        this.loading = false;
    }

    async render() {
        const mainContent = $('#main-content');

        // Show loading
        showLoading(mainContent);

        try {
            // Load data
            await this.loadData();

            // Render page
            mainContent.innerHTML = this.getHTML();

            // Initialize components
            this.setupEventListeners();
            this.renderEvents();

            // Initialize Lucide icons
            lucide.createIcons();

        } catch (error) {
            console.error('Error loading events page:', error);
            showError('Failed to load events page');
        }
    }

    async loadData() {
        // Load events and categories
        await Promise.all([
            this.loadEvents(),
            this.loadCategories()
        ]);
    }

    async loadEvents() {
        // Mock events data - in real app, this would be an API call
        this.events = [
            {
                id: '1',
                title: 'Tech Conference 2024',
                description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative technologies, and networking opportunities.',
                shortDescription: 'Annual tech conference with industry leaders',
                images: ['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'tech', name: 'Technology', color: '#3B82F6' },
                date: '2024-03-15',
                time: '09:00',
                location: {
                    name: 'Convention Center',
                    address: '123 Main St',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'USA'
                },
                organizer: {
                    id: '1',
                    name: 'Tech Events Inc',
                    verified: true
                },
                pricing: { type: 'paid', price: 299, currency: 'USD' },
                capacity: 500,
                attendees: 342,
                featured: true,
                savedBy: []
            },
            {
                id: '2',
                title: 'Art Gallery Opening',
                description: 'Discover amazing contemporary art pieces from local and international artists in this exclusive gallery opening.',
                shortDescription: 'Contemporary art exhibition opening',
                images: ['https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'art', name: 'Arts & Culture', color: '#8B5CF6' },
                date: '2024-03-20',
                time: '18:00',
                location: {
                    name: 'Downtown Gallery',
                    address: '456 Art Ave',
                    city: 'New York',
                    state: 'NY',
                    country: 'USA'
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
                savedBy: []
            },
            {
                id: '3',
                title: 'Food Festival',
                description: 'Taste delicious food from around the world at our annual food festival featuring local vendors and international cuisine.',
                shortDescription: 'International food festival',
                images: ['https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'food', name: 'Food & Drink', color: '#10B981' },
                date: '2024-03-25',
                time: '12:00',
                location: {
                    name: 'Central Park',
                    address: 'Central Park West',
                    city: 'New York',
                    state: 'NY',
                    country: 'USA'
                },
                organizer: {
                    id: '3',
                    name: 'Foodie Events',
                    verified: true
                },
                pricing: { type: 'paid', price: 25, currency: 'USD' },
                capacity: 1000,
                attendees: 756,
                featured: true,
                savedBy: []
            },
            {
                id: '4',
                title: 'Music Festival',
                description: 'Experience live music from amazing artists in this outdoor music festival featuring multiple stages and food vendors.',
                shortDescription: 'Outdoor music festival',
                images: ['https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'music', name: 'Music', color: '#F59E0B' },
                date: '2024-04-01',
                time: '14:00',
                location: {
                    name: 'Riverside Park',
                    address: '789 River Rd',
                    city: 'Austin',
                    state: 'TX',
                    country: 'USA'
                },
                organizer: {
                    id: '4',
                    name: 'Music Collective',
                    verified: true
                },
                pricing: { type: 'paid', price: 75, currency: 'USD' },
                capacity: 2000,
                attendees: 1543,
                featured: false,
                savedBy: []
            },
            {
                id: '5',
                title: 'Startup Pitch Competition',
                description: 'Watch innovative startups pitch their ideas to top investors and vote for your favorite.',
                shortDescription: 'Startup pitch competition',
                images: ['https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'business', name: 'Business', color: '#6366F1' },
                date: '2024-04-05',
                time: '19:00',
                location: {
                    name: 'Innovation Hub',
                    address: '321 Startup St',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'USA'
                },
                organizer: {
                    id: '5',
                    name: 'Startup Hub',
                    verified: true
                },
                pricing: { type: 'free' },
                capacity: 200,
                attendees: 156,
                featured: false,
                savedBy: []
            },
            {
                id: '6',
                title: 'Marathon Run',
                description: 'Join thousands of runners in this annual marathon through the city streets with amazing views and community support.',
                shortDescription: 'Annual city marathon',
                images: ['https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
                category: { id: 'sports', name: 'Sports', color: '#EF4444' },
                date: '2024-04-10',
                time: '07:00',
                location: {
                    name: 'City Center',
                    address: 'Main Street',
                    city: 'Chicago',
                    state: 'IL',
                    country: 'USA'
                },
                organizer: {
                    id: '6',
                    name: 'Running Club',
                    verified: false
                },
                pricing: { type: 'paid', price: 45, currency: 'USD' },
                capacity: 5000,
                attendees: 3421,
                featured: true,
                savedBy: []
            }
        ];
    }

    async loadCategories() {
        // Mock categories data
        this.categories = [
            { id: 'all', name: 'All Categories', icon: 'grid', color: '#6B7280' },
            { id: 'tech', name: 'Technology', icon: 'laptop', color: '#3B82F6' },
            { id: 'art', name: 'Arts & Culture', icon: 'palette', color: '#8B5CF6' },
            { id: 'food', name: 'Food & Drink', icon: 'utensils', color: '#10B981' },
            { id: 'music', name: 'Music', icon: 'music', color: '#F59E0B' },
            { id: 'sports', name: 'Sports', icon: 'activity', color: '#EF4444' },
            { id: 'business', name: 'Business', icon: 'briefcase', color: '#6366F1' }
        ];
    }

    getHTML() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Discover Events
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400">
                        Find amazing events happening near you
                    </p>
                </div>

                <!-- Filters and Search -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
                    <div class="flex flex-col lg:flex-row gap-4 mb-6">
                        <!-- Search -->
                        <div class="flex-1">
                            <div class="relative">
                                <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"></i>
                                <input 
                                    type="text" 
                                    id="search-input"
                                    placeholder="Search events..." 
                                    class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    value="${this.currentFilters.search}"
                                >
                            </div>
                        </div>

                        <!-- Location -->
                        <div class="flex-1">
                            <div class="relative">
                                <i data-lucide="map-pin" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"></i>
                                <input 
                                    type="text" 
                                    id="location-input"
                                    placeholder="Location..." 
                                    class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    value="${this.currentFilters.location}"
                                >
                            </div>
                        </div>

                        <!-- Date Filter -->
                        <div class="flex-1">
                            <select 
                                id="date-filter"
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Any Date</option>
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>

                        <!-- Price Filter -->
                        <div class="flex-1">
                            <select 
                                id="price-filter"
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Any Price</option>
                                <option value="free">Free</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${this.categories.map(category => `
                            <button 
                                class="category-filter px-4 py-2 rounded-full border text-sm font-medium transition-colors ${this.currentFilters.category === category.id ?
                'bg-primary-600 text-white border-primary-600' :
                'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
            }"
                                data-category="${category.id}"
                            >
                                <i data-lucide="${category.icon}" class="h-4 w-4 inline mr-2"></i>
                                ${category.name}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Controls -->
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-600 dark:text-gray-400">
                                ${this.getFilteredEvents().length} events found
                            </span>
                        </div>

                        <div class="flex items-center space-x-4">
                            <!-- Sort -->
                            <select 
                                id="sort-select"
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="popularity">Sort by Popularity</option>
                                <option value="price">Sort by Price</option>
                                <option value="distance">Sort by Distance</option>
                            </select>

                            <!-- View Toggle -->
                            <div class="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                                <button 
                                    id="grid-view-btn"
                                    class="px-3 py-2 text-sm font-medium transition-colors ${this.currentView === 'grid' ?
                'bg-primary-600 text-white' :
                'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
            }"
                                >
                                    <i data-lucide="grid" class="h-4 w-4"></i>
                                </button>
                                <button 
                                    id="list-view-btn"
                                    class="px-3 py-2 text-sm font-medium transition-colors ${this.currentView === 'list' ?
                'bg-primary-600 text-white' :
                'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
            }"
                                >
                                    <i data-lucide="list" class="h-4 w-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Events Grid/List -->
                <div id="events-container" class="min-h-96">
                    <!-- Events will be rendered here -->
                </div>

                <!-- Load More Button -->
                <div class="text-center mt-8">
                    <button 
                        id="load-more-btn"
                        class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        Load More Events
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search input
        on('#search-input', 'input', debounce((e) => {
            this.currentFilters.search = e.target.value;
            this.renderEvents();
        }, 300));

        // Location input
        on('#location-input', 'input', debounce((e) => {
            this.currentFilters.location = e.target.value;
            this.renderEvents();
        }, 300));

        // Date filter
        on('#date-filter', 'change', (e) => {
            this.currentFilters.date = e.target.value;
            this.renderEvents();
        });

        // Price filter
        on('#price-filter', 'change', (e) => {
            this.currentFilters.price = e.target.value;
            this.renderEvents();
        });

        // Category filters
        $$('.category-filter').forEach(btn => {
            on(btn, 'click', (e) => {
                const category = e.target.closest('.category-filter').dataset.category;
                this.currentFilters.category = this.currentFilters.category === category ? '' : category;
                this.updateCategoryButtons();
                this.renderEvents();
            });
        });

        // Sort select
        on('#sort-select', 'change', (e) => {
            this.currentSort = e.target.value;
            this.renderEvents();
        });

        // View toggle
        on('#grid-view-btn', 'click', () => {
            this.currentView = 'grid';
            this.updateViewButtons();
            this.renderEvents();
        });

        on('#list-view-btn', 'click', () => {
            this.currentView = 'list';
            this.updateViewButtons();
            this.renderEvents();
        });

        // Load more
        on('#load-more-btn', 'click', () => {
            this.loadMoreEvents();
        });
    }

    updateCategoryButtons() {
        $$('.category-filter').forEach(btn => {
            const category = btn.dataset.category;
            if (this.currentFilters.category === category) {
                btn.className = 'category-filter px-4 py-2 rounded-full border text-sm font-medium transition-colors bg-primary-600 text-white border-primary-600';
            } else {
                btn.className = 'category-filter px-4 py-2 rounded-full border text-sm font-medium transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600';
            }
        });
    }

    updateViewButtons() {
        const gridBtn = $('#grid-view-btn');
        const listBtn = $('#list-view-btn');

        if (this.currentView === 'grid') {
            gridBtn.className = 'px-3 py-2 text-sm font-medium transition-colors bg-primary-600 text-white';
            listBtn.className = 'px-3 py-2 text-sm font-medium transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600';
        } else {
            gridBtn.className = 'px-3 py-2 text-sm font-medium transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600';
            listBtn.className = 'px-3 py-2 text-sm font-medium transition-colors bg-primary-600 text-white';
        }
    }

    getFilteredEvents() {
        let filteredEvents = [...this.events];

        // Apply search filter
        if (this.currentFilters.search) {
            const search = this.currentFilters.search.toLowerCase();
            filteredEvents = filteredEvents.filter(event =>
                event.title.toLowerCase().includes(search) ||
                event.description.toLowerCase().includes(search) ||
                event.category.name.toLowerCase().includes(search)
            );
        }

        // Apply category filter
        if (this.currentFilters.category && this.currentFilters.category !== 'all') {
            filteredEvents = filteredEvents.filter(event =>
                event.category.id === this.currentFilters.category
            );
        }

        // Apply price filter
        if (this.currentFilters.price) {
            filteredEvents = filteredEvents.filter(event =>
                event.pricing.type === this.currentFilters.price
            );
        }

        // Apply location filter
        if (this.currentFilters.location) {
            const location = this.currentFilters.location.toLowerCase();
            filteredEvents = filteredEvents.filter(event =>
                event.location.city.toLowerCase().includes(location) ||
                event.location.state.toLowerCase().includes(location) ||
                event.location.country.toLowerCase().includes(location)
            );
        }

        // Apply date filter
        if (this.currentFilters.date) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);

            filteredEvents = filteredEvents.filter(event => {
                const eventDate = new Date(event.date);
                switch (this.currentFilters.date) {
                    case 'today':
                        return eventDate.toDateString() === today.toDateString();
                    case 'tomorrow':
                        return eventDate.toDateString() === tomorrow.toDateString();
                    case 'week':
                        return eventDate <= nextWeek;
                    case 'month':
                        return eventDate <= nextMonth;
                    default:
                        return true;
                }
            });
        }

        // Apply sorting
        switch (this.currentSort) {
            case 'date':
                filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popularity':
                filteredEvents.sort((a, b) => b.attendees - a.attendees);
                break;
            case 'price':
                filteredEvents.sort((a, b) => {
                    const priceA = a.pricing.type === 'free' ? 0 : a.pricing.price;
                    const priceB = b.pricing.type === 'free' ? 0 : b.pricing.price;
                    return priceA - priceB;
                });
                break;
            case 'distance':
                // For demo purposes, random sort
                filteredEvents.sort(() => Math.random() - 0.5);
                break;
        }

        return filteredEvents;
    }

    renderEvents() {
        const container = $('#events-container');
        const filteredEvents = this.getFilteredEvents();

        if (filteredEvents.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16">
                    <i data-lucide="calendar-x" class="h-16 w-16 text-gray-400 mx-auto mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
                    <p class="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        if (this.currentView === 'grid') {
            container.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${filteredEvents.map(event => this.getEventCardHTML(event)).join('')}
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="space-y-6">
                    ${filteredEvents.map(event => this.getEventListHTML(event)).join('')}
                </div>
            `;
        }

        // Update events count
        const countElement = container.parentElement.querySelector('.text-sm');
        if (countElement) {
            countElement.textContent = `${filteredEvents.length} events found`;
        }

        // Initialize event interactions
        this.setupEventInteractions();
        lucide.createIcons();
    }

    getEventCardHTML(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const formattedTime = formatTime(event.time);

        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer" onclick="router.navigate('event/${event.id}')">
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
                                    ${event.organizer.verified ? '<i data-lucide="check-circle" class="h-4 w-4 text-blue-500 inline ml-1"></i>' : ''}
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

    getEventListHTML(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        const formattedTime = formatTime(event.time);

        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer" onclick="router.navigate('event/${event.id}')">
                <div class="flex">
                    <div class="relative flex-shrink-0 w-48 h-32">
                        <img 
                            src="${event.images[0]}" 
                            alt="${event.title}"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        >
                        ${event.featured ? `
                            <div class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                                Featured
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="flex-1 p-6">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center space-x-3">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style="background-color: ${event.category.color}20; color: ${event.category.color};">
                                    ${event.category.name}
                                </span>
                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                    ${formattedDate} • ${formattedTime}
                                </div>
                            </div>
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
                            ${event.description}
                        </p>
                        
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <div class="flex items-center space-x-1">
                                    <i data-lucide="map-pin" class="h-4 w-4"></i>
                                    <span>${event.location.city}, ${event.location.state}</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i data-lucide="users" class="h-4 w-4"></i>
                                    <span>${event.attendees} attending</span>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                                        <i data-lucide="user" class="h-4 w-4 text-white"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                                            ${event.organizer.name}
                                            ${event.organizer.verified ? '<i data-lucide="check-circle" class="h-4 w-4 text-blue-500 inline ml-1"></i>' : ''}
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
                </div>
            </div>
        `;
    }

    setupEventInteractions() {
        // Save event functionality
        window.toggleSaveEvent = (eventId) => {
            console.log('Toggle save event:', eventId);
            // TODO: Implement save functionality
        };

        // Share event functionality
        window.shareEvent = (eventId) => {
            console.log('Share event:', eventId);
            // TODO: Implement share functionality
        };
    }

    loadMoreEvents() {
        // TODO: Implement load more functionality
        console.log('Load more events');
    }
}

// Export for global use
window.EventsPage = EventsPage;