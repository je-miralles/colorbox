import { useEffect, useState } from 'react';
import { createStyles, rem, Container, Title, Grid } from '@mantine/core';
const Papa = require('papaparse');

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

  inner: {
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
  const { classes } = useStyles()
  const [data, setData] = useState<JobCardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const csvText = await response.text();
        const theCsv = Papa.parse(csvText, {
          header: true
        });
        setData([...theCsv.data]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            Resource Generation Job Board
          </Title>
        </div>
      </Container>
      <Container>
        <Grid>
          {data.map((d, k) => (
            <Grid.Col span={4} key={k}>
              <JobCard data={d}></JobCard>
            </Grid.Col>))}
        </Grid>
      </Container>
    </main>
  );
}
