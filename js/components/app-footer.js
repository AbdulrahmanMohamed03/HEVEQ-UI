class AppFooter extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer style="background: var(--dark); color: white; padding: 80px 0 40px;">
                <div class="container">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:40px;">

                        <div>
                            <div class="nav-brand" style="margin-bottom:25px;font-size:2rem;">
                                <span>شير</span>جير
                            </div>

                            <p style="color:#94A3B8;font-size:1rem;line-height:1.8;">
                                المنصة الذكية الرائدة لربط قطاع الإنشاءات والمقاولات بأفضل المعدات والخدمات الصناعية في الوطن العربي.
                            </p>
                        </div>

                        <div>
                            <h4 style="margin-bottom:25px;font-size:1.2rem;">
                                خدماتنا
                            </h4>

                            <ul style="color:#94A3B8;font-size:0.95rem;">
                                <li style="margin-bottom:15px;">
                                    <a href="#">تأجير معدات ثقيلة</a>
                                </li>
                                <li style="margin-bottom:15px;">
                                    <a href="#">سوق البيع والشراء</a>
                                </li>
                                <li style="margin-bottom:15px;">
                                    <a href="#">قطع غيار أصلية</a>
                                </li>
                                <li style="margin-bottom:15px;">
                                    <a href="#">صيانة وخدمات فنية</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 style="margin-bottom:25px;font-size:1.2rem;">
                                الشركة
                            </h4>

                            <ul style="color:#94A3B8;font-size:0.95rem;">
                                <li style="margin-bottom:15px;">
                                    <a href="#">عن شير جير</a>
                                </li>
                                <li style="margin-bottom:15px;">
                                    <a href="#">فريق العمل</a>
                                </li>
                                <li style="margin-bottom:15px;">
                                    <a href="#">الوظائف</a>
                                </li>
                                <li style="margin-bottom:15px;">
                                    <a href="#">المدونة التقنية</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 style="margin-bottom:25px;font-size:1.2rem;">
                                تواصل معنا
                            </h4>

                            <p style="color:#94A3B8;font-size:0.95rem;margin-bottom:20px;">
                                اشترك في النشرة الإخبارية ليصلك أحدث العروض التقنية.
                            </p>

                            <div style="display:flex;gap:10px;">
                                <input
                                    type="email"
                                    placeholder="بريدك الإلكتروني"
                                    style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:10px 15px;border-radius:12px;color:white;flex:1;"
                                >

                                <button class="btn btn-primary" style="padding:10px 20px;">
                                    اشترك
                                </button>
                            </div>
                        </div>

                    </div>

                    <div class="footer-bottom">
                        <p>© 2026 شير جير - جميع الحقوق محفوظة.</p>

                        <div style="display:flex;gap:20px;">
                            <a href="#">الشروط</a>
                            <a href="#">الخصوصية</a>
                            <a href="#">ملفات التعريف</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
