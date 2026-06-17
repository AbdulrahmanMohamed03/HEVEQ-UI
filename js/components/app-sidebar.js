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

        this.setupSidebarClass();
        const storedRole = localStorage.getItem('userRole') || 'customer';
        const type = this.getAttribute('type') || storedRole; // Use attribute or fallback to stored role
        
        // Determine if we are in a subdirectory
        const isSubPage = window.location.pathname.includes('/pages/');
        const basePath = isSubPage ? '' : 'pages/';

        let menuItems = [];
        if (type === 'customer') {
            menuItems = [
                { icon: '🏠', label: 'الرئيسية', link: 'dashboard.html', active: true },
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
        } else if (type === 'admin') {
            menuItems = [
                { icon: '🛡️', label: 'مركز القيادة', link: 'admin.html', active: true },
                { icon: '⚙️', label: 'إعدادات AI', link: 'ai-config.html' },
                { icon: '⚖️', label: 'النزاعات', link: 'disputes.html' },
                { icon: '🏦', label: 'نظام الضمان', link: 'escrow.html' },
                { icon: '👥', label: 'المزودين', link: 'operators.html' }
            ];
        }

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        this.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar-logo">
                    <span>شير</span>جير
                </div>
                <nav class="sidebar-nav" style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
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
                <div class="sidebar-footer" style="margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-color);">
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
