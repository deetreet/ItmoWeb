let comments = {};
let userAuthorized = false;
// Инициализирую мессенджер и определяю расположение уведомлений (справа снизу) и отбражение (поверх содержимого)
Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-right messenger-on-bottom',
    theme: 'flat',
    maxMessages: 5
};

document.addEventListener('DOMContentLoaded', () => {
    let preloader = document.getElementById('preloader');
    let errorMessage = document.getElementById('error-message');

    preloader.style.display = 'flex';

    let randomFilter = Math.random() < 0.5 ? { min: 100, max: 200 } : { min: 200, max: 300 };

    fetch(`https://mp239b04cfcef36489d6.free.beeceptor.com/data/deetreet?id_min=${randomFilter.min}&id_max=${randomFilter.max}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            preloader.style.display = 'none';
            data.comments.forEach(comment => {
                let shipName = comment.ship;
                if (!comments[shipName]) {
                    comments[shipName] = [];
                }
                comments[shipName].push(comment.author + ": " + comment.text);
            });
        })
        .catch(error => {
            preloader.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Error getting comments:', error);
        });

    document.querySelectorAll('.grid-row[data-ship]').forEach(row => {
        row.addEventListener('click', function () {
            document.querySelectorAll('.grid-row').forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
            displayComments(this.getAttribute('data-ship'));
        });
    });
});

function addComment() {
    userAuthorized = localStorage.getItem('userAuthorized') === 'true';

    if (!userAuthorized) {
        // Вывожу сообщение об ошибке с возможностью его закрыть
        Messenger().post({
            message: 'Чтобы добавить комментарий нужно авторизироваться',
            type: 'error',
            showCloseButton: true
        });
        return;
    }

    let commentInput = document.getElementById('comment-input');
    let comment = commentInput.value.trim();
    let selectedShip = document.querySelector('.grid-row.selected');

    if (!selectedShip) {
        // Вывожу сообщение об ошибке с возможностью его закрыть
        Messenger().post({
            message: 'Вы не выбрали судно',
            type: 'error',
            showCloseButton: true,
            hideAfter: 400
        });
        return;
    }

    if (!comment) {
        // Вывожу информационное сообщение
        Messenger().post({
            message: 'Вы не ввели комментарий',
            type: 'info',
            showCloseButton: true,
        })
        comment = "Нет слов"
    }

    let shipName = selectedShip.getAttribute('data-ship');

    if (!comments[shipName]) {
        comments[shipName] = [];
    }

    let username = localStorage.getItem('username');
    comments[shipName].push(username + ": " + comment);
    commentInput.value = '';

    // Вывожу сообщение об успешном действии с возможностью его закрыть
    Messenger().post({
        message: 'Комментарий добавлен',
        type: 'success',
        showCloseButton: true
    });

    displayComments(shipName);
}

function displayComments(shipName) {
    let commentList = document.getElementById('comment-list');
    commentList.innerHTML = '';

    if (comments[shipName]) {
        comments[shipName].forEach(comment => {
            let commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = comment;
            commentList.appendChild(commentDiv);
        });
    }
}
