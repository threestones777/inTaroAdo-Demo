import WOW from 'wowjs';
import 'animate.css';

export const initWow = () => {
  if (typeof window !== 'undefined') {
    new WOW.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    }).init();
  }
};