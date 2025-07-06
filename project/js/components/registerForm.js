

class RegisterForm {
    constructor(container) {
        this.container = typeof container === 'string' ? $(container) : container;
        this.loading = false;
        this.error = null;
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="w-full max-w-md">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div class="text-center mb-8">
                        <div class="mx-auto w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mb-4">
                            <i data-lucide="user-plus" class="h-6 w-6 text-white"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                            Create Account
                        </h2>
                        <p class="mt-2 text-gray-600 dark:text-gray-400">
                            Join EventShare community
                        </p>
                    </div>

                    <div id="register-error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hidden">
                        <p class="text-sm text-red-600 dark:text-red-400"></p>
                    </div>

                    <form id="register-form" class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="register-first-name"
                                    class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="register-last-name"
                                    class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Username
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i data-lucide="at-sign" class="h-5 w-5 text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    id="register-username"
                                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i data-lucide="mail" class="h-5 w-5 text-gray-400"></i>
                                </div>
                                <input
                                    type="email"
                                    id="register-email"
                                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i data-lucide="lock" class="h-5 w-5 text-gray-400"></i>
                                </div>
                                <input
                                    type="password"
                                    id="register-password"
                                    class="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="Create a password"
                                    required
                                />
                                <button
                                    type="button"
                                    id="toggle-register-password"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <i data-lucide="eye" class="h-5 w-5 text-gray-400"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    Password must be at least 8 characters long
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i data-lucide="lock" class="h-5 w-5 text-gray-400"></i>
                                </div>
                                <input
                                    type="password"
                                    id="register-confirm-password"
                                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        </div>

                        <div class="flex items-center">
                            <input
                                id="agree-terms"
                                name="agree-terms"
                                type="checkbox"
                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                                required
                            />
                            <label for="agree-terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                I agree to the 
                                <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                                    Terms of Service
                                </a>
                                and 
                                <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            id="register-submit"
                            class="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <span class="register-text">Create Account</span>
                            <div class="register-spinner animate-spin rounded-full h-5 w-5 border-b-2 border-white hidden ml-2"></div>
                        </button>
                    </form>

                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-3 gap-3">
                            <button
                                id="google-register"
                                class="oauth-btn inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <i data-lucide="chrome" class="h-5 w-5"></i>
                            </button>

                            <button
                                id="facebook-register"
                                class="oauth-btn inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <i data-lucide="facebook" class="h-5 w-5"></i>
                            </button>

                            <button
                                id="apple-register"
                                class="oauth-btn inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <i data-lucide="apple" class="h-5 w-5"></i>
                            </button>
                        </div>
                    </div>

                    <div class="mt-6 text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?
                            <button
                                id="switch-to-login"
                                class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
    }

