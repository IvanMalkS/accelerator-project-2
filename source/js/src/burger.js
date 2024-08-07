const burgerButton = document.querySelector('.burger');
const navigation = document.querySelector('.main-nav');
const burgerDescription = burgerButton.querySelector('.visually-hidden');
const navigationLinks = document.querySelectorAll('.main-nav__link');

const initBurger = () => {
  if (!burgerButton || !navigation || !burgerDescription || !navigationLinks) {
    return;
  }

  const burgerHandler = () => {
    if (burgerButton.classList.contains('burger--open')) {
      burgerButton.classList.remove('burger--open');
      burgerDescription.textContent = 'Открыть меню навигации';
      navigation.classList.remove('main-nav--open');
      document.body.classList.remove('page--no-scroll');
    } else {
      burgerButton.classList.add('burger--open');
      burgerDescription.textContent = 'Закрыть меню навигации';
      navigation.classList.add('main-nav--open');
      document.body.classList.add('page--no-scroll');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (navigation.classList.contains('main-nav--no-js')) {
      navigation.classList.remove('main-nav--no-js');
    }

    burgerButton.addEventListener('click', burgerHandler);

    navigationLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navigation.classList.remove('main-nav--open');
        document.body.classList.remove('page--no-scroll');
        burgerButton.classList.remove('burger--open');
        burgerDescription.textContent = 'Открыть меню навигации';
      });
    });
  });
};

export default initBurger;
