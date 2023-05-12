import { useCallback, useEffect, useState } from 'react';
import { rem, createStyles, Group, Container, Grid, Text, Button } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { color } from 'd3-color';

import Colorcard, { ColorcardData } from './Colorcard';

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
type colorGen = {
  method: string;
  rgb: randomRGBgen;
  hsl: randomHSLgen;
};
type ColorboxProps = {
  numColors: number;
  colorKnobs: colorGen
};

const useStyles = createStyles((theme) => ({
  centertext: {
    textAlign: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.black,
    fontSize: rem(12),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(10),
    },
  },
}));

const randVal = (min: number, max: number) => { return Math.abs(Math.floor(Math.random() * (max - min) + min)) };
const genKnobsRGB = () => {
  return({
    r_min: randVal(1, 255),
    r_max: randVal(1, 255),
    g_min: randVal(1, 255),
    g_max: randVal(1, 255),
    b_min: randVal(1, 255),
    b_max: randVal(1, 255),
  });
};
const genKnobsHSL = () => {
  return({
    h_min: randVal(1, 360),
    h_max: randVal(1, 360),
    s_min: randVal(1, 100),
    s_max: randVal(1, 100),
    l_min: randVal(1, 100),
    l_max: randVal(1, 100),
  });
};
const randomColorRGB = (colorKnobs: colorGen) => {
  const r = randVal(colorKnobs.rgb.r_min, colorKnobs.rgb.r_max);
  const g = randVal(colorKnobs.rgb.g_min, colorKnobs.rgb.g_max);
  const b = randVal(colorKnobs.rgb.b_min, colorKnobs.rgb.b_max);
  const newcolor = color(`rgb(${r}, ${g}, ${b})`);
  return ({
    string: `rgb(${r}, ${g}, ${b})`,
    code: newcolor ? newcolor.formatHex() : "#888888",
  });
};
const randomColorHSL = (colorKnobs: colorGen) => {
  const h = randVal(colorKnobs.hsl.h_min, colorKnobs.hsl.h_max);
  const s = randVal(colorKnobs.hsl.s_min, colorKnobs.hsl.s_max);
  const l = randVal(colorKnobs.hsl.l_min, colorKnobs.hsl.l_max);
  const newcolor = color(`hsl(${h}, ${s}%, ${l}%)`);
  return ({
    string: `hsl(${h}, ${s}%, ${l}%)`,
    code: newcolor ? newcolor.formatHex() : "#888888",
  });
};

let didInit = false;

export default function Colorbox({ numColors, colorKnobs }: ColorboxProps) {
  const { classes } = useStyles();
  const { height, width } = useViewportSize();
  const [colors, setColors] = useState<ColorcardData[]>([]);

  const genColors = useCallback((num_colors: number, colorKnobs: colorGen, method: string="hsl") => {
    if (method == "hsl") {
      return Array.from({ length: num_colors }, () => randomColorHSL(colorKnobs));
    } else {
      return Array.from({ length: num_colors }, () => randomColorRGB(colorKnobs));
    }
  }, []);

  const randColorButton = () => {
    const method = Math.random() > 0.5 ? "hsl" : "rgb";
    const rgRGB = genKnobsRGB();
    const rgHSL = genKnobsHSL();
    const colorKnobs = {
      method: method,
      rgb: rgRGB,
      hsl: rgHSL,
    };
    setColors([...genColors(numColors, colorKnobs, method)])
  }

  useEffect(() => {
    const setRandomColors = () => {
      setColors([...genColors(numColors, colorKnobs)]);
      didInit = true;
    };
    if (!didInit) setRandomColors();
  }, [genColors, numColors, colorKnobs]);

  if (!didInit) return <Container><Text>Loading...</Text></Container>;
  else return(
    <Container>
      <Group position="center">
        <Button compact onClick={(event) => randColorButton()}>
          Randomize
        </Button>
      </Group>
      <Grid m="xs" columns={24} justify="center" align="stretch">
        {colors.map((d, k) => (
          <Grid.Col xs={8} md={6} lg={4} key={k}>
            <Colorcard color={d}></Colorcard>
          </Grid.Col>))}
      </Grid>
    </Container>
  );
}

Colorbox.defaultProps = {
  numColors: 64,
  colorKnobs: {
    method: "hsl",
    rgb: {
      r_min: 74,
      r_max: 149,
      g_min: 0,
      g_max: 85,
      b_min: 191,
      b_max: 98,
    },
    hsl: {
      h_min: 0,
      h_max: 360,
      s_min: 32,
      s_max: 62,
      l_min: 25,
      l_max: 39,
    },
  }
};
