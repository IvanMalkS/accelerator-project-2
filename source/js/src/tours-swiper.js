import Swiper from 'swiper';
import 'swiper/css';
import {Navigation} from 'swiper/modules';

const toursSwiper = document.querySelector('.tours__swiper');
const SWIPER_CONFIG = {
  modules: [Navigation],
  navigation: {
    prevEl: '.tours__navigation-button--before',
    nextEl: '.tours__navigation-button--next',
  },
  breakpoints: {
    320: {
      spaceBetween: 100,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    1440: {
      spaceBetween: 30,
      slidesPerView: 3,
      simulateTouch: false,
    },
  },
};


const initToursSwiper = () => {
  if (!toursSwiper) {
    return;
  }

  new Swiper('.tours__swiper', SWIPER_CONFIG);
};

export default initToursSwiper;
