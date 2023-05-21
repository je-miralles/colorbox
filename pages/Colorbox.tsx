import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { rem, createStyles, Group, Container, Center, Grid, Text, Button } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import Colorcard, { ColorcardData } from './Colorcard';
import { defaultKnobs, genColorKnobs, genColors, colorGen } from '../lib/ColorRand';

type ColorboxProps = {
  numColors: number;
};

const knobsDisplay = (colorKnobs: colorGen, height: number, width: number) => {
  return colorKnobs.method == "hsl" ? (
    <>
      <p>h.min {colorKnobs.hsl.h_min} h.max {colorKnobs.hsl.h_max} s.min {colorKnobs.hsl.s_min} s.max {colorKnobs.hsl.s_max} l.min {colorKnobs.hsl.l_min} l.max {colorKnobs.hsl.l_max}</p>
      <p>h.mu {colorKnobs.s_hsl.h_mu.toFixed(2)} h.sigma {colorKnobs.s_hsl.h_sigma.toFixed(2)} s.mu {colorKnobs.s_hsl.s_mu.toFixed(2)} s.sigma {colorKnobs.s_hsl.s_sigma.toFixed(2)} l.mu {colorKnobs.s_hsl.l_mu.toFixed(2)} l.sigma {colorKnobs.s_hsl.l_sigma.toFixed(2)}</p>
      <p>viewport: {width}, {height} ({(width/16).toFixed(2)}, {(height/16).toFixed(2)})</p>
    </>
  ) : (
    <>
      <p>r.min {colorKnobs.rgb.r_min} r.max {colorKnobs.rgb.r_max} g.min {colorKnobs.rgb.g_min} g.max {colorKnobs.rgb.g_max} b.min {colorKnobs.rgb.b_min} b.max {colorKnobs.rgb.b_max}</p>
      <p>r.mu {colorKnobs.s_rgb.r_mu.toFixed(2)} r.sigma {colorKnobs.s_rgb.r_sigma.toFixed(2)} g.mu {colorKnobs.s_rgb.g_mu.toFixed(2)} g.sigma {colorKnobs.s_rgb.g_sigma.toFixed(2)} b.mu {colorKnobs.s_rgb.b_mu.toFixed(2)} b.sigma {colorKnobs.s_rgb.b_sigma.toFixed(2)}</p>
      <p>viewport: {width}, {height} ({(width/16).toFixed(2)}, {(height/16).toFixed(2)})</p>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  centertext: {
    textAlign: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.black,
    fontSize: rem(12),
    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(5),
    },
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(7),
    },
    [theme.fn.smallerThan('md')]: {
      fontSize: rem(8),
    },
  },
}));

let didInit = false;

export default function Colorbox({ numColors }: ColorboxProps) {
  const router = useRouter();
  const { classes } = useStyles();
  const { height, width } = useViewportSize();
  const [colors, setColors] = useState<ColorcardData[]>([]);
  const [colorKnobs, setColorKnobs] = useState<colorGen>(defaultKnobs);

  const initColors = useCallback(() => {
    const newColorKnobs = genColorKnobs();
    const newColors = genColors(numColors, newColorKnobs);
    setColorKnobs(newColorKnobs);
    setColors([...newColors]);
  }, [numColors]);

  const clickColors = useCallback((color: ColorcardData) => {
    const newColorKnobs = genColorKnobs(color, colorKnobs);
    const newColors = genColors(numColors, newColorKnobs);
    setColorKnobs(newColorKnobs);
    setColors([...newColors]);
  }, [numColors, colorKnobs]);

  useEffect(() => {
    if (!didInit) {
      initColors();
      didInit = true;
    }
  }, [initColors]);

  if (!didInit) return <Center><Text>Loading...</Text></Center>;
  else return(
    <Container>
      <Group m="xs" position="center">
        <Button
          compact
          radius="md"
          onClick={initColors}
          styles={(theme) => ({
            root: {
              backgroundColor: `${colors[Math.round(numColors/2)].code}`,
              '&:not([data-disabled])': theme.fn.hover({
                backgroundColor: theme.fn.darken(`${colors[Math.round(numColors/2)].code}`, 0.5),
              }),
            },
          })}
        >
          randomize
        </Button>
      </Group>
      <Grid gutterXs="xs" m="0" columns={24} justify="center" align="stretch">
        {colors.map((d, k) => (
          <Grid.Col xs={12} sm={8} md={6} lg={4} key={k}>
            <Colorcard color={d} clickColors={clickColors}></Colorcard>
          </Grid.Col>))}
      </Grid>
      {router.query.showparams=="true" && (
        <Text className={classes.centertext} lh={rem(3)} weight={500} size="lg" mb="md">
          {knobsDisplay(colorKnobs, height, width)}
        </Text>
      )}
    </Container>
  );
}

Colorbox.defaultProps = {
  numColors: 64,
};
