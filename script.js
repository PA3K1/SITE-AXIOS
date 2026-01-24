// ============= МОДАЛЬНЫЕ ОКНА =============
function openModal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function openBodal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal--registration');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function closeModal() {
    const activeModal = document.querySelector('.modal[style*="display: block"]');
    if (activeModal) {
        activeModal.style.opacity = '0';
        setTimeout(() => activeModal.style.display = 'none', 300);
    }
}

// ============= ПОЛЬЗОВАТЕЛИ И АВТОРИЗАЦИЯ =============
let users = [
    {email: "admin@test.com", password: "12345"},
    {email: "user@test.com", password: "qwerty"}
];

function checkCaptcha(inputValue) {
    return inputValue === "6138B";
}

function checkEmailExists(email) {
    return users.find(user => user.email === email);
}

function registerUser(email, password) {
    users.push({email: email, password: password});
}

function updateHeader() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    
    if (loggedInUser) {
        headerOpen.innerHTML = `
            <span>${loggedInUser}</span>
            <a class="header__link open__modal" onclick="logoutUser()" href="#">ВЫХОД</a>
        `;
    }
}

function findUser(email, password) {
    return users.find(u => u.email === email && u.password === password);
}

function loginUser(email) {
    localStorage.setItem('loggedInUser', email);
    updateHeader();
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    headerOpen.innerHTML = `
        <a class="header__link" onclick="openBodal(event)" href="#">Регистрация</a>
        <a class="header__link open__modal" onclick="openModal(event)" href="">ВХОД</a>
    `;
}

function handleRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const captcha = form.querySelector('input[placeholder="Введите код"]').value;
    
    if (!checkCaptcha(captcha)) {
        alert("Неверный код с картинки!");
        return;
    }
    
    if (checkEmailExists(email)) {
        alert("Пользователь с таким email уже существует!");
        return;
    }
    
    registerUser(email, password);
    alert("Регистрация успешна! Теперь можете войти.");
    
    closeModal();
    form.reset();
}

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    const user = findUser(email, password);
    
    if (user) {
        loginUser(email);
        closeModal();
        form.reset();
        alert("Успешный вход!");
    } else {
        alert("Неверный email или пароль!");
    }
}

function initializeApp() {
    updateHeader();
    
    document.querySelector('.modal--registration form').addEventListener('submit', handleRegistration);
    document.querySelector('.modal form').addEventListener('submit', handleLogin);
    
    document.querySelectorAll('.modal__close').forEach(btn => {
        btn.onclick = closeModal;
    });
}

// ============= СЛАЙДЕР ИГР =============
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

const totalRealItems = gamesData.length;
const itemsToShow = 4;
let currentIndex = totalRealItems;
let isTransitioning = false;
let autoPlayInterval;

// ============= ОСНОВНЫЕ ФУНКЦИИ СЛАЙДЕРА =============
function createElements() {
    const displayItems = [...gamesData, ...gamesData, ...gamesData];
    
    displayItems.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'card-game';
        card.setAttribute('data-original-index', index % totalRealItems);
        card.innerHTML = `<a href="${game.url}"><img src="${game.img}" alt="${game.title}"></a>`;
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

function updateSlider(withTransition = true) {
    if (withTransition) {
        galery.classList.add('transition');
        textGames.classList.add('transition');
    } else {
        galery.classList.remove('transition');
        textGames.classList.remove('transition');
    }

    const containerWidth = document.querySelector('.galery-wrapper').clientWidth;
    const gap = 20;
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
        updateSlider(false);
    }
    if (currentIndex >= totalRealItems * 2) {
        currentIndex -= totalRealItems;
        updateSlider(false);
    }
}

galery.addEventListener('transitionend', handleTransitionEnd);

function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    updateSlider();
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

// ============= ПОДСВЕТКА КАРТИНОК ПРИ НАВЕДЕНИИ =============
function setupImageHighlight() {
    const allImages = document.querySelectorAll('.card-game img');
    const allTextButtons = document.querySelectorAll('.text-game');
    
    function resetAllImages() {
        allImages.forEach(img => {
            img.style.filter = '';
            img.style.transform = '';
        });
    }
    
    // 1. Наведение на картинку
    allImages.forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            allImages.forEach(img => {
                img.style.filter = 'grayscale(100%) brightness(0.5)';
            });
            e.target.style.filter = 'grayscale(0%) brightness(1)';
        });
        
        img.addEventListener('mouseleave', resetAllImages);
    });
    
    // 2. Наведение на текстовую кнопку - ПРОСТОЙ ВАРИАНТ
    allTextButtons.forEach((button, index) => {
        button.addEventListener('mouseenter', () => {
            // Все картинки черно-белые
            allImages.forEach(img => {
                img.style.filter = 'grayscale(100%) brightness(0.5)';
                img.style.transform = 'scale(1)';
            });
            
            // Находим картинку с таким же индексом
            // (они идут в том же порядке, что и кнопки)
            if (allImages[index]) {
                allImages[index].style.filter = 'grayscale(0%) brightness(1)';
            }
        });
        
        button.addEventListener('mouseleave', resetAllImages);
    });
}
// ============= ИНИЦИАЛИЗАЦИЯ ВСЕГО ПРИЛОЖЕНИЯ =============
function initializeAll() {
    // Инициализация модальных окон и авторизации
    initializeApp();
    
    // Инициализация слайдера
    createElements();
    setTimeout(() => updateSlider(false), 50);
    
    // Инициализация подсветки картинок
    setupImageHighlight();
    
    // Автоплей слайдера
    startAutoPlay();
    
    // Обработка ресайза
    window.addEventListener('resize', () => updateSlider(false));
    
    // Остановка автоплея при наведении на слайдер
    const container = document.querySelector('.games-slider-container');
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
}

// Запуск при загрузке страницы
window.onload = initializeAll;