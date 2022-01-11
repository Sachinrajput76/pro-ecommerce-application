import React, { Fragment } from 'react';
import Router from 'next/router';
import { wrapper } from '../store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/scss/main.scss';
// global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';
import '../assets/css/globals.css'

import * as gtag from './../utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }) => (
  <Fragment>
    <Component {...pageProps} />
    <ToastContainer />
  </Fragment>
);

export default wrapper.withRedux(MyApp);