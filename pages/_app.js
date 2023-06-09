//* The _app.js file is the root component within which the various page components are rendered.
//? The 'Component' component returned here is actually the 'Page' component!
//? Whenever pages are switched, Nextjs hands the next page content to this component to render!
//? Therefore, we can wrap this component with a general layout component, e.g. a Fragment and add a Header on top of it.
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import nProgress from 'nprogress';
import TagManager from 'react-gtm-module';

const GTM_ID = 'GTM-PQM8XPG';

const tagManagerArgs = {
  id: GTM_ID,
};

import Layout from '../components/layout/Layout';
import { analytics } from '../analytics';
import '../styles/globals.css';
import '../styles/page-loader.css';
import '../styles/quill-snow.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  useEffect(() => {
    analytics(window, document, 'script', 'dataLayer', GTM_ID);
  });

  //* Using events to perform actions when the router changes routes, such as refreshing the data or updating the UI
  const router = useRouter();

  //* Configuring and managing a progress bar
  nProgress.configure({ easing: 'ease', speed: 500 });

  useEffect(() => {
    router.events.on('routeChangeStart', () => nProgress.start());
    router.events.on('routeChangeComplete', () => nProgress.done());
    router.events.on('routeChangeError', () => nProgress.done());
  }, []);

  return (
    <Layout>
      <Head>
        <title>SEO-Blog</title>
        <meta name='author' content='Arie Verburgh'></meta>
        <meta name='description' content='MERN NextJS SEO-Blog'></meta>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <meta charSet='UTF-8' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
