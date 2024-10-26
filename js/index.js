(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let menuToggle = document.querySelector('.menu-toggle');
        let dropdownMenu = document.querySelector('.dropdown-menu');

        menuToggle.addEventListener('click', function () {
            dropdownMenu.classList.toggle('visible');
        });
    });
})();

(function () {
    window.addEventListener('load', function () {
        let loadTime = Date.now() - performance.timing.navigationStart;
        let footer = document.querySelector('footer');
        let loadInfo = this.document.createElement('p')
        loadInfo.textContent = `Время загрузки страницы: 0.${loadTime} секунд`;
        footer.appendChild(loadInfo);
    });
})();

(function () {
    let menuButtons = document.querySelectorAll('header nav a');
    menuButtons.forEach((button) => {
        console.log(button)
        if (document.location.href.includes(button.getAttribute('href'))) {
            button.classList.add('active');
        }
    });
})();