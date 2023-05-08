import { useEffect, useState } from 'react';
import { Container, Grid, Text } from '@mantine/core';

import JobCard, { JobCardData } from './JobCard';

type LandingPageProps = {
  url: string;
};

export default function LandingPage({ url }: LandingPageProps) {
  const [data, setData] = useState<JobCardData[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const randomColor = (r_min: number=0, r_max: number=125, g_min: number=0, g_max: number=100, b_min: number=0, b_max: number=150) => {
      const randVal = (min: number, max: number) => Math.abs(Math.floor(Math.random() * (max - min) + min));
      const r = randVal(r_min, r_max);
      const g = randVal(g_min, g_max);
      const b = randVal(b_min, b_max);
      return `rgb(${r}, ${g}, ${b})`;
    }
    const randomColorHSL = (h_min: number=95, h_max: number=360, s_min: number=0, s_max: number=90, l_min: number=15, l_max: number=30) => {
      const randVal = (min: number, max: number) => Math.abs(Math.floor(Math.random() * (max - min) + min));
      const h = randVal(h_min, h_max);
      const s = randVal(s_min, s_max);
      const l = randVal(l_min, l_max);
      return `hsl(${h}, ${s}%, ${l}%)`;
    };
    const genColors = (num_colors: number) => {
      return Array.from({ length: num_colors }, () => randomColorHSL());
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
  }, [url, isLoaded]);

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

LandingPage.defaultProps = {
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTIAE4rAi3VwxQ3zSHlBgZNg43gfMVJ-uYiXFDvdDHNQMYPTNyir155Vbv2o2KacdYb8BZSSIJI88A/pub?gid=0&single=true&output=csv"
};
