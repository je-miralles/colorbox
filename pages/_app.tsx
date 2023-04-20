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
              '#ebfbee', // text color
              '#d3f9d8',
              '#b2f2bb',
              '#8ce99a',
              '#69db7c',
              '#51cf66',
              '#40c057',
              '#37b24d', // body background color
              '#2f9e44',
              '#2b8a3e',
            ],
          }
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
