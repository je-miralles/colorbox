import { useEffect, useState } from 'react';
import { Container, Grid, Text } from '@mantine/core';
import { color } from 'd3-color';

import Colorcard, { ColorcardData } from './Colorcard';

type ColorboxProps = {
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

export default function Colorbox({ rgRGB, rgHSL }: ColorboxProps) {
  const [colors, setColors] = useState<ColorcardData[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const randVal = (min: number, max: number) => Math.abs(Math.floor(Math.random() * (max - min) + min));
    const randomColorRGB = () => {
      const r = randVal(rgRGB.r_min, rgRGB.r_max);
      const g = randVal(rgRGB.g_min, rgRGB.g_max);
      const b = randVal(rgRGB.b_min, rgRGB.b_max);
      const newcolor = color(`rgb(${r}, ${g}, ${b})`);

      return ({
        string: `rgb(${r}, ${g}, ${b})`,
        code: newcolor ? newcolor.formatHex() : "#888888",
      });
    };
    const randomColorHSL = () => {
      const h = randVal(rgHSL.h_min, rgHSL.h_max);
      const s = randVal(rgHSL.s_min, rgHSL.s_max);
      const l = randVal(rgHSL.l_min, rgHSL.l_max);
      const newcolor = color(`hsl(${h}, ${s}%, ${l}%)`);

      return ({
        string: `hsl(${h}, ${s}%, ${l}%)`,
        code: newcolor ? newcolor.formatHex() : "#888888",
      });
    };
    const genColors = (num_colors: number, randFunc: () => ColorcardData=randomColorHSL) => {
      return Array.from({ length: num_colors }, () => randFunc());
    };

    const fetchData = async () => {
      try {
        const length = 16;
        setColors([...genColors(length)]);
        setLoaded(true);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (!isLoaded) fetchData();
  }, [rgRGB, rgHSL, isLoaded]);

  if (!isLoaded) return <Container><Text>Loading...</Text></Container>;
  else return(
    <Container>
      <Grid align="stretch">
        {colors.map((d, k) => (
          <Grid.Col sm={3} md={3} key={k}>
            <Colorcard color={d}></Colorcard>
          </Grid.Col>))}
      </Grid>
    </Container>
  );
}

Colorbox.defaultProps = {
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
