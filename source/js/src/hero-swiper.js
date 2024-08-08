import Swiper from 'swiper';
import 'swiper/css';

import { Pagination } from 'swiper/modules';

const heroSwiper = document.querySelector('.hero__container');
const heroPagination = document.querySelector('.hero__pagination');

const HERO_CONFIG = {
  modules: [Pagination],
  loop: true,
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      spaceBetween: 100,
      with: 320,
    },
    768: {
      spaceBetween: 700,
      width: 768,
    },
    1366: {
      spaceBetween: 800,
      width: 1440,
      simulateTouch: false,
    },
  },
};

const initHeroSwiper = () => {
  if (!heroPagination || !heroSwiper) {
    return;
  }

  new Swiper('.hero__container', HERO_CONFIG);
};

export default initHeroSwiper;
