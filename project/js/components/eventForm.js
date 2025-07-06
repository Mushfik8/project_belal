

class EventForm {
    constructor(container, eventData = null) {
        this.container = typeof container === 'string' ? $(container) : container;
        this.eventData = eventData;
        this.isEditing = !!eventData;
        this.loading = false;
        this.images = [];
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <form id="event-form" class="space-y-8">
                <!-- Basic Information -->
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Basic Information
                    </h3>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Event Title *
                            </label>
                            <input
                                type="text"
                                id="event-title"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Enter event title"
                                value="${this.eventData?.title || ''}"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Short Description *
                            </label>
                            <input
                                type="text"
                                id="event-short-description"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Brief description for event cards"
                                value="${this.eventData?.shortDescription || ''}"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Description *
                            </label>
                            <textarea
                                id="event-description"
                                rows="4"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Detailed description of your event"
                                required
                            >${this.eventData?.description || ''}</textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category *
                            </label>
                            <select
                                id="event-category"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="tech" ${this.eventData?.category?.id === 'tech' ? 'selected' : ''}>Technology</option>
                                <option value="art" ${this.eventData?.category?.id === 'art' ? 'selected' : ''}>Arts & Culture</option>
                                <option value="food" ${this.eventData?.category?.id === 'food' ? 'selected' : ''}>Food & Drink</option>
                                <option value="music" ${this.eventData?.category?.id === 'music' ? 'selected' : ''}>Music</option>
                                <option value="sports" ${this.eventData?.category?.id === 'sports' ? 'selected' : ''}>Sports</option>
                                <option value="business" ${this.eventData?.category?.id === 'business' ? 'selected' : ''}>Business</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Date and Time -->
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Date & Time
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                id="event-date"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                value="${this.eventData?.date || ''}"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Start Time *
                            </label>
                            <input
                                type="time"
                                id="event-time"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                value="${this.eventData?.time || ''}"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="event-end-date"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                value="${this.eventData?.endDate || ''}"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                End Time
                            </label>
                            <input
                                type="time"
                                id="event-end-time"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                value="${this.eventData?.endTime || ''}"
                            />
                        </div>
                    </div>
                </div>

                <!-- Location -->
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Location
                    </h3>
                    
                    <div class="space-y-6">
                        <div class="flex items-center space-x-4">
                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    name="event-type"
                                    value="physical"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                    ${!this.eventData?.isVirtual ? 'checked' : ''}
                                />
                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Physical Location</span>
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    name="event-type"
                                    value="virtual"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                    ${this.eventData?.isVirtual ? 'checked' : ''}
                                />
                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Virtual Event</span>
                            </label>
                        </div>

                        <div id="physical-location" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Venue Name *
                                </label>
                                <input
                                    type="text"
                                    id="venue-name"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Enter venue name"
                                    value="${this.eventData?.location?.name || ''}"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    id="venue-address"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Enter full address"
                                    value="${this.eventData?.location?.address || ''}"
                                />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        id="venue-city"
                                        class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="City"
                                        value="${this.eventData?.location?.city || ''}"
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        id="venue-state"
                                        class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="State"
                                        value="${this.eventData?.location?.state || ''}"
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        id="venue-country"
                                        class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Country"
                                        value="${this.eventData?.location?.country || 'USA'}"
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="virtual-location" class="hidden">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Virtual Event Link *
                            </label>
                            <input
                                type="url"
                                id="virtual-link"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="https://zoom.us/j/..."
                                value="${this.eventData?.virtualLink || ''}"
                            />
                        </div>
                    </div>
                </div>

                <!-- Pricing -->
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Pricing & Capacity
                    </h3>
                    
                    <div class="space-y-6">
                        <div class="flex items-center space-x-4">
                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    name="pricing-type"
                                    value="free"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                    ${this.eventData?.pricing?.type === 'free' ? 'checked' : ''}
                                />
                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Free Event</span>
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    name="pricing-type"
                                    value="paid"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                    ${this.eventData?.pricing?.type === 'paid' ? 'checked' : ''}
                                />
                                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Paid Event</span>
                            </label>
                        </div>

                        <div id="paid-pricing" class="grid grid-cols-1 md:grid-cols-2 gap-4 ${this.eventData?.pricing?.type !== 'paid' ? 'hidden' : ''}">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ticket Price ($)
                                </label>
                                <input
                                    type="number"
                                    id="ticket-price"
                                    min="0"
                                    step="0.01"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="0.00"
                                    value="${this.eventData?.pricing?.price || ''}"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Currency
                                </label>
                                <select
                                    id="ticket-currency"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="USD" ${this.eventData?.pricing?.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
                                    <option value="EUR" ${this.eventData?.pricing?.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                                    <option value="GBP" ${this.eventData?.pricing?.currency === 'GBP' ? 'selected' : ''}>GBP (£)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Event Capacity *
                            </label>
                            <input
                                type="number"
                                id="event-capacity"
                                min="1"
                                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Maximum number of attendees"
                                value="${this.eventData?.capacity || ''}"
                                required
                            />
                        </div>
                    </div>
                </div>

                <!-- Images -->
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Event Images
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload Images
                            </label>
                            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    id="event-images"
                                    multiple
                                    accept="image/*"
                                    class="hidden"
                                />
                                <label for="event-images" class="cursor-pointer">
                                    <i data-lucide="upload" class="h-12 w-12 text-gray-400 mx-auto mb-4"></i>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        Click to upload images or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        PNG, JPG, GIF up to 10MB each
                                    </p>
                                </label>
                            </div>
                        </div>

                        <div id="image-preview" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <!-- Image previews will be shown here -->
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <button
                        type="button"
                        id="save-draft-btn"
                        class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        id="publish-event-btn"
                        class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <span class="publish-text">${this.isEditing ? 'Update Event' : 'Publish Event'}</span>
                        <div class="publish-spinner animate-spin rounded-full h-5 w-5 border-b-2 border-white hidden ml-2"></div>
                    </button>
                </div>
            </form>
        `;

        lucide.createIcons();
    }

    setupEventListeners() {

        on('#event-form', 'submit', (e) => {
            e.preventDefault();
            this.handleSubmit('published');
        });


        on('#save-draft-btn', 'click', () => {
            this.handleSubmit('draft');
        });

        $$('input[name="event-type"]').forEach(radio => {
            on(radio, 'change', () => {
                this.toggleEventType();
            });
        });


        $$('input[name="pricing-type"]').forEach(radio => {
            on(radio, 'change', () => {
                this.togglePricingType();
            });
        });

        on('#event-images', 'change', (e) => {
            this.handleImageUpload(e);
        });

        this.toggleEventType();
        this.togglePricingType();
    }

    toggleEventType() {
        const isVirtual = $('input[name="event-type"]:checked').value === 'virtual';
        const physicalLocation = $('#physical-location');
        const virtualLocation = $('#virtual-location');

        if (isVirtual) {
            physicalLocation.classList.add('hidden');
            virtualLocation.classList.remove('hidden');
        } else {
            physicalLocation.classList.remove('hidden');
            virtualLocation.classList.add('hidden');
        }
    }

    togglePricingType() {
        const isPaid = $('input[name="pricing-type"]:checked').value === 'paid';
        const paidPricing = $('#paid-pricing');

        if (isPaid) {
            paidPricing.classList.remove('hidden');
        } else {
            paidPricing.classList.add('hidden');
        }
    }

    handleImageUpload(e) {
        const files = Array.from(e.target.files);
        const preview = $('#image-preview');

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'relative group';
                    imageDiv.innerHTML = `
                        <img src="${e.target.result}" alt="Preview" class="w-full h-24 object-cover rounded-lg">
                        <button type="button" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" onclick="this.parentElement.remove()">
                            <i data-lucide="x" class="h-3 w-3"></i>
                        </button>
                    `;
                    preview.appendChild(imageDiv);
                    lucide.createIcons();
                };
                reader.readAsDataURL(file);
                this.images.push(file);
            }
        });
    }

    async handleSubmit(status) {
        const formData = this.collectFormData();
        formData.status = status;

        if (!this.validateForm(formData)) {
            return;
        }

        this.setLoading(true);

        try {

            await new Promise(resolve => setTimeout(resolve, 1500));


            const event = {
                id: this.eventData?.id || Math.random().toString(36).substr(2, 9),
                ...formData,
                organizer: {
                    id: auth.getCurrentUser().id,
                    name: auth.getCurrentUser().displayName,
                    verified: auth.getCurrentUser().verified
                },
                attendees: this.eventData?.attendees || 0,
                featured: this.eventData?.featured || false,
                savedBy: this.eventData?.savedBy || [],
                createdAt: this.eventData?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };


            const events = storage.get('events') || [];
            if (this.isEditing) {
                const index = events.findIndex(e => e.id === event.id);
                if (index !== -1) {
                    events[index] = event;
                }
            } else {
                events.push(event);
            }
            storage.set('events', events);

            app.showNotification(
                `Event ${status === 'draft' ? 'saved as draft' : this.isEditing ? 'updated' : 'published'} successfully!`,
                'success'
            );

            setTimeout(() => {
                router.navigate('events');
            }, 1000);

        } catch (error) {
            console.error('Error saving event:', error);
            app.showNotification('Failed to save event. Please try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    collectFormData() {
        const isVirtual = $('input[name="event-type"]:checked').value === 'virtual';
        const isPaid = $('input[name="pricing-type"]:checked').value === 'paid';

        const categoryMap = {
            'tech': { id: 'tech', name: 'Technology', color: '#3B82F6' },
            'art': { id: 'art', name: 'Arts & Culture', color: '#8B5CF6' },
            'food': { id: 'food', name: 'Food & Drink', color: '#10B981' },
            'music': { id: 'music', name: 'Music', color: '#F59E0B' },
            'sports': { id: 'sports', name: 'Sports', color: '#EF4444' },
            'business': { id: 'business', name: 'Business', color: '#6366F1' }
        };

        return {
            title: $('#event-title').value.trim(),
            shortDescription: $('#event-short-description').value.trim(),
            description: $('#event-description').value.trim(),
            category: categoryMap[$('#event-category').value],
            date: $('#event-date').value,
            time: $('#event-time').value,
            endDate: $('#event-end-date').value || null,
            endTime: $('#event-end-time').value || null,
            isVirtual: isVirtual,
            location: isVirtual ? {
                name: 'Virtual Event',
                address: 'Online',
                city: 'Virtual',
                state: 'Online',
                country: 'Global'
            } : {
                name: $('#venue-name').value.trim(),
                address: $('#venue-address').value.trim(),
                city: $('#venue-city').value.trim(),
                state: $('#venue-state').value.trim(),
                country: $('#venue-country').value.trim()
            },
            virtualLink: isVirtual ? $('#virtual-link').value.trim() : null,
            pricing: isPaid ? {
                type: 'paid',
                price: parseFloat($('#ticket-price').value) || 0,
                currency: $('#ticket-currency').value
            } : {
                type: 'free'
            },
            capacity: parseInt($('#event-capacity').value) || 0,
            images: this.eventData?.images || ['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'],
            tags: []
        };
    }

    validateForm(formData) {
        const errors = [];

        if (!formData.title) errors.push('Event title is required');
        if (!formData.shortDescription) errors.push('Short description is required');
        if (!formData.description) errors.push('Description is required');
        if (!formData.category) errors.push('Category is required');
        if (!formData.date) errors.push('Event date is required');
        if (!formData.time) errors.push('Event time is required');
        if (!formData.capacity || formData.capacity < 1) errors.push('Valid capacity is required');

        if (!formData.isVirtual) {
            if (!formData.location.name) errors.push('Venue name is required');
            if (!formData.location.address) errors.push('Venue address is required');
            if (!formData.location.city) errors.push('City is required');
            if (!formData.location.state) errors.push('State is required');
            if (!formData.location.country) errors.push('Country is required');
        } else {
            if (!formData.virtualLink) errors.push('Virtual event link is required');
        }

        if (formData.pricing.type === 'paid') {
            if (!formData.pricing.price || formData.pricing.price <= 0) {
                errors.push('Valid ticket price is required for paid events');
            }
        }

        if (errors.length > 0) {
            app.showNotification(errors[0], 'error');
            return false;
        }

        return true;
    }

    setLoading(loading) {
        this.loading = loading;
        const submitBtn = $('#publish-event-btn');
        const publishText = $('.publish-text');
        const publishSpinner = $('.publish-spinner');
        const draftBtn = $('#save-draft-btn');

        if (loading) {
            submitBtn.disabled = true;
            draftBtn.disabled = true;
            publishText.textContent = 'Publishing...';
            publishSpinner.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            draftBtn.disabled = false;
            publishText.textContent = this.isEditing ? 'Update Event' : 'Publish Event';
            publishSpinner.classList.add('hidden');
        }
    }
}

window.EventForm = EventForm;