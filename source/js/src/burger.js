const burgerButton = document.querySelector('.burger');
const navigation = document.querySelector('.main-nav');
const burgerDescription = burgerButton.querySelector('.visually-hidden');

const initBurger = () => {
  if (!burgerButton || !navigation || !burgerDescription) {
    return;
  }

  if (navigation.classList.contains('main-nav--no-js')) {
    navigation.classList.remove('main-nav--no-js');
  }

  const burgerHandler = () => {
    if (burgerButton.classList.contains('burger--open')) {
      burgerButton.classList.remove('burger--open');
      burgerDescription.textContent = 'Открыть меню навигации';
      navigation.classList.remove('main-nav--open');
    } else {
      burgerButton.classList.add('burger--open');
      burgerDescription.textContent = 'Закрыть меню навигации';
      navigation.classList.add('main-nav--open');
    }
  };

  burgerButton.addEventListener('click', burgerHandler);
};

export default initBurger;
