window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'), // табы
        tabsContent = document.querySelectorAll('.tabcontent'), // контент - изображение и текст
        tabsParent = document.querySelector('.tabheader__items'); // родитель табов (обертка)

    function hideTabContent() { // скрытие контента
        tabsContent.forEach(item => {
            item.classList.add('hide'); // или item.style.block = "none"
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // по стаднарту ES6. Если ф-я вызывается без аргумента, то по умолч. вставится 0
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    
    tabsParent.addEventListener('click', (event) => { // обработчик события клика
        const target = event.target; // элемент, на котором произошло событие клика

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});