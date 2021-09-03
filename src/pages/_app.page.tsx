import {AppProps} from 'next/app';
import React from 'react';
import {detectLocale} from 'typesafe-i18n/detectors';
import '~/styles/index.css';

import {Locales} from '~/i18n/i18n-types';
import TypesafeI18n from '~/i18n/i18n-react';

const App = ({Component, pageProps, router}: AppProps) => {
  const detectedLocales = detectLocale(
    router.defaultLocale as Locales,
    router.locales as Locales[],
    () => (router.locale ? [router.locale] : []),
  );

  return (
    <>
      <TypesafeI18n initialLocale={detectedLocales}>
        <Component {...pageProps} />
      </TypesafeI18n>
    </>
  );
};

export default App;
