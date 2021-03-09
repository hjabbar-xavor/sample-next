import React from 'react';
import get from "lodash.get";
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

import Head from 'next/head';
import '../styles/index.scss'


function MyApp({ Component, pageProps }) {

  const font = get(pageProps, 'data.config.base_font.value[0].font_codename.value', null) || 'nunito-sans';

  const title = (get(pageProps, 'page.label.value', null) || get(pageProps, 'page.title.value', null)) + ' | ' + get(pageProps, 'data.config.title.value', null);
  if (get(pageProps, 'page.seo__title.value', null)) {
    title = get(pageProps, 'page.seo__title.value', null);
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#FFF',
      },
    },
    typography: {
      fontFamily: [
        font,
        'sans-serif'
      ]
    }
  });

  // https://material-ui.com/guides/server-rendering/#the-client-side
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google" content="notranslate" />

        <meta name="description" content={get(pageProps, 'page.seo__description.value', null)} />
        {get(pageProps, 'data.config.favicon.value[0]', null) && (
          <link rel="icon" href={get(pageProps, 'data.config.favicon.value[0].url', null)} />
        )}
        {get(pageProps, 'page.seo__keywords.value', null) && (
          <meta name="keywords" content={get(pageProps, 'page.seo__keywords.value', null)} />
        )}
        {get(pageProps, 'page.seo__canonical_url.value', null) ?? (
          <link rel="canonical" href={get(pageProps, 'page.seo__canonical_url.value', null)} />
        )}
        {get(pageProps, 'page.seo__options.value', []).some(item => item.codename == "no_index") && (
          <meta name="robots" content="noindex,follow" />
        )}

        {(font !== 'system-sans') && (
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        )}
        {(font === 'nunito-sans') ? (
          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        ) : ((font === 'fira-sans') && (
          <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
        ))}
      </Head>
      <ThemeProvider theme={theme}>
        {/* https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;