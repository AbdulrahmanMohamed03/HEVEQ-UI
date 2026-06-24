function isInternalDashboardPage(currentPage) {
    const dashboardPages = [
        'dashboard.html', 'bookings.html', 'wallet.html', 'messages.html', 'profile.html', 'settings.html',
        'provider-dashboard.html', 'active-jobs.html', 'equipment.html', 'booking-requests.html', 'earnings.html',
        'admin.html'
    ];
    return dashboardPages.includes(currentPage) || currentPage.startsWith('admin-');
}

class AppNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const themeToggle = this.querySelector('#theme-toggle');
        const mobileMenuBtn = this.querySelector('#mobile-menu-btn');
        const userMenuTrigger = this.querySelector('#user-menu-trigger');
        const userDropdownMenu = this.querySelector('#user-dropdown-menu');
        const logoutBtn = this.querySelector('#nav-logout-btn');

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isDark = document.body.getAttribute('data-theme') === 'dark';
                if (isDark) {
                    document.body.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    themeToggle.innerHTML = '🌙';
                } else {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeToggle.innerHTML = '☀️';
                }
            });
        }

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.body.classList.toggle('sidebar-open');
            });
        }

        if (userMenuTrigger && userDropdownMenu) {
            userMenuTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const show = userDropdownMenu.classList.contains('show');
                if (show) {
                    userDropdownMenu.classList.remove('show');
                    userMenuTrigger.setAttribute('aria-expanded', 'false');
                } else {
                    userDropdownMenu.classList.add('show');
                    userMenuTrigger.setAttribute('aria-expanded', 'true');
                }
            });

            document.addEventListener('click', (e) => {
                if (!userMenuTrigger.contains(e.target) && !userDropdownMenu.contains(e.target)) {
                    userDropdownMenu.classList.remove('show');
                    userMenuTrigger.setAttribute('aria-expanded', 'false');
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.logout();
            });
        }
    }

    render() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const themeIcon = currentTheme === 'dark' ? '☀️' : '🌙';
        const isAuth = window.isAuthenticated();
        
        // Determine if we are in a subdirectory
        const isSubPage = window.location.pathname.includes('/pages/');
        const basePath = isSubPage ? '../' : '';
        const pagePath = isSubPage ? '' : 'pages/';

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isMarketplaceActive = currentPath === 'marketplace.html';
        const isServicesActive = currentPath === 'services.html';

        const role = isAuth ? window.getUserRole() : '';
        const isCustomer = role === 'customer';
        const showMobileBtn = isAuth && !isCustomer;

        let dashboardLink = 'dashboard.html';
        let dashboardLabel = 'لوحة التحكم';
        if (role === 'provider') {
            dashboardLink = 'provider-dashboard.html';
        } else if (role === 'admin' || role === 'employee') {
            dashboardLink = 'admin.html';
            dashboardLabel = 'مركز القيادة';
        }

        const showNavLinks = !isAuth || isCustomer || !isInternalDashboardPage(currentPath);

        this.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <a href="${basePath}index.html" class="nav-brand">
                        <span>شير</span>جير
                    </a>

                    ${showNavLinks ? `
                    <div class="navbar-links">
                        <a href="${pagePath}marketplace.html" class="navbar-link ${isMarketplaceActive ? 'active' : ''}">السوق</a>
                        <a href="${pagePath}services.html" class="navbar-link ${isServicesActive ? 'active' : ''}">المتجر</a>
                    </div>
                    ` : ''}

                    <div class="nav-actions">
                        <button class="action-btn" id="theme-toggle" title="تغيير المظهر">${themeIcon}</button>
                        <button class="action-btn" id="lang-btn" title="تغيير اللغة">EN</button>
                        ${isAuth ? `
                            <button class="action-btn" id="notifications-btn" title="الإشعارات">🔔</button>
                            <div class="user-profile-dropdown-wrapper">
                                <div class="user-profile" id="user-menu-trigger" style="cursor: pointer; display: flex; align-items: center; gap: 10px;">
                                    <div class="avatar">AH</div>
                                    <span style="font-weight:700;font-size:0.9rem;" class="user-name">أحمد حسن</span>
                                    <span class="dropdown-caret">▼</span>
                                </div>
                                <div class="dropdown-menu" id="user-dropdown-menu">
                                    <a href="${pagePath}${dashboardLink}" class="dropdown-item">${dashboardLabel}</a>
                                    <button class="dropdown-item logout-btn-item" id="nav-logout-btn">تسجيل الخروج</button>
                                </div>
                            </div>
                        ` : `
                            <a href="${basePath}pages/login.html" class="btn btn-primary btn-sm">تسجيل الدخول</a>
                        `}
                        ${showMobileBtn ? `
                            <button class="btn btn-primary btn-icon mobile-menu-btn" id="mobile-menu-btn">
                                ☰
                            </button>
                        ` : ''}
                    </div>
                </div>
            </nav>
            
            <style>
                .navbar .container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }
                .nav-brand {
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: var(--primary);
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                }
                .nav-brand span { color: var(--text-main); }
                .navbar-links {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin: 0 40px;
                }
                .navbar-link {
                    color: var(--text-main);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: var(--transition);
                    padding: 8px 16px;
                    border-radius: 8px;
                }
                .navbar-link:hover {
                    color: var(--primary);
                    background: rgba(244, 163, 0, 0.05);
                }
                .navbar-link.active {
                    color: var(--primary);
                    background: rgba(244, 163, 0, 0.1);
                }
                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .action-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-card);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: var(--transition);
                    font-size: 1.1rem;
                }
                .action-btn:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                    background: rgba(244, 163, 0, 0.05);
                }
                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 5px 10px;
                    border-radius: 12px;
                    transition: var(--transition);
                    text-decoration: none;
                    color: var(--text-main);
                }
                .user-profile:hover {
                    background: rgba(244, 163, 0, 0.05);
                }
                .avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 8px;
                    background: var(--primary);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 0.8rem;
                }
                .mobile-menu-btn {
                    display: none;
                    width: 40px;
                    height: 40px;
                    padding: 0;
                }
                .user-profile-dropdown-wrapper {
                    position: relative;
                }
                .dropdown-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: auto;
                    min-width: 160px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius);
                    box-shadow: var(--shadow-lg);
                    margin-top: 8px;
                    z-index: 2100;
                    padding: 8px 0;
                    text-align: right;
                }
                .dropdown-menu.show {
                    display: block;
                }
                .dropdown-item {
                    display: block;
                    width: 100%;
                    padding: 10px 16px;
                    clear: both;
                    font-weight: 600;
                    color: var(--text-main);
                    text-align: right;
                    white-space: nowrap;
                    background-color: transparent;
                    border: 0;
                    text-decoration: none;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: var(--transition);
                    font-family: inherit;
                }
                .dropdown-item:hover {
                    background-color: rgba(244, 163, 0, 0.05);
                    color: var(--primary);
                }
                .dropdown-caret {
                    font-size: 0.6rem;
                    color: var(--text-muted);
                    margin-right: 2px;
                }
                @media (max-width: 992px) {
                    .navbar-links { display: none; }
                    .mobile-menu-btn { display: flex !important; }
                    .user-name { display: none; }
                }
            </style>
        `;
    }
}

customElements.define('app-navbar', AppNavbar);
