import { useCallback, useEffect, useState } from 'react';
import { rem, createStyles, Group, Container, Grid, Text, Button } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { color } from 'd3-color';

import Colorcard, { ColorcardData } from './Colorcard';

type ColorboxProps = {
  numColors: number;
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

const useStyles = createStyles((theme) => ({
  button: {
    paddingTop: rem(1),
    paddingBottom: rem(1),
  },
  centertext: {
    paddingTop: rem(1),
    paddingBottom: rem(1),
    textAlign: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.black,
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(10),
    },
  },
}));

export default function Colorbox({ numColors, rgRGB, rgHSL }: ColorboxProps) {
  const { classes } = useStyles();
  const [colors, setColors] = useState<ColorcardData[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const { height, width } = useViewportSize();

  const genColors = useCallback((num_colors: number, method: string="hsl") => {
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

      if (method == "hsl") {
        return Array.from({ length: num_colors }, () => randomColorHSL());
      } else {
        return Array.from({ length: num_colors }, () => randomColorRGB());
      }
  }, [rgRGB, rgHSL]);

  useEffect(() => {
    const setRandomColors = async () => {
      try {
        setColors([...genColors(numColors)]);
        setLoaded(true);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (!isLoaded) setRandomColors();
  }, [numColors, genColors, isLoaded]);

  if (!isLoaded) return <Container><Text>Loading...</Text></Container>;
  else return(
    <Container>
      <Group className={classes.button} position="center">
        <Button compact onClick={(event) => setColors([...genColors(numColors)])}>
          Randomize
        </Button>
      </Group>
      <Text className={classes.centertext} weight={500} size="lg" mb="md">
        h_min:{rgHSL.h_min} h_max:{rgHSL.h_max} s_min:{rgHSL.s_min} s_max:{rgHSL.s_max} l_min:{rgHSL.l_min} l_max{rgHSL.l_max}
      </Text>
      <Text className={classes.centertext} weight={500} size="lg" mb="md">
        viewport: {width}, {height} ({width/16}, {height/16})
      </Text>
      <Grid columns={24} justify="center" align="stretch">
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
