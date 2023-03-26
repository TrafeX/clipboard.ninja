import type { AppProps } from 'next/app';

import { Box, ChakraProvider, extendTheme, Link } from '@chakra-ui/react';
import AppHeader from 'components/AppHeader';
import { socket, SocketContext } from 'context/SocketContext';
import NextLink from 'next/link';
import { DefaultSeo } from 'next-seo';

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

  return (
      <ChakraProvider theme={theme}>
        <SocketContext.Provider value={socket}>

          <DefaultSeo
            title="Clipboard.ninja"
            description="Realtime clipboard to quickly and securely share text between different (mobile) devices"
            additionalLinkTags={[
              {
                rel: 'manifest',
                href: '/manifest.json',
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
        </SocketContext.Provider>
      </ChakraProvider>
  );
}