    setupEventListeners() {

        on('#register-form', 'submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        on('#toggle-register-password', 'click', () => {
            const passwordInput = $('#register-password');
            const icon = $('#toggle-register-password i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                passwordInput.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });

        on('#google-register', 'click', () => this.handleOAuthLogin('google'));
        on('#facebook-register', 'click', () => this.handleOAuthLogin('facebook'));
        on('#apple-register', 'click', () => this.handleOAuthLogin('apple'));

        on('#switch-to-login', 'click', () => {
            router.navigate('login');
        });

        on('#register-username', 'input', debounce(this.validateUsername.bind(this), 300));
        on('#register-email', 'input', debounce(this.validateEmail.bind(this), 300));
        on('#register-password', 'input', this.validatePassword.bind(this));
        on('#register-confirm-password', 'input', this.validatePasswordMatch.bind(this));
    }

    async handleRegister() {
        const firstName = $('#register-first-name').value.trim();
        const lastName = $('#register-last-name').value.trim();
        const username = $('#register-username').value.trim();
        const email = $('#register-email').value.trim();
        const password = $('#register-password').value;
        const confirmPassword = $('#register-confirm-password').value;
        const agreeTerms = $('#agree-terms').checked;

        if (!validateRequired(firstName)) {
            this.showError('First name is required');
            return;
        }

        if (!validateRequired(lastName)) {
            this.showError('Last name is required');
            return;
        }

        if (!validateRequired(username)) {
            this.showError('Username is required');
            return;
        }

        if (username.length < 3) {
            this.showError('Username must be at least 3 characters long');
            return;
        }

        if (!validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            this.showError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        if (!agreeTerms) {
            this.showError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }

        this.setLoading(true);
        this.clearError();

        try {
            const displayName = `${firstName} ${lastName}`;
            const result = await auth.register(email, password, username, displayName);

            if (result.success) {

                router.navigate('home');
            } else {
                this.showError(result.error || 'Registration failed');
            }
        } catch (error) {
            this.showError('Registration failed. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    async handleOAuthLogin(provider) {
        this.setLoading(true);
        this.clearError();

        try {
            const result = await auth.loginWithOAuth(provider);

            if (result.success) {

                router.navigate('home');
            } else {
                this.showError(result.error || `${provider} registration failed`);
            }
        } catch (error) {
            this.showError(`${provider} registration failed. Please try again.`);
        } finally {
            this.setLoading(false);
        }
    }

    validateUsername() {
        const username = $('#register-username').value.trim();
        const usernameField = $('#register-username');

        if (username.length > 0 && username.length < 3) {
            usernameField.classList.add('border-red-500');
            usernameField.classList.remove('border-gray-300', 'dark:border-gray-600');
        } else {
            usernameField.classList.remove('border-red-500');
            usernameField.classList.add('border-gray-300', 'dark:border-gray-600');
        }
    }

    validateEmail() {
        const email = $('#register-email').value.trim();
        const emailField = $('#register-email');

        if (email.length > 0 && !validateEmail(email)) {
            emailField.classList.add('border-red-500');
            emailField.classList.remove('border-gray-300', 'dark:border-gray-600');
        } else {
            emailField.classList.remove('border-red-500');
            emailField.classList.add('border-gray-300', 'dark:border-gray-600');
        }
    }

    validatePassword() {
        const password = $('#register-password').value;
        const passwordField = $('#register-password');

        if (password.length > 0 && password.length < 8) {
            passwordField.classList.add('border-red-500');
            passwordField.classList.remove('border-gray-300', 'dark:border-gray-600');
        } else {
            passwordField.classList.remove('border-red-500');
            passwordField.classList.add('border-gray-300', 'dark:border-gray-600');
        }
    }

    validatePasswordMatch() {
        const password = $('#register-password').value;
        const confirmPassword = $('#register-confirm-password').value;
        const confirmField = $('#register-confirm-password');

        if (confirmPassword.length > 0 && password !== confirmPassword) {
            confirmField.classList.add('border-red-500');
            confirmField.classList.remove('border-gray-300', 'dark:border-gray-600');
        } else {
            confirmField.classList.remove('border-red-500');
            confirmField.classList.add('border-gray-300', 'dark:border-gray-600');
        }
    }

    setLoading(loading) {
        this.loading = loading;
        const submitBtn = $('#register-submit');
        const registerText = $('.register-text');
        const registerSpinner = $('.register-spinner');
        const oauthBtns = $$('.oauth-btn');

        if (loading) {
            submitBtn.disabled = true;
            registerText.textContent = 'Creating Account...';
            registerSpinner.classList.remove('hidden');
            oauthBtns.forEach(btn => btn.disabled = true);
        } else {
            submitBtn.disabled = false;
            registerText.textContent = 'Create Account';
            registerSpinner.classList.add('hidden');
            oauthBtns.forEach(btn => btn.disabled = false);
        }
    }

    showError(message) {
        this.error = message;
        const errorDiv = $('#register-error');
        const errorText = errorDiv.querySelector('p');

        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    clearError() {
        this.error = null;
        const errorDiv = $('#register-error');
        errorDiv.classList.add('hidden');
    }
}


window.RegisterForm = RegisterForm;