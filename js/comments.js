// Статичные комментарии
const staticComments = [
    { user: "deniss_yurchenko", date: "2026-01-21 08:22:09", text: "Все хорошо работает в пабг но когда заходишь в инвентарь через TAB подлагивает на время очень неудобно потому что ивент открываешь очень часто в перестрелках мешает" },
    { user: "Azrokernol", date: "2026-01-01 21:22:14", text: "Макрос хороший, есть все необходимые функции для приятной игры, но есть одно НО, в играх по типу Rust важно быть осторожным, и сильно не палится, чтоб не получить вак бан." },
    { user: "linhaos94", date: "2025-12-28 05:39:28", text: "Макрос топ все советую оч понравился))))" },
    { user: "rust_player_88", date: "2025-12-25 14:20:10", text: "Использую месяц в Rust. Отличный макрос! Никаких банов. Всем рекомендую." },
    { user: "csgo_pro", date: "2025-12-20 19:15:33", text: "В CS:GO работает идеально. Особенно на AK-47 и M4A4. Спреи ровные." },
    { user: "pubg_fan", date: "2025-12-15 11:45:22", text: "Для PUBG самое то! Прицел не скачет, убиваю с первых пуль. 5/5" },
    { user: "apex_legend", date: "2025-12-10 08:30:17", text: "В Apex Legends просто бомба! Р301 и Flatline стали лазерами." },
    { user: "rainbow_six", date: "2025-12-05 16:55:44", text: "В R6 Siege помогает, но нужно привыкнуть к настройкам. 4/5" },
    { user: "warzone_guy", date: "2025-11-30 21:10:05", text: "В Warzone 2.0 отлично! Kilo 141 и M4 стали меткими. Советую!" }
];

// Инициализация комментариев
function renderComments() {
    const container = document.getElementById('commentsContainer');
    if (!container) return;
    container.innerHTML = '';
    staticComments.forEach((c, i) => {
        const div = document.createElement('div');
        div.className = `comments__item ${i >= 3 ? 'comments__item--hidden' : 'comments__item--visible'}`;
        div.innerHTML = `
            <div class="comments__sidebar"></div>
            <div class="comments__header">
                <span class="comments__username">${c.user}</span>
                <span class="comments__date">${c.date}</span>
            </div>
            <p class="comments__text">${c.text}</p>
        `;
        container.appendChild(div);
    });

    // Кнопка "Показать больше"
    const showBtn = document.createElement('button');
    showBtn.id = 'commentsShowMore';
    showBtn.className = 'comments__button';
    showBtn.textContent = 'Показать больше';
    showBtn.addEventListener('click', function() {
        const hidden = container.querySelectorAll('.comments__item--hidden');
        for (let i = 0; i < Math.min(3, hidden.length); i++) {
            hidden[i].classList.remove('comments__item--hidden');
            hidden[i].classList.add('comments__item--visible');
        }
        if (container.querySelectorAll('.comments__item--hidden').length === 0) {
            this.style.display = 'none';
        }
    });
    const moreDiv = document.createElement('div');
    moreDiv.className = 'comments__more';
    moreDiv.appendChild(showBtn);
    container.appendChild(moreDiv);

    // Сообщение для неавторизованных
    const authMsg = document.createElement('div');
    authMsg.className = 'comments__auth-message';
    authMsg.id = 'authMessage';
    authMsg.innerHTML = '<p class="comments__auth-text">ОСТАВИТЬ ОТЗЫВ МОГУТ ТОЛЬКО<br>АВТОРИЗОВАННЫЕ ПОЛЬЗОВАТЕЛИ</p>';
    container.appendChild(authMsg);
}

// Добавление нового комментария
App.addComment = function() {
    const commentText = document.getElementById('commentText');
    const text = commentText.value.trim();
    const user = localStorage.getItem('loggedInUser');
    if (!user) return App.showToast('Войдите, чтобы оставить отзыв');
    if (text.length < 5) return App.showToast('Минимум 5 символов!');

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comments__item comments__item--visible';
    const sidebar = document.createElement('div');
    sidebar.className = 'comments__sidebar';
    const header = document.createElement('div');
    header.className = 'comments__header';
    const username = document.createElement('span');
    username.className = 'comments__username';
    username.textContent = user;
    const date = document.createElement('span');
    date.className = 'comments__date';
    date.textContent = new Date().toLocaleString('ru-RU');
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-comment';
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', function() {
        commentDiv.remove();
        App.showToast('Комментарий удалён');
    });
    header.appendChild(username);
    header.appendChild(date);
    header.appendChild(delBtn);
    const p = document.createElement('p');
    p.className = 'comments__text';
    p.textContent = text; // безопасно
    commentDiv.appendChild(sidebar);
    commentDiv.appendChild(header);
    commentDiv.appendChild(p);

    const container = document.getElementById('commentsContainer');
    const firstComment = container.querySelector('.comments__item');
    if (firstComment) {
        container.insertBefore(commentDiv, firstComment);
    } else {
        container.insertBefore(commentDiv, document.getElementById('authMessage'));
    }
    commentText.value = '';
    App.showToast('✓ Комментарий добавлен');
};

document.addEventListener('DOMContentLoaded', renderComments);
document.getElementById('submitComment')?.addEventListener('click', App.addComment);