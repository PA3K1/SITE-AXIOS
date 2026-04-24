App.initMobileMenu = function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');

    if (!hamburger || !mobileMenu || !closeBtn) return;

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        hamburger.style.display = 'none';
    });

    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        hamburger.style.display = 'block';
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__dropdown-trigger)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block';
        });
    });
};