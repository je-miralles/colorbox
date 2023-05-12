import { useCallback, useEffect, useState } from 'react';
import { rem, createStyles, Group, Container, Center, Grid, Text, Button } from '@mantine/core';
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
    r_min: randVal(0, 255),
    r_max: randVal(0, 255),
    g_min: randVal(0, 255),
    g_max: randVal(0, 255),
    b_min: randVal(0, 255),
    b_max: randVal(0, 255),
  });
};
const genKnobsHSL = () => {
  return({
    h_min: randVal(0, 360),
    h_max: randVal(0, 360),
    s_min: randVal(0, 100),
    s_max: randVal(0, 100),
    l_min: randVal(0, 100),
    l_max: randVal(0, 100),
  });
};
const randomColorRGB = (colorKnobs: colorGen) => {
  const r = randVal(colorKnobs.rgb.r_min, colorKnobs.rgb.r_max);
  const g = randVal(colorKnobs.rgb.g_min, colorKnobs.rgb.g_max);
  const b = randVal(colorKnobs.rgb.b_min, colorKnobs.rgb.b_max);
  const newcolor = color(`rgb(${r}, ${g}, ${b})`);
  return ({
    string: `rgb(${r},${g},${b})`,
    code: newcolor ? newcolor.formatHex() : "#888888",
  });
};
const randomColorHSL = (colorKnobs: colorGen) => {
  const h = randVal(colorKnobs.hsl.h_min, colorKnobs.hsl.h_max);
  const s = randVal(colorKnobs.hsl.s_min, colorKnobs.hsl.s_max);
  const l = randVal(colorKnobs.hsl.l_min, colorKnobs.hsl.l_max);
  const newcolor = color(`hsl(${h}, ${s}%, ${l}%)`);
  return ({
    string: `hsl(${h},${s}%,${l}%)`,
    code: newcolor ? newcolor.formatHex() : "#888888",
  });
};

const knobsDisplay = (colorKnobs: colorGen) => {
  return colorKnobs.method == "hsl" ? (
    <p>h.min {colorKnobs.hsl.h_min} h.max {colorKnobs.hsl.h_max} s.min {colorKnobs.hsl.s_min} s.max {colorKnobs.hsl.s_max} l.min {colorKnobs.hsl.l_min} l.max {colorKnobs.hsl.l_max}</p>
  ) : (
    <p>r.min {colorKnobs.rgb.r_min} r.max {colorKnobs.rgb.r_max} g.min {colorKnobs.rgb.g_min} g.max {colorKnobs.rgb.g_max} b.min {colorKnobs.rgb.b_min} b.max {colorKnobs.rgb.b_max}</p>
  )
};

const defaultKnobs = {
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
};

let didInit = false;

export default function Colorbox({ numColors }: ColorboxProps) {
  const { classes } = useStyles();
  const { height, width } = useViewportSize();
  const [colors, setColors] = useState<ColorcardData[]>([]);
  const [colorKnobs, setColorKnobs] = useState<colorGen>(defaultKnobs);

  const genColors = useCallback(() => {
    let newColors;
    const method = Math.random() > 0.5 ? "hsl" : "rgb";
    const rgRGB = genKnobsRGB();
    const rgHSL = genKnobsHSL();
    const newColorKnobs = {
      method: method,
      rgb: rgRGB,
      hsl: rgHSL,
    };
    if (method == "hsl") {
      newColors = Array.from({ length: numColors }, () => randomColorHSL(newColorKnobs));
    } else {
      newColors = Array.from({ length: numColors }, () => randomColorRGB(newColorKnobs));
    }
    setColorKnobs(newColorKnobs);
    setColors([...newColors]);
  }, [numColors]);

  useEffect(() => {
    if (!didInit) {
      genColors();
      didInit = true;
    }
  }, [genColors]);

  if (!didInit) return <Center><Text>Loading...</Text></Center>;
  else return(
    <Container>
      <Group position="center">
        <Button
          compact
          onClick={(event) => genColors()}
          styles={(theme) => ({
            root: {
              backgroundColor: `${colors[Math.round(numColors/2)].code}`,
              '&:not([data-disabled])': theme.fn.hover({
                backgroundColor: theme.fn.darken(`${colors[Math.round(numColors/2)].code}`, 0.5),
              }),
            },
          })}
        >
          Randomize
        </Button>
      </Group>
      <Grid m="xs" columns={24} justify="center" align="stretch">
        {colors.map((d, k) => (
          <Grid.Col xs={8} md={6} lg={4} key={k}>
            <Colorcard color={d}></Colorcard>
          </Grid.Col>))}
      </Grid>
      <Text className={classes.centertext} lh={rem(3)} weight={500} size="lg" mb="md">
        {knobsDisplay(colorKnobs)}
      </Text>
    </Container>
  );
}

Colorbox.defaultProps = {
  numColors: 64,
};
