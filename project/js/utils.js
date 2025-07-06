// Utility functions for the EventShare platform

// DOM utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Event utilities
const on = (element, event, handler, options = {}) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    if (element) {
        element.addEventListener(event, handler, options);
    }
};

const off = (element, event, handler) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    if (element) {
        element.removeEventListener(event, handler);
    }
};

// Storage utilities
const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error getting from storage:', e);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error setting to storage:', e);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from storage:', e);
        }
    }
};

// Date utilities
const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatTime = (time) => {
    const t = new Date(`1970-01-01T${time}`);
    return t.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

const formatDateTime = (date, time) => {
    const datetime = new Date(`${date}T${time}`);
    return datetime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

// String utilities
const truncate = (str, length = 100) => {
    return str.length > length ? str.substring(0, length) + '...' : str;
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
};

// Validation utilities
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password.length >= 8;
};

const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

// API utilities
const api = {
    baseUrl: 'https://api.eventshare.com',
    
    get: async (endpoint, options = {}) => {
        const token = storage.get('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        };
        
        try {
            const response = await fetch(`${api.baseUrl}${endpoint}`, {
                method: 'GET',
                headers,
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },
    
    post: async (endpoint, data, options = {}) => {
        const token = storage.get('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        };
        
        try {
            const response = await fetch(`${api.baseUrl}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },
    
    put: async (endpoint, data, options = {}) => {
        const token = storage.get('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        };
        
        try {
            const response = await fetch(`${api.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },
    
    delete: async (endpoint, options = {}) => {
        const token = storage.get('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        };
        
        try {
            const response = await fetch(`${api.baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers,
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    }
};

// Image utilities
const resizeImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            let { width, height } = img;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
};

// Loading utilities
const showLoading = (element) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    if (element) {
        element.innerHTML = `
            <div class="flex items-center justify-center p-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        `;
    }
};

const hideLoading = () => {
    const loadingScreen = $('#loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
};

// Error utilities
const showError = (message, container = '#main-content') => {
    const errorHtml = `
        <div class="max-w-md mx-auto mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div class="flex items-center space-x-3">
                <i data-lucide="alert-circle" class="h-6 w-6 text-red-600 dark:text-red-400"></i>
                <div>
                    <h3 class="font-medium text-red-800 dark:text-red-200">Error</h3>
                    <p class="text-sm text-red-600 dark:text-red-400">${message}</p>
                </div>
            </div>
        </div>
    `;
    
    const containerElement = $(container);
    if (containerElement) {
        containerElement.innerHTML = errorHtml;
        lucide.createIcons();
    }
};

// Success utilities
const showSuccess = (message, container = '#main-content') => {
    const successHtml = `
        <div class="max-w-md mx-auto mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div class="flex items-center space-x-3">
                <i data-lucide="check-circle" class="h-6 w-6 text-green-600 dark:text-green-400"></i>
                <div>
                    <h3 class="font-medium text-green-800 dark:text-green-200">Success</h3>
                    <p class="text-sm text-green-600 dark:text-green-400">${message}</p>
                </div>
            </div>
        </div>
    `;
    
    const containerElement = $(container);
    if (containerElement) {
        containerElement.innerHTML = successHtml;
        lucide.createIcons();
    }
};

// Modal utilities
const showModal = (content, options = {}) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${options.title || 'Modal'}</h3>
                <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onclick="this.closest('.fixed').remove()">
                    <i data-lucide="x" class="h-5 w-5"></i>
                </button>
            </div>
            <div class="p-4">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    lucide.createIcons();
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
};

// Animation utilities
const fadeIn = (element, duration = 300) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    if (element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = Math.min(progress, 1);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
};

const fadeOut = (element, duration = 300) => {
    if (typeof element === 'string') {
        element = $(element);
    }
    if (element) {
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            element.style.opacity = 1 - Math.min(progress, 1);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// Debounce utility
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Throttle utility
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(null, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Export utilities for global use
window.utils = {
    $, $$, on, off, storage, formatDate, formatTime, formatDateTime,
    truncate, capitalize, slugify, validateEmail, validatePassword,
    validateRequired, api, resizeImage, showLoading, hideLoading,
    showError, showSuccess, showModal, fadeIn, fadeOut, debounce, throttle
};