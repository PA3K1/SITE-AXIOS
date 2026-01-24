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



// 🔹 Хранилище пользователей (только для демо)
let users = [
    {email: "admin@test.com", password: "12345"},
    {email: "user@test.com", password: "qwerty"}
];

// 🔹 Функция проверки капчи
function checkCaptcha(inputValue) {
    return inputValue === "6138B";
}

// 🔹 Функция проверки существования email
function checkEmailExists(email) {
    return users.find(user => user.email === email);
}

// 🔹 Функция регистрации нового пользователя
function registerUser(email, password) {
    users.push({email: email, password: password});
}

// 🔹 Функция обновления шапки сайта
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

// 🔹 Функция поиска пользователя
function findUser(email, password) {
    return users.find(u => u.email === email && u.password === password);
}

// 🔹 Функция входа пользователя
function loginUser(email) {
    localStorage.setItem('loggedInUser', email);
    updateHeader();
}

// 🔹 Функция выхода пользователя
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    headerOpen.innerHTML = `
        <a class="header__link" onclick="openBodal(event)" href="#">Регистрация</a>
        <a class="header__link open__modal" onclick="openModal(event)" href="">ВХОД</a>
    `;
}

// 🔹 Функция обработки регистрации
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

// 🔹 Функция обработки входа
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
window.onload = initializeApp;



document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-game');
    const texts = document.querySelectorAll('.text-games > div');
    const dots = document.querySelectorAll('.dot');
    const images = document.querySelectorAll('.card-game img');
    const buttons = document.querySelectorAll('.text-game');
    
    let current = 0;
    let timer;
    
    // Функция для получения правильного индекса с учетом бесконечности
    function getCircularIndex(baseIndex, offset) {
        let index = baseIndex + offset;
        if (index >= 7) {
            index = index % 7;
        } else if (index < 0) {
            index = (index % 7 + 7) % 7;
        }
        return index;
    }
    
    // Основная функция показа слайдов
    function showSlide(index) {
        current = index;
        
        // 1. Скрыть ВСЕ картинки и кнопки
        cards.forEach(c => c.style.display = 'none');
        texts.forEach(t => t.style.display = 'none');
        
        // 2. Показать 4 картинки с учетом бесконечности
        for (let i = 0; i < 4; i++) {
            const cardIndex = getCircularIndex(index, i);
            
            // Показать картинку
            if (cards[cardIndex]) {
                cards[cardIndex].style.display = 'block';
                cards[cardIndex].style.order = i; // Важно для правильного порядка
            }
            
            // Показать кнопку
            if (texts[cardIndex]) {
                texts[cardIndex].style.display = 'block';
            }
        }
        
        // 3. Обновить точки
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }
    
    // Следующий слайд (бесконечный)
    function nextSlide() {
        let next = current + 1;
        if (next >= 7) next = 0; // Возвращаемся к началу
        showSlide(next);
    }
    
    // Предыдущий слайд (если нужно)
    function prevSlide() {
        let prev = current - 1;
        if (prev < 0) prev = 6; // Переходим к последнему
        showSlide(prev);
    }
    
    // Обработчики для точек
    dots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            clearInterval(timer);
            showSlide(i);
            timer = setInterval(nextSlide, 6000);
        });
    });
    
    
    // Автопрокрутка
    function startAutoSlide() {
        timer = setInterval(nextSlide, 19000);
    }
    
    // Остановка при наведении
    const container = document.querySelector('.games-slider-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(timer));
        container.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Добавим немного CSS для плавности
    const style = document.createElement('style');
    style.textContent = `
        .galery {
            transition: transform 0.5s ease-in-out;
        }
        .card-game {
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Запуск
    showSlide(0);
    startAutoSlide();
    
    
});