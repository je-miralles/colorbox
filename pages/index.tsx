import { Button, Group, Container, Title, Grid } from "@mantine/core";
import { csv } from 'd3-fetch';
import { DSVRowArray } from 'd3-dsv';
import { useEffect, useState } from 'react';
import JobCard from './JobCard';

export default function IndexPage() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTIAE4rAi3VwxQ3zSHlBgZNg43gfMVJ-uYiXFDvdDHNQMYPTNyir155Vbv2o2KacdYb8BZSSIJI88A/pub?gid=0&single=true&output=csv";
  const [data, setData] = useState(DSVRowArray<string>);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const theCsv = await csv(url);
        console.log("theCsv", theCsv);
        setData([...theCsv]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Group mt={50} position="center">
      <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            Resource Generation Job Board
          </Title>
        </div>
      </Container>
      <Container>
        <Grid>
          {data.map(d => (
            <Grid.Col span={4} key={d.title}>
              <JobCard data={d}></JobCard>
            </Grid.Col>))}
        </Grid>
      </Container>
    </Group>
  );
}
