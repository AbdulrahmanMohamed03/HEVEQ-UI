/* 
  ShareGear - UI Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
    // Redundant theme and mobile logic removed as they are handled by app-navbar.js and app-sidebar.js

    // 4. Smooth Animation Trigger
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .stat-card, .hero-content, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 6. AI Search Placeholder Animation
    const aiSearchInput = document.getElementById('ai-search-input');
    const placeholders = [
        "أحتاج ونش لرفع أثاث في مدينة نصر...",
        "حفار لأعمال حفر أساسات...",
        "مولد كهرباء للبيع بقدرة 100 كيلو...",
        "فني صيانة معدات هيدروليكية...",
        "تأجير لودر ليوم واحد في التجمع..."
    ];
    
    if (aiSearchInput) {
        let placeholderIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typePlaceholder() {
            const current = placeholders[placeholderIndex];
            
            if (isDeleting) {
                aiSearchInput.setAttribute('placeholder', current.substring(0, charIndex--));
                typeSpeed = 50;
            } else {
                aiSearchInput.setAttribute('placeholder', current.substring(0, charIndex++));
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === current.length + 1) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                placeholderIndex = (placeholderIndex + 1) % placeholders.length;
                typeSpeed = 500;
            }

            setTimeout(typePlaceholder, typeSpeed);
        }
        
        typePlaceholder();
    }

    // 7. Animated Statistics Counters
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countToAttr = target.getAttribute('data-target');
                if (countToAttr) {
                    const countTo = parseInt(countToAttr);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = countTo / (duration / 16); // 60fps

                    const updateCount = () => {
                        count += increment;
                        if (count < countTo) {
                            target.innerText = Math.floor(count).toLocaleString();
                            requestAnimationFrame(updateCount);
                        } else {
                            target.innerText = countTo.toLocaleString() + (target.innerText.includes('%') ? '%' : '');
                        }
                    };
                    updateCount();
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });
});
