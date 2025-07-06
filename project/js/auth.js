class AuthSystem {
    constructor() {
        this.user = null;
        this.token = null;
        this.init();
    }

    init() {

        this.user = storage.get('user');
        this.token = storage.get('auth_token');

        if (this.user && this.token) {
            this.updateUI();
        }
    }

    async login(email, password) {
        try {

            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser = {
                id: '1',
                email: email,
                username: email.split('@')[0],
                displayName: email.split('@')[0],
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                coverPhoto: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&dpr=2',
                bio: 'Event enthusiast and community builder',
                location: 'New York, NY',
                website: 'https://johndoe.com',
                socialLinks: {
                    twitter: 'https://twitter.com/johndoe',
                    instagram: 'https://instagram.com/johndoe',
                    linkedin: 'https://linkedin.com/in/johndoe'
                },
                followers: 1250,
                following: 456,
                eventsCreated: 23,
                eventsAttended: 89,
                joinDate: '2023-01-15',
                verified: true,
                isOnline: true,
                lastSeen: new Date().toISOString(),
                preferences: {
                    theme: 'light',
                    notifications: {
                        email: true,
                        push: true,
                        marketing: false
                    },
                    privacy: {
                        profileVisibility: 'public',
                        showLocation: true,
                        showEmail: false
                    }
                }
            };

            const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);

            storage.set('user', mockUser);
            storage.set('auth_token', mockToken);

            this.user = mockUser;
            this.token = mockToken;

            this.updateUI();
            return { success: true, user: mockUser };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Invalid credentials' };
        }
    }

    async register(email, password, username, displayName) {
        try {

            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser = {
                id: Math.random().toString(36).substr(2, 9),
                email: email,
                username: username,
                displayName: displayName || username,
                avatar: null,
                coverPhoto: null,
                bio: '',
                location: '',
                website: '',
                socialLinks: {},
                followers: 0,
                following: 0,
                eventsCreated: 0,
                eventsAttended: 0,
                joinDate: new Date().toISOString(),
                verified: false,
                isOnline: true,
                lastSeen: new Date().toISOString(),
                preferences: {
                    theme: 'light',
                    notifications: {
                        email: true,
                        push: true,
                        marketing: false
                    },
                    privacy: {
                        profileVisibility: 'public',
                        showLocation: true,
                        showEmail: false
                    }
                }
            };

            const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);

            storage.set('user', mockUser);
            storage.set('auth_token', mockToken);

            this.user = mockUser;
            this.token = mockToken;

            this.updateUI();
            return { success: true, user: mockUser };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Registration failed' };
        }
    }

    async loginWithOAuth(provider) {
        try {

            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockUser = {
                id: Math.random().toString(36).substr(2, 9),
                email: `user@${provider}.com`,
                username: `${provider}User`,
                displayName: `${provider} User`,
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                coverPhoto: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&dpr=2',
                bio: `Connected via ${provider}`,
                location: 'Global',
                website: '',
                socialLinks: {},
                followers: 256,
                following: 128,
                eventsCreated: 8,
                eventsAttended: 23,
                joinDate: '2023-06-15',
                verified: true,
                isOnline: true,
                lastSeen: new Date().toISOString(),
                preferences: {
                    theme: 'light',
                    notifications: {
                        email: true,
                        push: true,
                        marketing: false
                    },
                    privacy: {
                        profileVisibility: 'public',
                        showLocation: true,
                        showEmail: false
                    }
                }
            };

            const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);

            storage.set('user', mockUser);
            storage.set('auth_token', mockToken);

            this.user = mockUser;
            this.token = mockToken;

            this.updateUI();
            return { success: true, user: mockUser };
        } catch (error) {
            console.error('OAuth error:', error);
            return { success: false, error: `${provider} authentication failed` };
        }
    }

    async forgotPassword(email) {
        try {

            await new Promise(resolve => setTimeout(resolve, 1000));

            return { success: true, message: 'Password reset email sent' };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: 'Password reset failed' };
        }
    }

    async resetPassword(token, newPassword) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            return { success: true, message: 'Password reset successful' };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: 'Password reset failed' };
        }
    }

    async updateProfile(profileData) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update user data
            this.user = { ...this.user, ...profileData };
            storage.set('user', this.user);

            this.updateUI();
            return { success: true, user: this.user };
        } catch (error) {
            console.error('Profile update error:', error);
            return { success: false, error: 'Profile update failed' };
        }
    }

    async changePassword(currentPassword, newPassword) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            return { success: true, message: 'Password changed successfully' };
        } catch (error) {
            console.error('Password change error:', error);
            return { success: false, error: 'Password change failed' };
        }
    }

    async deleteAccount() {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.logout();
            return { success: true, message: 'Account deleted successfully' };
        } catch (error) {
            console.error('Account deletion error:', error);
            return { success: false, error: 'Account deletion failed' };
        }
    }

    logout() {
        // Clear user data
        this.user = null;
        this.token = null;

        // Clear storage
        storage.remove('user');
        storage.remove('auth_token');

        // Redirect to login
        router.navigate('login');
    }

    isAuthenticated() {
        return this.user !== null && this.token !== null;
    }

    getCurrentUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }

    updateUI() {
        if (this.isAuthenticated()) {
            // Show authenticated UI
            $('#header').classList.remove('hidden');
            $('#footer').classList.remove('hidden');

            // Update profile info in header
            const profileBtn = $('#profile-btn');
            if (profileBtn) {
                const displayName = this.user.displayName || this.user.username;
                const avatar = this.user.avatar;

                profileBtn.innerHTML = `
                    ${avatar ?
                        `<img src="${avatar}" alt="${displayName}" class="h-8 w-8 rounded-full object-cover">` :
                        `<div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                            <i data-lucide="user" class="h-4 w-4 text-white"></i>
                        </div>`
                    }
                    <span class="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">${displayName}</span>
                `;
                lucide.createIcons();
            }
        } else {
            // Show unauthenticated UI
            $('#header').classList.add('hidden');
            $('#footer').classList.add('hidden');
        }
    }

    // Event listeners
    setupEventListeners() {
        // Logout button
        on('#logout-btn', 'click', () => {
            this.logout();
        });

        // Profile dropdown toggle
        on('#profile-btn', 'click', (e) => {
            e.stopPropagation();
            const dropdown = $('#profile-dropdown');
            dropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        on(document, 'click', (e) => {
            const dropdown = $('#profile-dropdown');
            const profileBtn = $('#profile-btn');

            if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }
}

// Initialize authentication system
const auth = new AuthSystem();

// Setup event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    auth.setupEventListeners();
});

// Export for global use
window.auth = auth;