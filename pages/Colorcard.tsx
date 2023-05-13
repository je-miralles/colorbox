import { rem, createStyles, Card, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  text_title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.black,
    fontSize: rem(14),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(11),
    },
    [theme.fn.largerThan('md')]: {
      fontSize: rem(11),
    },
  },
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.black,
    fontSize: rem(12),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(9),
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
};

export default function Colorcard({ color }: ColorcardProps) {
  const { classes } = useStyles();
  return(
    <Card
      p="xs"
      radius="md"
      sx={{ backgroundColor: `${color.code}` }}
    >
      <Text className={classes.text_title} weight={500} size="lg" mb="md">
        {color.code}
      </Text>
      <Text className={classes.text} lineClamp={10}>
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
