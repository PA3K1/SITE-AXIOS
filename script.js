function openModal(e) {
    e.preventDefault(); // Отменяет стандартное поведение ссылки (переход по URL)
    const modal = document.querySelector('.modal'); // Находит элемент с классом .modal (первое окно)
    modal.style.opacity = '0'; // Делает окно полностью прозрачным
    modal.style.display = 'block'; // Меняет display с none на block (показывает элемент)
    setTimeout(() => modal.style.opacity = '1', 10); // Через 10мс делает окно непрозрачным (плавное появление)
}

function openBodal(e) {
    e.preventDefault(); // Отменяет стандартное поведение ссылки
    const modal = document.querySelector('.modal--registration'); // Находит элемент с классом .modal--registration (второе окно)
    modal.style.opacity = '0'; // Делает окно прозрачным
    modal.style.display = 'block'; // Показывает элемент
    setTimeout(() => modal.style.opacity = '1', 10); // Плавное появление через 10мс
}

function closeModal() {
    // Находит модальное окно, у которого в стиле есть "display: block" (активное окно)
    const activeModal = document.querySelector('.modal[style*="display: block"]');
    
    // Если активное окно найдено
    if (activeModal) {
        activeModal.style.opacity = '0'; // Делает окно прозрачным (начало анимации закрытия)
        
        // Через 300мс (время анимации) скрывает элемент полностью
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