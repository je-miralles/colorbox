import { Group } from "@mantine/core";

import LandingPage from './LandingPage';

export default function IndexPage() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTIAE4rAi3VwxQ3zSHlBgZNg43gfMVJ-uYiXFDvdDHNQMYPTNyir155Vbv2o2KacdYb8BZSSIJI88A/pub?gid=0&single=true&output=csv";
  return (
    <Group mt={50} position="center">
      <LandingPage url={url} />
    </Group>
  );
}
