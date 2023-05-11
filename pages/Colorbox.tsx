import { useEffect, useState } from 'react';
import { Container, Grid, Text } from '@mantine/core';

import JobCard, { JobCardData } from './JobCard';

type ColorboxProps = {
  url: string;
  rgRGB: randomRGBgen;
  rgHSL: randomHSLgen;
};
type randomRGBgen = {
  r_min: number;
  r_max: number;
  g_min: number;
  g_max: number;
  b_min: number;
  b_max: number;
};
type randomHSLgen = {
  h_min: number;
  h_max: number;
  s_min: number;
  s_max: number;
  l_min: number;
  l_max: number;
};

export default function Colorbox({ url, rgRGB, rgHSL }: ColorboxProps) {
  const [data, setData] = useState<JobCardData[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const randVal = (min: number, max: number) => Math.abs(Math.floor(Math.random() * (max - min) + min));
    const randomColorRGB = () => {
      const r = randVal(rgRGB.r_min, rgRGB.r_max);
      const g = randVal(rgRGB.g_min, rgRGB.g_max);
      const b = randVal(rgRGB.b_min, rgRGB.b_max);
      return `rgb(${r}, ${g}, ${b})`;
    };
    const randomColorHSL = () => {
      const h = randVal(rgHSL.h_min, rgHSL.h_max);
      const s = randVal(rgHSL.s_min, rgHSL.s_max);
      const l = randVal(rgHSL.l_min, rgHSL.l_max);
      return `hsl(${h}, ${s}%, ${l}%)`;
    };
    const genColors = (num_colors: number, randFunc: () => string=randomColorHSL) => {
      return Array.from({ length: num_colors }, () => randFunc());
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const csvText = await response.text();
        const Papa = require('papaparse');
        const theCsv = Papa.parse(csvText, {header: true});
        setData([...theCsv.data]);
        setColors([...genColors(theCsv.data.length)]);
        setLoaded(true);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (!isLoaded) fetchData();
  }, [url, rgRGB, rgHSL, isLoaded]);

  if (!isLoaded) return <Container><Text>Loading...</Text></Container>;
  else return(
    <Container>
      <Grid align="stretch">
        {data.map((d, k) => (
          <Grid.Col md={6} lg={3} key={k}>
            <JobCard data={d} color={colors[k]}></JobCard>
          </Grid.Col>))}
      </Grid>
    </Container>
  );
}

Colorbox.defaultProps = {
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTIAE4rAi3VwxQ3zSHlBgZNg43gfMVJ-uYiXFDvdDHNQMYPTNyir155Vbv2o2KacdYb8BZSSIJI88A/pub?gid=0&single=true&output=csv",
  rgRGB: {
    r_min: 74,
    r_max: 149,
    g_min: 0,
    g_max: 85,
    b_min: 191,
    b_max: 98,
  },
  rgHSL: {
    h_min: 0,
    h_max: 360,
    s_min: 32,
    s_max: 62,
    l_min: 25,
    l_max: 39,
  },
};
