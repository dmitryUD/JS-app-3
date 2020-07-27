window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    // получение элементов
    const tabs = document.querySelectorAll('.tabheader__item'), // табы
        tabsContent = document.querySelectorAll('.tabcontent'), // контент - изображение и текст
        tabsParent = document.querySelector('.tabheader__items'); // родитель табов (обертка)

    function hideTabContent() { // скрытие контента
        tabsContent.forEach(item => {
            item.classList.add('hide'); // или item.style.display = "none"
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => { // удаление класса активности у каждого таба
            item.classList.remove('tabheader__item_active');
        });
    }

    // показ табов
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

    // Timer
    const deadline = '2020-07-31';

    function getTimeRemainig(endtime) { // определяет разницу между дедлайном и текущем временем
        const t = Date.parse(endtime) - Date.parse(new Date()), // parse - превращение в число
              days = Math.floor(t / (1000*60*60*24)), // округление до ближайшего целого
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), // 
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return { // возврат объекта наружу для использования
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) { // 08
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { // установка таймера на страницу
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); // избежание мегания

        function updateClock() { // обновление таймера каждую секунду
            const t = getTimeRemainig(endtime); // расчет оставшегося времени, здесь находится объект!
            // помещение на страницу
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // остановка таймера
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // модальное окно

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; // отмена прокрутки страницы
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});