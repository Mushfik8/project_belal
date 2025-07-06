

class EventCard {
    constructor(event, container, options = {}) {
        this.event = event;
        this.container = container;
        this.options = {
            showActions: true,
            clickable: true,
            ...options
        };
        this.render();
    }

    render() {
        const eventDate = new Date(this.event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const formattedTime = formatTime(this.event.time);

        const cardHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group ${this.options.clickable ? 'cursor-pointer' : ''}" ${this.options.clickable ? `onclick="router.navigate('event/${this.event.id}')"` : ''}>
                <div class="relative">
                    <img 
                        src="${this.event.images[0]}" 
                        alt="${this.event.title}"
                        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    >
                    <div class="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm font-medium">
                        <div class="text-primary-600 dark:text-primary-400">${formattedDate}</div>
                        <div class="text-gray-600 dark:text-gray-400">${formattedTime}</div>
                    </div>
                    ${this.event.featured ? `
                        <div class="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                        </div>
                    ` : ''}
                </div>
                
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style="background-color: ${this.event.category.color}20; color: ${this.event.category.color};">
                            ${this.event.category.name}
                        </span>
                        ${this.options.showActions ? `
                            <div class="flex items-center space-x-2">
                                <button class="text-gray-400 hover:text-red-500 transition-colors" onclick="event.stopPropagation(); this.toggleSave('${this.event.id}')">
                                    <i data-lucide="heart" class="h-5 w-5"></i>
                                </button>
                                <button class="text-gray-400 hover:text-primary-600 transition-colors" onclick="event.stopPropagation(); this.shareEvent('${this.event.id}')">
                                    <i data-lucide="share-2" class="h-5 w-5"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                    
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                        ${this.event.title}
                    </h3>
                    
                    <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        ${this.event.shortDescription}
                    </p>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <i data-lucide="map-pin" class="h-4 w-4"></i>
                            <span>${this.event.location.city}, ${this.event.location.state}</span>
                        </div>
                        <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <i data-lucide="users" class="h-4 w-4"></i>
                            <span>${this.event.attendees} attending</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                                <i data-lucide="user" class="h-4 w-4 text-white"></i>
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    ${this.event.organizer.name}
                                    ${this.event.organizer.verified ? '<i data-lucide="check-circle" class="h-4 w-4 text-blue-500 inline ml-1"></i>' : ''}
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            ${this.event.pricing.type === 'free' ?
                '<span class="text-green-600 font-semibold">Free</span>' :
                `<span class="text-gray-900 dark:text-white font-semibold">$${this.event.pricing.price}</span>`
            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (typeof this.container === 'string') {
            $(this.container).innerHTML = cardHTML;
        } else {
            this.container.innerHTML = cardHTML;
        }

        lucide.createIcons();

        this.setupEventHandlers();
    }

    setupEventHandlers() {

        if (!window.toggleSaveEvent) {
            window.toggleSaveEvent = (eventId) => {
                console.log('Toggle save event:', eventId);

                app.showNotification('Event saved!', 'success');
            };
        }

        if (!window.shareEvent) {
            window.shareEvent = (eventId) => {
                console.log('Share event:', eventId);

                if (navigator.share) {
                    navigator.share({
                        title: this.event.title,
                        text: this.event.shortDescription,
                        url: `${window.location.origin}/event/${eventId}`
                    });
                } else {

                    const url = `${window.location.origin}/event/${eventId}`;
                    navigator.clipboard.writeText(url).then(() => {
                        app.showNotification('Event link copied to clipboard!', 'success');
                    });
                }
            };
        }
    }

    toggleSave(eventId) {
        window.toggleSaveEvent(eventId);
    }

    shareEvent(eventId) {
        window.shareEvent(eventId);
    }
}

window.EventCard = EventCard;