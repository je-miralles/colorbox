import { createStyles, rem, Container, Title } from '@mantine/core';

import LandingPage from './LandingPage';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,

    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

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
          Dark Job Board
        </Title>
      </Container>
      <LandingPage />
    </main>
  );
}
