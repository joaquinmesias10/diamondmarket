import { locales, rtlLocales, defaultLocale } from './language.config';
import Cookie from 'js-cookie';
 
export function isLocale(tested) {
  return locales.some((locale) => locale === tested);
}

export function isRTL(tested) {
  return rtlLocales.some((locale) => locale === tested);
}

export function getInitialLocale() {
  // preference from the previous session
  const localSetting = Cookie.get('locale');
  if (localSetting && isLocale(localSetting)) {
    return localSetting;
  }

  // the language setting of the browser
  // const [browserSetting] = navigator.language.split('-');
  // if (isLocale(browserSetting)) {
  //   return browserSetting;
  // }

  return defaultLocale;
}
