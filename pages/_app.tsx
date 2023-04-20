import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return(
    <>
      <Head>
        <title>RG Job Board</title>
        <link rel="shortcut icon" href="favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
          colors: {
            dark: [
              '#fff9db', // text color
              '#fff3bf',
              '#ffec99',
              '#ffe066',
              '#ffd43b',
              '#fcc419',
              '#fab005',
              '#f59f00', // body background color
              '#f08c00',
              '#e67700',
            ],
          }
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
