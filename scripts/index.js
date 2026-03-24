/* yandex maps */
setTimeout(function () {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map('map', {
      center: [52.51009596032807, 103.83664109391783],
      zoom: 15,
      controls: ['smallMapDefaultSet'],
    });
    var myPlacemark = new ymaps.Placemark(
      [52.51009596032807, 103.83664109391783],
      {
        hintContent: 'Кафе Тортуга',
        balloonContent: '179-й квартал, дом 5В, 2 этаж',
      },
      {
        preset: 'islands#redIcon',
      },
    );
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);
  }
}, 4000);

// Smooth scroll for anchor links
document.querySelectorAll('.nav_fullScreen a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetID = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetID);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`Element not found for selector: ${targetID}`);
    }
  });
});

// Smooth scroll for anchor links mobile
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href');
    const target = document.querySelector(targetID);
    if (!target) return;

    const yOffset = -80;
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  });
});

// Burger menu
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger_icon');
  const menu = document.querySelector('.mobile_popup');
  const body = document.body;

  if (!burger || !menu) return;

  const toggleMenu = (open = null) => {
    const isOpen = open !== null ? open : !menu.classList.contains('menu--active');

    menu.classList.toggle('menu--active', isOpen);
    burger.classList.toggle('burger--active', isOpen);
    body.classList.toggle('no-scroll', isOpen);
    burger.setAttribute('aria-expanded', isOpen.toString());
  };

  burger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Закрытие при клике по ссылке внутри меню
  menu
    .querySelectorAll('a')
    .forEach((link) => link.addEventListener('click', () => toggleMenu(false)));

  // Закрытие при клике вне меню и бургера
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnBurger = burger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnBurger && menu.classList.contains('menu--active')) {
      toggleMenu(false);
    }
  });
});
