document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            hamburger.style.display = 'none';
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block';
        });
    }

    const mobileLinks = document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__dropdown-trigger)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.display = 'block';
        });
    });

    const dropdownTrigger = document.querySelector('.mobile-nav__dropdown-trigger');
    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.mobile-nav__dropdown');
            dropdown.classList.toggle('active');
        });
    }

    // ============= СЛАЙДЕР СКРИНШОТОВ =============
    const track = document.getElementById('track');
    const range = document.getElementById('range');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (!track || !range || !slides.length) {
        return;
    }

function updateSlider() {
    const firstSlide = track.children[0];
    if (!firstSlide) return;

    const slideWidth = firstSlide.offsetWidth;
    const slideMargin = parseFloat(getComputedStyle(firstSlide).marginLeft) || 0;
    const fullMargin = slideMargin * 1;
    const stepWidth = slideWidth + fullMargin;

    let maxOffset;
    if (window.innerWidth <= 450) {

        maxOffset = (totalSlides - 1) * stepWidth;
    } else {
        maxOffset = stepWidth;
    }

    const val = parseInt(range.value, 10);
    const offset = (val / 100) * maxOffset;
    track.style.transform = `translateX(-${Math.round(offset)}px)`;
}

    range.addEventListener('input', updateSlider);
    window.addEventListener('resize', updateSlider);
    updateSlider();

    // ============= МОДАЛКА СО SWIPER =============
    const sliderModal = document.getElementById('sliderModal');
    const modalClose = document.getElementById('sliderModalClose');
    const swiperWrapper = document.querySelector('#modalSwiper .swiper-wrapper');
    let swiperInstance = null;

    if (!sliderModal || !modalClose || !swiperWrapper) {
        return;
    }

    const images = [];
    slides.forEach(slide => {
        const img = slide.querySelector('img:first-child');
        if (img) {
            images.push({ 
                src: img.src, 
                alt: img.alt || 'Скриншот' 
            });
        }
    });


    function openModal(index) {
        
        if (images.length === 0) {
            alert('Нет изображений для отображения');
            return;
        }

        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        swiperWrapper.innerHTML = '';
        
        images.forEach(imgData => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'swiper-slide';
            const imgElem = document.createElement('img');
            imgElem.src = imgData.src;
            imgElem.alt = imgData.alt;
            imgElem.onerror = function() {

            };
            slideDiv.appendChild(imgElem);
            swiperWrapper.appendChild(slideDiv);
        });

        sliderModal.classList.add('active');
        document.body.classList.add('modal-open');

        setTimeout(() => {
            if (typeof Swiper !== 'undefined') {
                swiperInstance = new Swiper('#modalSwiper', {
                    initialSlide: index,
                    speed: 300,
                    spaceBetween: 10,
                    slidesPerView: 1,
                    centeredSlides: true,
                    loop: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    simulateTouch: true,
                    touchRatio: 1,
                    touchAngle: 45,
                    grabCursor: true,
                    on: {
                        
                    }
                });
            }
        }, 100);
    }

    function closeModal() {
        sliderModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    slides.forEach((slide, idx) => {
        slide.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(idx);
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    sliderModal.addEventListener('click', (e) => {
        if (e.target === sliderModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (sliderModal?.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });
});

function getItemsToShow() {
    return window.innerWidth <= 450 ? 1 : 4;
}