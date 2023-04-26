import { useEffect, useState } from 'react';
import { createStyles, rem, Container, Title, Grid } from '@mantine/core';

import JobCard, { JobCardData } from './JobCard';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,

    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },
}));

type LandingPageProps = {
  url: string;
};

export default function LandingPage({ url }: LandingPageProps) {
  const { classes } = useStyles();
  const [data, setData] = useState<JobCardData[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;

    const randomColor = (max: number = 100) => {
      const randVal = () => Math.floor(Math.random() * max);
      return `rgb(${randVal()}, ${randVal()}, ${randVal()})`;
    };

    const genColors = (num_colors: number) => {
      return Array.from({ length: num_colors }, () => randomColor());
    };

    const fetchData = async () => {
      if (!ignore) {
        try {
          const response = await fetch(url);
          const csvText = await response.text();
          const Papa = require('papaparse');
          const theCsv = Papa.parse(csvText, {header: true});
          setData([...theCsv.data]);
          setColors([...genColors(theCsv.data.length)]);
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [url, data.length]);

  return(
    <main>
      <Container className={classes.wrapper} size={1400}>
        <Title className={classes.title}>
          Dark Job Board
        </Title>
      </Container>
      <Container>
        <Grid align="stretch">
          {data.map((d, k) => (
            <Grid.Col md={6} lg={3} key={k}>
              <JobCard data={d} color={colors[k]}></JobCard>
            </Grid.Col>))}
        </Grid>
      </Container>
    </main>
  );
}

LandingPage.defaultProps = {
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTIAE4rAi3VwxQ3zSHlBgZNg43gfMVJ-uYiXFDvdDHNQMYPTNyir155Vbv2o2KacdYb8BZSSIJI88A/pub?gid=0&single=true&output=csv"
};
