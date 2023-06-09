//* This page, _document.js, is used to customize the HTML document that is rendered by Next.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
// import { publicRuntimeConfig } from '../next.config';

const GTM_ID = 'GTM-PQM8XPG';

class MyDocument extends Document {
  //* Ryan Dhungel's code: suspect!
  // setGoogleTags() {
  //   if (publicRuntimeConfig.PRODUCTION) {
  //     return {
  //       __html: `
  //         window.dataLayer = window.dataLayer || [];
  //         function gtag(){dataLayer.push(arguments);}
  //         gtag('js', new Date());

  //         gtag('config', 'G-NFME8LHT4L');
  //       `,
  //     };
  //   }
  // }
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.2/css/bootstrap.min.css'
            integrity='sha512-rt/SrQ4UNIaGfDyEXZtNcyWvQeOq0QLygHluFQcSjaGB04IxWhal71tKuzP6K8eYXYB6vJV4pHkXcmFGGQ1/0w=='
            crossOrigin='anonymous'
            referrerPolicy='no-referrer'
          />
          {/*//* <!-- Google Tag Manager --> */}
          <Script
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', 'GTM-PQM8XPG');`,
            }}
          />
          {/*//* <!-- End Google Tag Manager -- */}
          <Script
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-NFME8LHT4L');`,
            }}
          />

          {/* //* Ryan Dhungel's code: suspect! */}
          {/* <Script dangerouslySetInnerHTML={this.setGoogleTags()} /> */}
          <script async src='https://www.googletagmanager.com/gtag/js?id=G-NFME8LHT4L'></script>
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQM8XPG"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
