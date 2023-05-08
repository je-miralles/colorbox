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
              '#d5d7e0', // dark colorScheme text color
              '#acaebf',
              '#8c8fa3',
              '#666980',
              '#4d4f66',
              '#34354a',
              '#2b2c3d', // dark colorScheme card color
              '#0c0d21', // dark colorScheme body background color
              '#0c0d21',
              '#01010a',
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
