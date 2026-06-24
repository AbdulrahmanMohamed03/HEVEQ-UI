function isInternalDashboardPage(currentPage) {
    const dashboardPages = [
        'dashboard.html', 'bookings.html', 'wallet.html', 'messages.html', 'profile.html', 'settings.html',
        'provider-dashboard.html', 'active-jobs.html', 'equipment.html', 'booking-requests.html', 'earnings.html',
        'admin.html'
    ];
    return dashboardPages.includes(currentPage) || currentPage.startsWith('admin-');
}

class AppSidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    setupSidebarClass() {
        // Mark body as having a sidebar for layout offsets
        document.body.classList.add('has-sidebar');
    }

    removeSidebarClass() {
        document.body.classList.remove('has-sidebar');
    }

    render() {
        // Auth Check: If not authenticated, do not render sidebar content
        if (!window.isAuthenticated()) {
            this.innerHTML = '';
            this.removeSidebarClass();
            return;
        }

        const storedRole = window.getUserRole();
        const type = window.normalizeRole(this.getAttribute('type') || storedRole);

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        if (!isInternalDashboardPage(currentPath)) {
            this.innerHTML = '';
            this.removeSidebarClass();
            return;
        }

        let isAllowed = false;
        if (type === 'customer') {
            const customerPages = ['dashboard.html', 'bookings.html', 'wallet.html', 'messages.html', 'profile.html', 'settings.html'];
            isAllowed = customerPages.includes(currentPath);
        } else if (type === 'provider') {
            const providerPages = ['provider-dashboard.html', 'active-jobs.html', 'equipment.html', 'booking-requests.html', 'earnings.html', 'messages.html'];
            isAllowed = providerPages.includes(currentPath);
        } else if (type === 'admin' || type === 'employee') {
            isAllowed = currentPath === 'admin.html' || currentPath.startsWith('admin-');
        }

        if (!isAllowed) {
            this.innerHTML = '';
            this.removeSidebarClass();
            return;
        }

        this.setupSidebarClass();
        
        // Determine if we are in a subdirectory
        const isSubPage = window.location.pathname.includes('/pages/');
        const basePath = isSubPage ? '' : 'pages/';

        let menuItems = [];
        if (type === 'customer') {
            menuItems = [
                { icon: '🏠', label: 'الرئيسية', link: 'dashboard.html', active: true },
                { icon: '🚜', label: 'تأجير المعدات', link: 'services.html' },
                { icon: '🏗️', label: 'حجوزاتي', link: 'bookings.html' },
                { icon: '🛒', label: 'السوق', link: 'marketplace.html' },
                { icon: '💳', label: 'المحفظة', link: 'wallet.html' },
                { icon: '💬', label: 'الرسائل', link: 'messages.html' },
                { icon: '👤', label: 'الملف الشخصي', link: 'profile.html' },
                { icon: '⚙️', label: 'الإعدادات', link: 'settings.html' }
            ];
        } else if (type === 'provider') {
            menuItems = [
                { icon: '📊', label: 'لوحة التحكم', link: 'provider-dashboard.html', active: true },
                { icon: '🏗️', label: 'المهام النشطة', link: 'active-jobs.html' },
                { icon: '🚜', label: 'المعدات', link: 'equipment.html' },
                { icon: '📅', label: 'الطلبات', link: 'booking-requests.html' },
                { icon: '💰', label: 'الأرباح', link: 'earnings.html' },
                { icon: '💬', label: 'الرسائل', link: 'messages.html' }
            ];
        } else if (type === 'admin' || type === 'employee') {
            menuItems = [
                { icon: '🛡️', label: 'مركز القيادة', link: 'admin.html' },
                { icon: '🔑', label: 'مراجعة الحسابات', link: 'admin-account-verification.html' },
                { icon: '📋', label: 'مراجعة القوائم', link: 'admin-listing-review.html' },
                { icon: '👥', label: 'المستخدمين', link: 'admin-users.html' },
                { icon: '🎫', label: 'التذاكر والدعم', link: 'admin-tickets.html' },
                { icon: '✍️', label: 'مراجعة إثباتات التنفيذ', link: 'admin-evidence-review.html' },
                { icon: '🔍', label: 'التحقق الميداني', link: 'admin-field-verification.html' },
                { icon: '🏦', label: 'الضمان المالي', link: 'admin-escrow.html' },
                { icon: '⚙️', label: 'إعدادات AI', link: 'admin-ai-config.html' },
                { icon: '📊', label: 'التحليلات', link: 'admin-analytics.html' },
                { icon: '🔧', label: 'إعدادات المنصة', link: 'admin-platform-settings.html' }
            ];
        }

        this.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar-logo" style="flex-shrink: 0;">
                    <span>شير</span>جير
                </div>
                <nav class="sidebar-nav" style="flex: 1; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; min-height: 0;">
                    ${menuItems.map(item => {
                        const isActive = currentPath === item.link;
                        return `
                            <a href="${basePath}${item.link}" class="nav-link ${isActive ? 'active' : ''}">
                                <span class="nav-icon">${item.icon}</span>
                                <span class="nav-label">${item.label}</span>
                            </a>
                        `;
                    }).join('')}
                </nav>
                <div class="sidebar-footer" style="margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-color); flex-shrink: 0;">
                    <button class="nav-link w-full" id="logout-btn" style="background: none; border: none; cursor: pointer; text-align: right; width: 100%;">
                        <span class="nav-icon">🚪</span>
                        <span class="nav-label">تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
            <div class="sidebar-overlay"></div>
        `;

        this.querySelector('.sidebar-overlay').addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });

        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.logout();
            });
        }

        // Update active class based on current page
        this.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPath)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

customElements.define('app-sidebar', AppSidebar);
