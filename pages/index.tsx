import Head from 'next/head';
import { Button, Group, Container, Title, Grid } from "@mantine/core";
import React, { useEffect, useState } from 'react';

import LandingPage from './LandingPage'

export default function IndexPage() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTIAE4rAi3VwxQ3zSHlBgZNg43gfMVJ-uYiXFDvdDHNQMYPTNyir155Vbv2o2KacdYb8BZSSIJI88A/pub?gid=0&single=true&output=csv";
  return (
    <>
      <Head>
        <title>ListingBoard</title>
        <meta name="description" content="A board of listings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage url={url} />
    </>
  );
}
