/* 
  ShareGear - Main Application Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    // 2. Intersection Observer for Animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 3. Global Toast System
    window.showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // 4. Initial Auth Check for protected pages
    const publicPages = ['login.html', 'register.html', 'forgot-password.html', 'index.html', 'marketplace.html', 'product-details.html', 'search-results.html', 'otp-verification.html', 'service-categories.html', 'service-details.html'];
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    const isProtected = !publicPages.includes(currentPath) && currentPath !== '';
    
    if (isProtected && !window.isAuthenticated()) {
        window.navigateTo('login.html');
    } else if (window.isAuthenticated()) {
        const role = localStorage.getItem('userRole');
        if (role === 'customer' || role === 'provider') {
            const isVerified = localStorage.getItem('isVerified_' + role) === 'true';
            const verificationPages = ['customer-verification.html', 'provider-verification.html'];
            if (!isVerified && !verificationPages.includes(currentPath) && currentPath !== 'login.html') {
                if (role === 'provider') {
                    window.navigateTo('provider-verification.html');
                } else {
                    window.navigateTo('customer-verification.html');
                }
            }
        }
    }
});

/* Authentication Helpers */
window.isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

window.login = (role = 'customer') => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('sg_token', 'mock_token_' + Date.now());
    
    if (role === 'admin') {
        window.navigateTo('admin.html');
    } else {
        const isVerified = localStorage.getItem('isVerified_' + role) === 'true';
        if (!isVerified) {
            if (role === 'provider') {
                window.navigateTo('provider-verification.html');
            } else {
                window.navigateTo('customer-verification.html');
            }
        } else {
            if (role === 'provider') {
                window.navigateTo('provider-dashboard.html');
            } else {
                window.navigateTo('dashboard.html');
            }
        }
    }
};

window.logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('sg_token');
    window.navigateTo('login.html');
};

/* Simple Router Mock for linking */
window.navigateTo = (page) => {
    const isSubPage = window.location.pathname.includes('/pages/');
    const isTargetSubPage = !['index.html', ''].includes(page) && !page.startsWith('http');
    
    let targetUrl = page;
    
    if (isSubPage) {
        if (page === 'index.html') {
            targetUrl = '../index.html';
        } else if (isTargetSubPage && !page.startsWith('../')) {
            targetUrl = page; // stay in pages/
        }
    } else {
        if (isTargetSubPage && page !== 'index.html') {
            targetUrl = 'pages/' + page;
        }
    }
    
    window.location.href = targetUrl;
};
