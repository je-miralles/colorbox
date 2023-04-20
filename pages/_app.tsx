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
              '#C1C2C5', // text color
              '#A6A7AB',
              '#909296',
              '#5c5f66',
              '#373A40',
              '#2C2E33',
              '#25262b',
              '#2C2E33', // body background color
              '#141517',
              '#101113',
            ],
          }
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
