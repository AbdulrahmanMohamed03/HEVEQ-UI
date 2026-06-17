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
    }

    render() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const themeIcon = currentTheme === 'dark' ? '☀️' : '🌙';
        const isAuth = window.isAuthenticated();
        
        // Determine if we are in a subdirectory
        const isSubPage = window.location.pathname.includes('/pages/');
        const basePath = isSubPage ? '../' : '';

        this.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <a href="${basePath}index.html" class="nav-brand">
                        <span>شير</span>جير
                    </a>

                    <div class="nav-search">
                        <span class="search-icon">🔍</span>
                        <input type="text" placeholder="ابحث عن معدات، قطع غيار، أو فنيين...">
                    </div>

                    <div class="nav-actions">
                        <button class="action-btn" id="theme-toggle" title="تغيير المظهر">${themeIcon}</button>
                        <button class="action-btn" id="lang-btn" title="تغيير اللغة">EN</button>
                        ${isAuth ? `
                            <button class="action-btn" id="notifications-btn" title="الإشعارات">🔔</button>
                            <a href="${basePath}pages/profile.html" class="user-profile">
                                <div class="avatar">AH</div>
                                <span style="font-weight:700;font-size:0.9rem;" class="user-name">أحمد حسن</span>
                            </a>
                        ` : `
                            <a href="${basePath}pages/login.html" class="btn btn-primary btn-sm">تسجيل الدخول</a>
                        `}
                        <button class="btn btn-primary btn-icon mobile-menu-btn" id="mobile-menu-btn">
                            ☰
                        </button>
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
                .nav-search {
                    flex: 1;
                    max-width: 500px;
                    margin: 0 40px;
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .search-icon {
                    position: absolute;
                    right: 15px;
                    color: var(--text-muted);
                }
                .nav-search input {
                    width: 100%;
                    padding: 10px 45px 10px 15px;
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-main);
                    color: var(--text-main);
                    font-size: 0.9rem;
                    transition: var(--transition);
                }
                .nav-search input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px rgba(244, 163, 0, 0.1);
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
                @media (max-width: 992px) {
                    .nav-search { display: none; }
                    .mobile-menu-btn { display: flex !important; }
                    .user-name { display: none; }
                }
            </style>
        `;
    }
}

customElements.define('app-navbar', AppNavbar);
