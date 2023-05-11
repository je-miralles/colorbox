import { createStyles, Card, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  text_title: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[8],
  },
  text: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[8],
  },
}));

export type ColorcardData = {
  'code': string;
};

type ColorcardProps = {
  color: ColorcardData;
};

export default function Colorcard({ color }: ColorcardProps) {
  const { classes } = useStyles();
  return(
    <Card
      radius="md"
      sx={{ backgroundColor: `${color.code}` }}
    >
      <Text className={classes.text}  size="sm" lineClamp={10}>
        {color.code}
      </Text>
    </Card>
  );
}

Colorcard.defaultProps = {
  color: {
    code: "darkBlue",
  },
};
