import { createStyles, rem, Container, Title } from '@mantine/core';

import Colorbox from './Colorbox';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(12),
    paddingBottom: rem(12),

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: rem(32),
    letterSpacing: -1,

    color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[4],

    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },
}));

export default function IndexPage() {
  const { classes } = useStyles();
  return(
    <main>
      <Container className={classes.wrapper} size={1400}>
        <Title className={classes.title}>
          Colorbox
        </Title>
      </Container>
      <Colorbox />
    </main>
  );
}
