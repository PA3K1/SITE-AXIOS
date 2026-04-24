App.sliderGames = function() {
    const gamesData = [
        { title: "Pubg", img: "https://axios-macro.com/images/gradient/avif/lite.avif", url: "https://axios-macro.com/pubg" },
        { title: "Apex", img: "https://axios-macro.com/images/gradient/avif/apex.avif", url: "https://axios-macro.com/apex" },
        { title: "BF 2042", img: "https://axios-macro.com/images/gradient/avif/bf2042.avif", url: "https://axios-macro.com/battlefield2042" },
        { title: "COD WARZONE", img: "https://axios-macro.com/images/gradient/avif/mw2.avif", url: "https://axios-macro.com/warzone" },
        { title: "cs:go", img: "https://axios-macro.com/images/gradient/avif/csgo.avif", url: "https://axios-macro.com/csgo" },
        { title: "РАСТ", img: "https://axios-macro.com/images/gradient/avif/rust.avif", url: "https://axios-macro.com/rust" },
        { title: "R6 Siege", img: "https://axios-macro.com/images/gradient/avif/r6.avif", url: "https://axios-macro.com/r6siege" }
    ];

    const galery = document.getElementById('galery');
    const textGames = document.getElementById('text-games');
    const dotsContainer = document.getElementById('dots');
    if (!galery || !textGames || !dotsContainer) return;

    const totalRealItems = gamesData.length;
    let itemsToShow = window.innerWidth <= 450 ? 1 : 4;
    let gap = window.innerWidth <= 450 ? 0 : 20;
    let currentIndex = totalRealItems;
    let isTransitioning = false;
    let autoPlayInterval;

    function getItemsToShow() {
        return window.innerWidth <= 450 ? 1 : 4;
    }

    function createElements() {
        const displayItems = [...gamesData, ...gamesData, ...gamesData];
        displayItems.forEach((game, index) => {
            const card = document.createElement('div');
            card.className = 'card-game';
            card.setAttribute('data-original-index', index % totalRealItems);
            card.innerHTML = `<a href="${game.url}"><img src="${game.img}" alt="${game.title}" loading="lazy"></a>`;
            galery.appendChild(card);

            const btnItem = document.createElement('div');
            btnItem.className = 'text-game-item';
            btnItem.innerHTML = `<a class="text-game" href="${game.url}" data-index="${index % totalRealItems}">${game.title}</a>`;
            textGames.appendChild(btnItem);
        });

        for (let i = 0; i < totalRealItems; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', i);
            dot.onclick = () => goToSlide(i + totalRealItems);
            dotsContainer.appendChild(dot);
        }
    }

    function updateSliderGames(withTransition = true) {
        if (withTransition) {
            galery.classList.add('transition');
            textGames.classList.add('transition');
        } else {
            galery.classList.remove('transition');
            textGames.classList.remove('transition');
        }

        const containerWidth = document.querySelector('.galery-wrapper').clientWidth;
        const cardWidth = (containerWidth - (itemsToShow - 1) * gap) / itemsToShow;
        const step = cardWidth + gap;
        const offset = -currentIndex * step;
        galery.style.transform = `translateX(${offset}px)`;
        textGames.style.transform = `translateX(${offset}px)`;

        const activeDotIndex = currentIndex % totalRealItems;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIndex);
        });
    }

    function handleTransitionEnd() {
        isTransitioning = false;
        if (currentIndex < totalRealItems) {
            currentIndex += totalRealItems;
            updateSliderGames(false);
        }
        if (currentIndex >= totalRealItems * 2) {
            currentIndex -= totalRealItems;
            updateSliderGames(false);
        }
    }

    galery.addEventListener('transitionend', handleTransitionEnd);

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = index;
        updateSliderGames();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function setupImageHighlight() {
        const allImages = document.querySelectorAll('.card-game img');
        const allTextButtons = document.querySelectorAll('.text-game');
        function resetAllImages() {
            allImages.forEach(img => {
                img.style.filter = '';
                img.style.transform = '';
            });
        }
        allImages.forEach(img => {
            img.addEventListener('mouseenter', (e) => {
                allImages.forEach(img => img.style.filter = 'grayscale() brightness(100%)');
                e.target.style.filter = 'grayscale(0%) brightness(1)';
            });
            img.addEventListener('mouseleave', resetAllImages);
        });
        allTextButtons.forEach((button, index) => {
            button.addEventListener('mouseenter', () => {
                allImages.forEach(img => {
                    img.style.filter = 'grayscale() brightness(100%)';
                    img.style.transform = 'scale(1)';
                });
                if (allImages[index]) allImages[index].style.filter = 'grayscale(0%) brightness(1)';
            });
            button.addEventListener('mouseleave', resetAllImages);
        });
    }

    window.addEventListener('resize', () => {
        const newItemsToShow = getItemsToShow();
        const newGap = newItemsToShow === 1 ? 0 : 20;
        if (newItemsToShow !== itemsToShow || newGap !== gap) {
            itemsToShow = newItemsToShow;
            gap = newGap;
            if (currentIndex < totalRealItems) currentIndex = totalRealItems;
            else if (currentIndex >= totalRealItems * 2) currentIndex = totalRealItems * 2 - 1;
            updateSliderGames(false);
        }
    });

    const container = document.querySelector('.games-slider-container');
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    createElements();
    setTimeout(() => updateSliderGames(false), 50);
    setupImageHighlight();
    startAutoPlay();
};