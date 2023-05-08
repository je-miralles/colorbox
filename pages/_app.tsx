import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return(
    <>
      <Head>
        <title>Dark Job Board</title>
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
              '#C1C2C5', // dark colorScheme text color
              '#A6A7AB',
              '#909296',
              '#5c5f66',
              '#373A40',
              '#2C2E33',
              '#25262b', // dark colorScheme card color
              '#1A1B1E', // dark colorScheme body background color
              '#141517',
              '#101113',
            ],
            gray: [
              '#f8f9fa',
              '#f1f3f5',
              '#e9ecef',
              '#dee2e6',
              '#ced4da',
              '#adb5bd',
              '#868e96',
              '#495057',
              '#343a40',
              '#212529',
            ],
          }
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
