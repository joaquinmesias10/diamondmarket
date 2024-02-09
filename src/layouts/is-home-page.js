import {
  HOME_PAGE,
  GROCERY_PAGE,
  CLOTHING_PAGE,
  MAKEUP_PAGE,
  BAGS_PAGE,
  FURNITURE_PAGE,
  BOOKING_PAGE,
  MEDICINE_PAGE,
  RESTAURANT_PAGE,
} from '../site-settings/site-navigation';
const arr = [
  HOME_PAGE,
  GROCERY_PAGE,
  CLOTHING_PAGE,
  MAKEUP_PAGE,
  BAGS_PAGE,
  FURNITURE_PAGE,
  BOOKING_PAGE,
  MEDICINE_PAGE,
  RESTAURANT_PAGE,
];
export function isCategoryPage(pathname) {
  return arr.includes(`/${pathname}`);
}
