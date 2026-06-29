import { Box, Link } from "@chakra-ui/react";
import { trackPagesRouter } from "@socialgouv/matomo-next";
import { Analytics } from "@vercel/analytics/react";
import AppHeader from "components/AppHeader";
import { Provider } from "components/ui/provider";
import { Toaster } from "components/ui/toaster";
import { socket, SocketContext } from "context/SocketContext";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import NextLink from "next/link";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    trackPagesRouter({ url: "https://matomo.trafex.nl", siteId: "2" });
  }, []);

  return (
    <Provider>
      <SocketContext.Provider value={socket}>
        <DefaultSeo
          title="Clipboard.ninja - Instantly share text between devices"
          description="Instantly and securely send text, links and snippets between your phone, tablet and computer. Pair two devices with a 6-digit Device ID. No account, nothing stored."
          themeColor="#ef6c00"
          openGraph={{
            type: "website",
            url: "https://clipboard.ninja",
            siteName: "Clipboard.ninja",
            title: "Clipboard.ninja - Instantly share text between devices",
            description:
              "Instantly and securely send text, links and snippets between your phone, tablet and computer. Pair two devices with a 6-digit Device ID. No account, nothing stored.",
            locale: "en_US",
            images: [
              {
                url: "https://clipboard.ninja/img/ninja512.png",
                width: 512,
                height: 512,
                alt: "Clipboard.ninja",
              },
            ],
          }}
          twitter={{
            cardType: "summary",
          }}
          additionalLinkTags={[
            {
              rel: "manifest",
              href: "/manifest.json",
            },
          ]}
          additionalMetaTags={[
            {
              name: "msapplication-TileColor",
              content: "#ef6c00",
            },
            {
              name: "apple-mobile-web-capable",
              content: "yes",
            },
            {
              name: "apple-mobile-web-app-title",
              content: "Clipboard.ninja",
            },
            {
              name: "application-name",
              content: "Clipboard.ninja",
            },
          ]}
        />
        <AppHeader />
        <Component {...pageProps} />
        <Box as={"footer"} px={2} fontSize={"sm"} color="gray.400">
          <Link
            href="https://github.com/TrafeX/clipboard.ninja/blob/master/PRIVACY.md"
            as={NextLink}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            textDecoration="underline"
          >
            Privacy Policy
          </Link>{" "}
          -{" "}
          <Link
            href="https://github.com/trafex/clipboard.ninja"
            as={NextLink}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            textDecoration="underline"
          >
            Source on GitHub
          </Link>{" "}
          - Created by{" "}
          <Link
            href="https://timdepater.com?mtm_source=clipboard.ninja"
            as={NextLink}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            textDecoration="underline"
          >
            Tim de Pater
          </Link>
        </Box>
        <Analytics />
        <Toaster />
      </SocketContext.Provider>
    </Provider>
  );
}
