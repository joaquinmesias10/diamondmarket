import Routes from './router';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import store from './redux_helper/stores';
// import { SnackbarProvider, useSnackbar } from 'notistack';
// import Layout from './layout';
import LoadingModal from './components/modal/loading';
import AlertMessage from './components/modal/alert';

import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './site-settings/site-theme/default';
import { AppProvider } from './contexts/app/use-app';
import { AuthProvider } from './contexts/auth/auth.provider';
import { LanguageProvider } from './contexts/language/language.provider';
import { CartProvider } from './contexts/cart/use-cart';
import { useMedia } from './utils/use-media';
import AppLayout from './layouts/app-layout';

// External CSS import here
import 'swiper/swiper-bundle.min.css';
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import './components/multi-carousel/multi-carousel.style.css';
import 'react-spring-modal/dist/index.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import './components/scrollbar/scrollbar.css';
import '@redq/reuse-modal/lib/index.css';
import './App.css';

import { GlobalStyle } from './assets/styles/global.style';

// Language translation messages
import { messages } from './site-settings/site-translation/messages';
import 'typeface-lato';
import 'typeface-poppins';
// need to provide types
export default function App() {
  const mobile = useMedia('(max-width: 580px)');
  const tablet = useMedia('(max-width: 991px)');
  const desktop = useMedia('(min-width: 992px)');

  console.log(mobile, tablet, desktop)
  return (
    // <Provider store = {store}>
    //     <LoadingModal />
    //     <AlertMessage/>
    //     <Layout>
    //       <Routes />
    //     </Layout>
    //   </Provider>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <LanguageProvider messages={messages}>
          <CartProvider>
            <AppProvider>
              <AuthProvider>
                <LoadingModal />
                <AlertMessage />
                <HashRouter>
                  <AppLayout>
                    <Routes />
                  </AppLayout>
                </HashRouter>
                <GlobalStyle />
              </AuthProvider>
            </AppProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}
