class SettingsPage {
    constructor() {
        this.user = auth.getCurrentUser();
        this.loading = false;
    }

    async render() {
        const mainContent = $('#main-content');

        showLoading(mainContent);

        try {

            mainContent.innerHTML = this.getHTML();


            this.setupEventListeners();


            lucide.createIcons();

        } catch (error) {
            console.error('Error loading settings page:', error);
            showError('Failed to load settings page');
        }
    }

    getHTML() {
        return `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences</p>
                </div>

                <div class="space-y-8">
                    <!-- Profile Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
                        
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Edit Profile</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Update your profile information, bio, and social links</p>
                                </div>
                                <button
                                    onclick="this.editProfile()"
                                    class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Edit Profile
                                </button>
                            </div>

                            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Profile Visibility</h3>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile</p>
                                    </div>
                                    <select
                                        id="profile-visibility"
                                        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="public" ${this.user.preferences?.privacy?.profileVisibility === 'public' ? 'selected' : ''}>Public</option>
                                        <option value="friends" ${this.user.preferences?.privacy?.profileVisibility === 'friends' ? 'selected' : ''}>Friends Only</option>
                                        <option value="private" ${this.user.preferences?.privacy?.profileVisibility === 'private' ? 'selected' : ''}>Private</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Notification Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="email-notifications"
                                        class="sr-only peer"
                                        ${this.user.preferences?.notifications?.email ? 'checked' : ''}
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in your browser</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="push-notifications"
                                        class="sr-only peer"
                                        ${this.user.preferences?.notifications?.push ? 'checked' : ''}
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Marketing Emails</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Receive promotional emails and updates</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="marketing-notifications"
                                        class="sr-only peer"
                                        ${this.user.preferences?.notifications?.marketing ? 'checked' : ''}
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Privacy Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Show Location</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Display your location on your profile</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="show-location"
                                        class="sr-only peer"
                                        ${this.user.preferences?.privacy?.showLocation ? 'checked' : ''}
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Show Email</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Display your email address on your profile</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="show-email"
                                        class="sr-only peer"
                                        ${this.user.preferences?.privacy?.showEmail ? 'checked' : ''}
                                    />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Theme Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance</h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Theme</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                                </div>
                                <select
                                    id="theme-select"
                                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="light" ${themeManager.getCurrentTheme() === 'light' ? 'selected' : ''}>Light</option>
                                    <option value="dark" ${themeManager.getCurrentTheme() === 'dark' ? 'selected' : ''}>Dark</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Account Settings -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account</h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Change Password</h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
                                </div>
                                <button
                                    onclick="this.changePassword()"
                                    class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Change Password
                                </button>
                            </div>

                            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="text-sm font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
                                    </div>
                                    <button
                                        onclick="this.deleteAccount()"
                                        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="flex justify-end">
                        <button
                            id="save-settings-btn"
                            class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                            <span class="save-text">Save Settings</span>
                            <div class="save-spinner animate-spin rounded-full h-5 w-5 border-b-2 border-white hidden"></div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {

        on('#save-settings-btn', 'click', () => {
            this.saveSettings();
        });

        on('#theme-select', 'change', (e) => {
            themeManager.setTheme(e.target.value);
        });

        window.editProfile = () => {
            const profileForm = new ProfileForm('#main-content');
        };

        window.changePassword = () => {
            this.showChangePasswordModal();
        };

        window.deleteAccount = () => {
            this.showDeleteAccountModal();
        };
    }

    async saveSettings() {
        this.setLoading(true);

        try {
            const settings = {
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
                    },
                    theme: $('#theme-select').value
                }
            };

            const result = await auth.updateProfile(settings);

            if (result.success) {
                app.showNotification('Settings saved successfully!', 'success');
            } else {
                app.showNotification(result.error || 'Failed to save settings', 'error');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            app.showNotification('Failed to save settings. Please try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    showChangePasswordModal() {
        const modalContent = `
            <form id="change-password-form">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="current-password"
                            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>
                </div>
                <div class="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onclick="this.closest('.fixed').remove()"
                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        `;

        const modal = showModal(modalContent, { title: 'Change Password' });

        on('#change-password-form', 'submit', async (e) => {
            e.preventDefault();

            const currentPassword = $('#current-password').value;
            const newPassword = $('#new-password').value;
            const confirmPassword = $('#confirm-password').value;

            if (newPassword !== confirmPassword) {
                app.showNotification('Passwords do not match', 'error');
                return;
            }

            if (newPassword.length < 8) {
                app.showNotification('Password must be at least 8 characters long', 'error');
                return;
            }

            try {
                const result = await auth.changePassword(currentPassword, newPassword);

                if (result.success) {
                    modal.remove();
                    app.showNotification('Password changed successfully!', 'success');
                } else {
                    app.showNotification(result.error || 'Failed to change password', 'error');
                }
            } catch (error) {
                app.showNotification('Failed to change password. Please try again.', 'error');
            }
        });
    }

    showDeleteAccountModal() {
        const modalContent = `
            <div class="text-center">
                <div class="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                    <i data-lucide="alert-triangle" class="h-6 w-6 text-red-600 dark:text-red-400"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Delete Account
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                </p>
                <div class="flex justify-center space-x-3">
                    <button
                        onclick="this.closest('.fixed').remove()"
                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onclick="this.confirmDeleteAccount()"
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        `;

        const modal = showModal(modalContent, { title: 'Confirm Account Deletion' });

        window.confirmDeleteAccount = async () => {
            try {
                const result = await auth.deleteAccount();

                if (result.success) {
                    modal.remove();
                    app.showNotification('Account deleted successfully', 'success');

                } else {
                    app.showNotification(result.error || 'Failed to delete account', 'error');
                }
            } catch (error) {
                app.showNotification('Failed to delete account. Please try again.', 'error');
            }
        };

        lucide.createIcons();
    }

    setLoading(loading) {
        this.loading = loading;
        const submitBtn = $('#save-settings-btn');
        const saveText = $('.save-text');
        const saveSpinner = $('.save-spinner');

        if (loading) {
            submitBtn.disabled = true;
            saveText.textContent = 'Saving...';
            saveSpinner.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            saveText.textContent = 'Save Settings';
            saveSpinner.classList.add('hidden');
        }
    }
}

window.SettingsPage = SettingsPage;