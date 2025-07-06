

class LoginForm {
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
                            <i data-lucide="user" class="h-6 w-6 text-white"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome Back
                        </h2>
                        <p class="mt-2 text-gray-600 dark:text-gray-400">
                            Sign in to your account
                        </p>
                    </div>

                    <div id="login-error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hidden">
                        <p class="text-sm text-red-600 dark:text-red-400"></p>
                    </div>

                    <form id="login-form" class="space-y-6">
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
                                    id="login-email"
                                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your email"
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
                                    id="login-password"
                                    class="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    id="toggle-password"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <i data-lucide="eye" class="h-5 w-5 text-gray-400"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                                />
                                <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="button"
                                id="forgot-password-btn"
                                class="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            id="login-submit"
                            class="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <span class="login-text">Sign In</span>
                            <div class="login-spinner animate-spin rounded-full h-5 w-5 border-b-2 border-white hidden ml-2"></div>
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
                                id="google-login"
                                class="oauth-btn inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <i data-lucide="chrome" class="h-5 w-5"></i>
                            </button>

                            <button
                                id="facebook-login"
                                class="oauth-btn inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <i data-lucide="facebook" class="h-5 w-5"></i>
                            </button>

                            <button
                                id="apple-login"
                                class="oauth-btn inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <i data-lucide="apple" class="h-5 w-5"></i>
                            </button>
                        </div>
                    </div>

                    <div class="mt-6 text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?
                            <button
                                id="switch-to-register"
                                class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
    }

    setupEventListeners() {

        on('#login-form', 'submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        on('#toggle-password', 'click', () => {
            const passwordInput = $('#login-password');
            const icon = $('#toggle-password i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                passwordInput.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });

        on('#google-login', 'click', () => this.handleOAuthLogin('google'));
        on('#facebook-login', 'click', () => this.handleOAuthLogin('facebook'));
        on('#apple-login', 'click', () => this.handleOAuthLogin('apple'));

        on('#switch-to-register', 'click', () => {
            router.navigate('register');
        });

        on('#forgot-password-btn', 'click', () => {
            this.showForgotPasswordModal();
        });
    }

    async handleLogin() {
        const email = $('#login-email').value.trim();
        const password = $('#login-password').value;

        if (!validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            this.showError('Password must be at least 8 characters long');
            return;
        }

        this.setLoading(true);
        this.clearError();

        try {
            const result = await auth.login(email, password);

            if (result.success) {

                router.navigate('home');
            } else {
                this.showError(result.error || 'Login failed');
            }
        } catch (error) {
            this.showError('Login failed. Please try again.');
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
                this.showError(result.error || `${provider} login failed`);
            }
        } catch (error) {
            this.showError(`${provider} login failed. Please try again.`);
        } finally {
            this.setLoading(false);
        }
    }

    showForgotPasswordModal() {
        const modalContent = `
            <form id="forgot-password-form">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="forgot-email"
                        class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div class="flex justify-end space-x-3">
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
                        Send Reset Link
                    </button>
                </div>
            </form>
        `;

        const modal = showModal(modalContent, { title: 'Reset Password' });

        on('#forgot-password-form', 'submit', async (e) => {
            e.preventDefault();
            const email = $('#forgot-email').value.trim();

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            try {
                const result = await auth.forgotPassword(email);

                if (result.success) {
                    modal.remove();
                    showModal(
                        '<p class="text-green-600 dark:text-green-400">Password reset email sent! Check your inbox.</p>',
                        { title: 'Success' }
                    );
                } else {
                    alert(result.error || 'Password reset failed');
                }
            } catch (error) {
                alert('Password reset failed. Please try again.');
            }
        });
    }

    setLoading(loading) {
        this.loading = loading;
        const submitBtn = $('#login-submit');
        const loginText = $('.login-text');
        const loginSpinner = $('.login-spinner');
        const oauthBtns = $$('.oauth-btn');

        if (loading) {
            submitBtn.disabled = true;
            loginText.textContent = 'Signing In...';
            loginSpinner.classList.remove('hidden');
            oauthBtns.forEach(btn => btn.disabled = true);
        } else {
            submitBtn.disabled = false;
            loginText.textContent = 'Sign In';
            loginSpinner.classList.add('hidden');
            oauthBtns.forEach(btn => btn.disabled = false);
        }
    }

    showError(message) {
        this.error = message;
        const errorDiv = $('#login-error');
        const errorText = errorDiv.querySelector('p');

        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    clearError() {
        this.error = null;
        const errorDiv = $('#login-error');
        errorDiv.classList.add('hidden');
    }
}

window.LoginForm = LoginForm;