import { Box, ChakraProvider, extendTheme, Link } from '@chakra-ui/react';
import { init } from "@socialgouv/matomo-next";
import { Analytics } from '@vercel/analytics/react';
import AppHeader from 'components/AppHeader';
import { socket, SocketContext } from 'context/SocketContext';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import NextLink from 'next/link';
import { useEffect } from 'react';

const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        textDecoration: 'underline'
      }
    }
  },
  colors: {
    brand: {
      200: "#fb8c00",
      400: '#ffa726',
      500: "#fb8c00",
      600: "#ef6c00",
      700: '#f57c00',
      800: "#ef6c00",
    },
  },
  config: {
    useSystemColorMode: true,
  }
})

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    init({ url: 'https://matomo.trafex.nl', siteId: '2' });
  }, []);

  return (
      <ChakraProvider theme={theme}>
        <SocketContext.Provider value={socket}>
          <DefaultSeo
            title="Clipboard.ninja - Quick and secure way to share text, urls, snippets, passwords, etc. between devices"
            description="Realtime clipboard to quickly and securely share text between different (mobile) devices"
            themeColor="#ef6c00"
            additionalLinkTags={[
              {
                rel: 'manifest',
                href: '/manifest.json',
              }
            ]}
            additionalMetaTags={[
              {
                name: 'msapplication-TileColor',
                content: '#ef6c00',
              },
              {
                name: 'apple-mobile-web-capable',
                content: 'yes',
              },
              {
                name: 'apple-mobile-web-app-title',
                content: 'Clipboard.ninja',
              },
              {
                name: 'application-name',
                content: 'Clipboard.ninja',
              }
            ]}
          />
          <AppHeader />
          <Component {...pageProps} />
          <Box as={'footer'} px={2} fontSize={'sm'} color='gray.400'>
              <Link href="https://github.com/TrafeX/clipboard.ninja/blob/master/PRIVACY.md" as={NextLink} target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
              {" "}- <Link href="https://github.com/trafex/clipboard.ninja" as={NextLink} target="_blank" rel="noopener noreferrer">Source on GitHub</Link>
              {" "}- Created by <Link href="https://www.timdepater.com" as={NextLink} target="_blank" rel="noopener noreferrer">Tim de Pater</Link>
          </Box>
          <Analytics />
        </SocketContext.Provider>
      </ChakraProvider>
  );
}
