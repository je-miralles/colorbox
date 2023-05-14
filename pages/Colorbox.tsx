import { useCallback, useEffect, useState } from 'react';
import { rem, createStyles, Group, Container, Center, Grid, Text, Button } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { rgb, hsl } from 'd3-color';
import { randomNormal } from 'd3-random';

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
type randomRGBSigma = {
  r_mu: number;
  g_mu: number;
  b_mu: number;
  r_sigma: number;
  g_sigma: number;
  b_sigma: number;
};
type randomHSLSigma = {
  h_mu: number;
  s_mu: number;
  l_mu: number;
  h_sigma: number;
  s_sigma: number;
  l_sigma: number;
};

type colorGen = {
  method: string;
  rgb: randomRGBgen;
  hsl: randomHSLgen;
  s_rgb: randomRGBSigma;
  s_hsl: randomHSLSigma;
};
type ColorboxProps = {
  numColors: number;
};

const clamph = (max: number, value: number) => { return value >= 0 ? Math.abs(value%360) : value + 360 }
const clamp = (min: number, max: number, value: number) => { return Math.max(min, Math.min(max, value)) }
const randNormVal = (min: number, max: number, mu: number, sigma: number) => { return clamp(min, max, Math.floor(max*randomNormal(mu, sigma)())) }
const randNormValh = (max: number, mu: number, sigma: number) => { return clamph(max, Math.floor(max*randomNormal(mu, sigma)())) }
const randVal = (min: number, max: number) => { return Math.abs(Math.floor(Math.random() * (max - min) + min)) }
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
  const newcolor = rgb(`rgb(${r}, ${g}, ${b})`);
  return ({
    string: `rgb(${r},${g},${b})`,
    code: newcolor ? newcolor.formatHex() : "#090909",
  });
};
const randomColorHSL = (colorKnobs: colorGen) => {
  const h = randVal(colorKnobs.hsl.h_min, colorKnobs.hsl.h_max);
  const s = randVal(colorKnobs.hsl.s_min, colorKnobs.hsl.s_max);
  const l = randVal(colorKnobs.hsl.l_min, colorKnobs.hsl.l_max);
  const newcolor = hsl(`hsl(${h}, ${s}%, ${l}%)`);
  return ({
    string: `hsl(${h},${s}%,${l}%)`,
    code: newcolor ? newcolor.formatHex() : "#090909",
  });
};
const randNormValRGB = (colorKnobs: colorGen) => {
  const r = randNormVal(0, 255, colorKnobs.s_rgb.r_mu, colorKnobs.s_rgb.r_sigma);
  const g = randNormVal(0, 255, colorKnobs.s_rgb.g_mu, colorKnobs.s_rgb.g_sigma);
  const b = randNormVal(0, 255, colorKnobs.s_rgb.b_mu, colorKnobs.s_rgb.b_sigma);
  const newcolor = rgb(`rgb(${r}, ${g}, ${b})`);
  return ({
    string: newcolor.formatRgb(),
    code: newcolor ? newcolor.formatHex() : "#090909",
  });
};
const randNormValHSL = (colorKnobs: colorGen) => {
  const h = randNormValh(360, colorKnobs.s_hsl.h_mu, colorKnobs.s_hsl.h_sigma);
  const s = randNormVal(0, 100, colorKnobs.s_hsl.s_mu, colorKnobs.s_hsl.s_sigma);
  const l = randNormVal(0, 100, colorKnobs.s_hsl.l_mu, colorKnobs.s_hsl.l_sigma);
  const newcolor = hsl(`hsl(${h}, ${s}%, ${l}%)`);
  return ({
    string: newcolor.formatHsl(),
    code: newcolor ? newcolor.formatHex() : "#090909",
  });
};
const genColors = (num: number, colorKnobs: colorGen, randFunc: (colorKnobs: colorGen) => ColorcardData) => {
  return Array.from({ length: num }, () => randFunc(colorKnobs));
};
const genColorKnobs = (s_rgRGB: randomRGBSigma=defaultKnobs.s_rgb, s_rgHSL: randomHSLSigma=defaultKnobs.s_hsl) => {
  const method = Math.random() > 0.5 ? "hsl" : "rgb";
  const rgRGB = genKnobsRGB();
  const rgHSL = genKnobsHSL();
  return({
    method: method,
    rgb: rgRGB,
    hsl: rgHSL,
    s_rgb: s_rgRGB,
    s_hsl: s_rgHSL,
  });
};
const knobsDisplay = (colorKnobs: colorGen, height: number, width: number) => {
  return colorKnobs.method == "hsl" ? (
    <>
      <p>h.min {colorKnobs.hsl.h_min} h.max {colorKnobs.hsl.h_max} s.min {colorKnobs.hsl.s_min} s.max {colorKnobs.hsl.s_max} l.min {colorKnobs.hsl.l_min} l.max {colorKnobs.hsl.l_max}</p>
      <p>h.mu {colorKnobs.s_hsl.h_mu} h.sigma {colorKnobs.s_hsl.h_sigma} s.mu {colorKnobs.s_hsl.s_mu} s.sigma {colorKnobs.s_hsl.s_sigma} l.mu {colorKnobs.s_hsl.l_mu} l.sigma {colorKnobs.s_hsl.l_sigma}</p>
      <p>viewport: {width}, {height} ({width/16}, {height/16})</p>
    </>
  ) : (
    <>
      <p>r.min {colorKnobs.rgb.r_min} r.max {colorKnobs.rgb.r_max} g.min {colorKnobs.rgb.g_min} g.max {colorKnobs.rgb.g_max} b.min {colorKnobs.rgb.b_min} b.max {colorKnobs.rgb.b_max}</p>
      <p>r.mu {colorKnobs.s_rgb.r_mu} r.sigma {colorKnobs.s_rgb.r_sigma} g.mu {colorKnobs.s_rgb.g_mu} g.sigma {colorKnobs.s_rgb.g_sigma} b.mu {colorKnobs.s_rgb.b_mu} b.sigma {colorKnobs.s_rgb.b_sigma}</p>
      <p>viewport: {width}, {height} ({width/16}, {height/16})</p>
    </>
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
  s_rgb: {
    r_mu: 127,
    g_mu: 127,
    b_mu: 127,
    r_sigma: 255,
    g_sigma: 255,
    b_sigma: 255,
  },
  s_hsl: {
    h_mu: 180,
    s_mu: 50,
    l_mu: 50,
    h_sigma: 360,
    s_sigma: 100,
    l_sigma: 100,
  },
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
  const { classes } = useStyles();
  const { height, width } = useViewportSize();
  const [colors, setColors] = useState<ColorcardData[]>([]);
  const [colorKnobs, setColorKnobs] = useState<colorGen>(defaultKnobs);

  const initColors = useCallback(() => {
    const newColorKnobs = genColorKnobs();
    const newColors = newColorKnobs.method == "hsl" ? genColors(numColors, newColorKnobs, randomColorHSL) :
                                                      genColors(numColors, newColorKnobs, randomColorRGB);
    setColorKnobs(newColorKnobs);
    setColors([...newColors]);
  }, [numColors]);

  const clickColors = useCallback((color: ColorcardData) => {
    const color_rgb = rgb(color.code);
    const color_hsl = hsl(color.code);
    const new_s_rgb = {
      r_mu: color_rgb.r,
      g_mu: color_rgb.g,
      b_mu: color_rgb.b,
      r_sigma: colorKnobs.s_rgb.r_sigma/2,
      g_sigma: colorKnobs.s_rgb.g_sigma/2,
      b_sigma: colorKnobs.s_rgb.b_sigma/2,
    };
    const new_s_hsl = {
      h_mu: color_hsl.h,
      s_mu: color_hsl.s,
      l_mu: color_hsl.l,
      h_sigma: colorKnobs.s_hsl.h_sigma/2,
      s_sigma: colorKnobs.s_hsl.s_sigma/2,
      l_sigma: colorKnobs.s_hsl.l_sigma/2,
    };
    const newColorKnobs = genColorKnobs(new_s_rgb, new_s_hsl);
    const newColors = newColorKnobs.method == "hsl" ? genColors(numColors, colorKnobs, randNormValHSL) :
                                                      genColors(numColors, colorKnobs, randNormValRGB);
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
          Randomize
        </Button>
      </Group>
      <Grid gutterXs="xs" m="0" columns={24} justify="center" align="stretch">
        {colors.map((d, k) => (
          <Grid.Col xs={12} sm={8} md={6} lg={4} key={k}>
            <Colorcard color={d} clickColors={clickColors}></Colorcard>
          </Grid.Col>))}
      </Grid>
      <Text className={classes.centertext} lh={rem(3)} weight={500} size="lg" mb="md">
        {knobsDisplay(colorKnobs, height, width)}
      </Text>
    </Container>
  );
}

Colorbox.defaultProps = {
  numColors: 64,
};
