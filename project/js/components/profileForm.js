

class ProfileForm {
    constructor(container) {
        this.container = typeof container === 'string' ? $(container) : container;
        this.user = auth.getCurrentUser();
        this.loading = false;
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-8">
                <!-- Profile Header -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                    <div class="relative h-48 bg-gradient-to-r from-primary-600 to-secondary-600">
                        ${this.user.coverPhoto ? `
                            <img src="${this.user.coverPhoto}" alt="Cover" class="w-full h-full object-cover">
                        ` : ''}
                        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                        <button class="absolute top-4 right-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <i data-lucide="camera" class="h-4 w-4 inline mr-2"></i>
                            Change Cover
                        </button>
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
                                <button class="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                                    <i data-lucide="camera" class="h-4 w-4"></i>
                                </button>
                            </div>
                            
                            <div class="flex-1 min-w-0">
                                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">${this.user.displayName}</h1>
                                <p class="text-gray-600 dark:text-gray-400">@${this.user.username}</p>
                                <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span>${this.user.followers} followers</span>
                                    <span>${this.user.following} following</span>
                                    <span>${this.user.eventsCreated} events created</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Profile Form -->
                <form id="profile-form" class="space-y-8">
                    <!-- Basic Information -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            Basic Information
                        </h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    id="display-name"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.displayName}"
                                    required
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.username}"
                                    required
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                                    value="${this.user.email}"
                                    disabled
                                />
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Email cannot be changed
                                </p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.location || ''}"
                                    placeholder="City, Country"
                                />
                            </div>

                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    rows="3"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    placeholder="Tell us about yourself..."
                                >${this.user.bio || ''}</textarea>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.website || ''}"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Social Links -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            Social Links
                        </h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    id="twitter"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.socialLinks?.twitter || ''}"
                                    placeholder="https://twitter.com/username"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    id="instagram"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.socialLinks?.instagram || ''}"
                                    placeholder="https://instagram.com/username"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    id="facebook"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.socialLinks?.facebook || ''}"
                                    placeholder="https://facebook.com/username"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    value="${this.user.socialLinks?.linkedin || ''}"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Privacy Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            Privacy Settings
                        </h2>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Profile Visibility
                                </label>
                                <select
                                    id="profile-visibility"
                                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="public" ${this.user.preferences?.privacy?.profileVisibility === 'public' ? 'selected' : ''}>Public</option>
                                    <option value="friends" ${this.user.preferences?.privacy?.profileVisibility === 'friends' ? 'selected' : ''}>Friends Only</option>
                                    <option value="private" ${this.user.preferences?.privacy?.profileVisibility === 'private' ? 'selected' : ''}>Private</option>
                                </select>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Show Location
                                    </label>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Display your location on your profile
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    id="show-location"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    ${this.user.preferences?.privacy?.showLocation ? 'checked' : ''}
                                />
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Show Email
                                    </label>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Display your email address on your profile
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    id="show-email"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    ${this.user.preferences?.privacy?.showEmail ? 'checked' : ''}
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Notification Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            Notification Settings
                        </h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Notifications
                                    </label>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Receive notifications via email
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    id="email-notifications"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    ${this.user.preferences?.notifications?.email ? 'checked' : ''}
                                />
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Push Notifications
                                    </label>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Receive push notifications in your browser
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    id="push-notifications"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    ${this.user.preferences?.notifications?.push ? 'checked' : ''}
                                />
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Marketing Emails
                                    </label>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Receive promotional emails and updates
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    id="marketing-notifications"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    ${this.user.preferences?.notifications?.marketing ? 'checked' : ''}
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onclick="router.navigate('profile')"
                            class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            id="save-profile-btn"
                            class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <span class="save-text">Save Changes</span>
                            <div class="save-spinner animate-spin rounded-full h-5 w-5 border-b-2 border-white hidden ml-2"></div>
                        </button>
                    </div>
                </form>
            </div>
        `;

        lucide.createIcons();
    }

    setupEventListeners() {

        on('#profile-form', 'submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = this.collectFormData();

        if (!this.validateForm(formData)) {
            return;
        }

        this.setLoading(true);

        try {

            const result = await auth.updateProfile(formData);

            if (result.success) {
                app.showNotification('Profile updated successfully!', 'success');
                setTimeout(() => {
                    router.navigate('profile');
                }, 1000);
            } else {
                app.showNotification(result.error || 'Failed to update profile', 'error');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            app.showNotification('Failed to update profile. Please try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    collectFormData() {
        return {
            displayName: $('#display-name').value.trim(),
            username: $('#username').value.trim(),
            bio: $('#bio').value.trim(),
            location: $('#location').value.trim(),
            website: $('#website').value.trim(),
            socialLinks: {
                twitter: $('#twitter').value.trim(),
                instagram: $('#instagram').value.trim(),
                facebook: $('#facebook').value.trim(),
                linkedin: $('#linkedin').value.trim()
            },
            preferences: {
                ...this.user.preferences,
                privacy: {
                    profileVisibility: $('#profile-visibility').value,
                    showLocation: $('#show-location').checked,
                    showEmail: $('#show-email').checked
                },
                notifications: {
                    email: $('#email-notifications').checked,
                    push: $('#push-notifications').checked,
                    marketing: $('#marketing-notifications').checked
                }
            }
        };
    }

    validateForm(formData) {
        const errors = [];

        if (!formData.displayName) errors.push('Display name is required');
        if (!formData.username) errors.push('Username is required');
        if (formData.username.length < 3) errors.push('Username must be at least 3 characters');

        if (errors.length > 0) {
            app.showNotification(errors[0], 'error');
            return false;
        }

        return true;
    }

    setLoading(loading) {
        this.loading = loading;
        const submitBtn = $('#save-profile-btn');
        const saveText = $('.save-text');
        const saveSpinner = $('.save-spinner');

        if (loading) {
            submitBtn.disabled = true;
            saveText.textContent = 'Saving...';
            saveSpinner.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            saveText.textContent = 'Save Changes';
            saveSpinner.classList.add('hidden');
        }
    }
}

window.ProfileForm = ProfileForm;