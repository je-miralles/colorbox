import { useCallback } from 'react';
import { rem, createStyles, Card, Text, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  text_title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.black,
    fontSize: rem(12),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(9),
    },
    [theme.fn.smallerThan('md')]: {
      fontSize: rem(10),
    },
    [theme.fn.largerThan('md')]: {
      fontSize: rem(11),
    },
  },
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.black,
    fontSize: rem(10),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(7),
    },
    [theme.fn.smallerThan('md')]: {
      fontSize: rem(8),
    },
    [theme.fn.largerThan('md')]: {
      fontSize: rem(9),
    },
  },
}));

export type ColorcardData = {
  string: string;
  code: string;
};

type ColorcardProps = {
  color: ColorcardData;
  clickColors: (color: ColorcardData) => void;
};

export default function Colorcard({ color, clickColors }: ColorcardProps) {
  const { classes } = useStyles();
  const handleClickColors = useCallback(() => { clickColors(color) }, [color, clickColors])
  return(
    <Card
      p="xs"
      radius="md"
      sx={{ backgroundColor: `${color.code}` }}
    >
      <Text className={classes.text_title} weight={500} size="lg" mb="md">
        {color.code}
      </Text>
      <Text
        className={classes.text}
        lineClamp={10}
        component="a"
        href="#"
        onClick={handleClickColors}
        sx={{ color: `${color.code}` }}
      >
        {color.string}
      </Text>
    </Card>
  );
}

Colorcard.defaultProps = {
  color: {
    code: "darkBlue",
  },
};
